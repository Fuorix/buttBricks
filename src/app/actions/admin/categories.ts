'use server';

import { FieldValue } from 'firebase-admin/firestore';
import { requireSession } from '@/lib/auth/session';
import { adminDb, COLLECTIONS } from '@/lib/firebase/admin';
import { countProductsInCategory } from '@/lib/data/catalog';
import { revalidateCatalog } from '@/lib/revalidate';
import { categorySchema, flattenErrors } from '@/lib/validation';
import type { ActionState } from '@/lib/types';

async function slugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const snap = await adminDb()
    .collection(COLLECTIONS.categories)
    .where('slug', '==', slug)
    .limit(2)
    .get();
  return snap.docs.some((d) => d.id !== exceptId);
}

/** Create (no id) or update (id present) a category. */
export async function saveCategoryAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireSession();
  } catch {
    return { ok: false, message: 'Your session has expired. Please sign in again.' };
  }

  const id = String(formData.get('id') ?? '').trim();
  const parsed = categorySchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description') ?? '',
    order: formData.get('order') ?? 0,
  });
  if (!parsed.success) {
    return { ok: false, message: 'Please fix the highlighted fields.', fieldErrors: flattenErrors(parsed.error) };
  }
  const data = parsed.data;

  try {
    if (await slugTaken(data.slug, id || undefined)) {
      return { ok: false, fieldErrors: { slug: 'Another category already uses this slug.' } };
    }

    const db = adminDb();
    const col = db.collection(COLLECTIONS.categories);

    if (id) {
      const ref = col.doc(id);
      const existing = await ref.get();
      if (!existing.exists) return { ok: false, message: 'Category not found.' };

      const batch = db.batch();
      batch.update(ref, { ...data, updatedAt: FieldValue.serverTimestamp() });

      // Keep the denormalised categoryName on products in sync.
      if (existing.data()?.name !== data.name) {
        const products = await db
          .collection(COLLECTIONS.products)
          .where('categoryId', '==', id)
          .get();
        products.docs.forEach((p) => batch.update(p.ref, { categoryName: data.name }));
      }
      await batch.commit();
    } else {
      await col.add({
        ...data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    revalidateCatalog();
    return { ok: true, message: id ? 'Category updated.' : 'Category created.' };
  } catch (error) {
    console.error('saveCategoryAction error:', error);
    return { ok: false, message: 'Could not save the category. Please try again.' };
  }
}

export async function deleteCategoryAction(id: string): Promise<ActionState> {
  try {
    await requireSession();
  } catch {
    return { ok: false, message: 'Your session has expired. Please sign in again.' };
  }
  if (!id) return { ok: false, message: 'Missing category id.' };

  try {
    const inUse = await countProductsInCategory(id);
    if (inUse > 0) {
      return {
        ok: false,
        message: `This category still has ${inUse} product${inUse === 1 ? '' : 's'}. Move or delete them first.`,
      };
    }
    await adminDb().collection(COLLECTIONS.categories).doc(id).delete();
    revalidateCatalog();
    return { ok: true, message: 'Category deleted.' };
  } catch (error) {
    console.error('deleteCategoryAction error:', error);
    return { ok: false, message: 'Could not delete the category. Please try again.' };
  }
}

'use server';

import { redirect } from 'next/navigation';
import { FieldValue } from 'firebase-admin/firestore';
import { requireSession } from '@/lib/auth/session';
import { adminDb, COLLECTIONS } from '@/lib/firebase/admin';
import { destroyImages } from '@/lib/cloudinary';
import { docToProduct, getCategoryById } from '@/lib/data/catalog';
import { revalidateCatalog } from '@/lib/revalidate';
import { flattenErrors, productSchema } from '@/lib/validation';
import type { ActionState, ProductImage } from '@/lib/types';

function readJson<T>(formData: FormData, key: string, fallback: T): T {
  const raw = formData.get(key);
  if (typeof raw !== 'string' || !raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function slugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const snap = await adminDb()
    .collection(COLLECTIONS.products)
    .where('slug', '==', slug)
    .limit(2)
    .get();
  return snap.docs.some((d) => d.id !== exceptId);
}

function imageIds(images: (ProductImage | null)[]): Set<string> {
  return new Set(images.filter((i): i is ProductImage => Boolean(i)).map((i) => i.publicId));
}

/**
 * Create (no id) or update (id present) a product.
 * Nested collections arrive as JSON strings from the client form.
 */
export async function saveProductAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireSession();
  } catch {
    return { ok: false, message: 'Your session has expired. Please sign in again.' };
  }

  const id = String(formData.get('id') ?? '').trim();
  const parsed = productSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    sku: formData.get('sku') ?? '',
    categoryId: formData.get('categoryId'),
    tagline: formData.get('tagline') ?? '',
    description: formData.get('description'),
    badge: formData.get('badge') ?? '',
    isFeatured: formData.get('isFeatured') === 'on',
    order: formData.get('order') ?? 0,
    coverImage: readJson<ProductImage | null>(formData, 'coverImage', null),
    images: readJson<ProductImage[]>(formData, 'images', []),
    features: readJson(formData, 'features', []),
    narrative: readJson<string[]>(formData, 'narrative', []),
    specs: readJson(formData, 'specs', []),
    relatedIds: readJson<string[]>(formData, 'relatedIds', []),
  });
  if (!parsed.success) {
    return { ok: false, message: 'Please fix the highlighted fields.', fieldErrors: flattenErrors(parsed.error) };
  }
  const data = parsed.data;
  // A product cannot be related to itself.
  data.relatedIds = data.relatedIds.filter((r) => r !== id);

  try {
    if (await slugTaken(data.slug, id || undefined)) {
      return { ok: false, fieldErrors: { slug: 'Another product already uses this slug.' } };
    }
    const category = await getCategoryById(data.categoryId);
    if (!category) {
      return { ok: false, fieldErrors: { categoryId: 'That category no longer exists.' } };
    }

    const col = adminDb().collection(COLLECTIONS.products);
    const payload = { ...data, categoryName: category.name };
    let removed: string[] = [];

    if (id) {
      const ref = col.doc(id);
      const existing = await ref.get();
      if (!existing.exists) return { ok: false, message: 'Product not found.' };

      const before = docToProduct(existing);
      const keep = imageIds([data.coverImage, ...data.images]);
      removed = [...imageIds([before.coverImage, ...before.images])].filter((p) => !keep.has(p));

      await ref.update({ ...payload, updatedAt: FieldValue.serverTimestamp() });
    } else {
      await col.add({
        ...payload,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    // Clean up images that were dropped from the product.
    await destroyImages(removed);
    revalidateCatalog();
  } catch (error) {
    console.error('saveProductAction error:', error);
    return { ok: false, message: 'Could not save the product. Please try again.' };
  }

  redirect(`/admin/products?saved=${encodeURIComponent(data.title)}`);
}

export async function deleteProductAction(id: string): Promise<ActionState> {
  try {
    await requireSession();
  } catch {
    return { ok: false, message: 'Your session has expired. Please sign in again.' };
  }
  if (!id) return { ok: false, message: 'Missing product id.' };

  try {
    const db = adminDb();
    const ref = db.collection(COLLECTIONS.products).doc(id);
    const snap = await ref.get();
    if (!snap.exists) return { ok: false, message: 'Product not found.' };
    const product = docToProduct(snap);

    const batch = db.batch();
    batch.delete(ref);
    // Drop this product from other products' related lists.
    const referencing = await db
      .collection(COLLECTIONS.products)
      .where('relatedIds', 'array-contains', id)
      .get();
    referencing.docs.forEach((d) => batch.update(d.ref, { relatedIds: FieldValue.arrayRemove(id) }));
    await batch.commit();

    await destroyImages([...imageIds([product.coverImage, ...product.images])]);
    revalidateCatalog();
    return { ok: true, message: `Deleted "${product.title}".` };
  } catch (error) {
    console.error('deleteProductAction error:', error);
    return { ok: false, message: 'Could not delete the product. Please try again.' };
  }
}

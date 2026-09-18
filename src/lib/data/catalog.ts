import 'server-only';
import { cache } from 'react';
import type { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore';
import { adminDb, COLLECTIONS, isFirebaseConfigured, toIso } from '@/lib/firebase/admin';
import type { Category, Product, ProductImage } from '@/lib/types';
import { sampleCategories, sampleProducts } from '@/lib/data/sampleCatalog';

/**
 * Read side of the catalog. Used by the public pages (at build / ISR time)
 * and by the admin pages (at request time). All reads go through the Admin SDK.
 *
 * When Firebase is not configured (fresh clone, no .env.local yet):
 *   - in development the built-in sample catalog is served so the site can be previewed;
 *   - in production an empty catalog is returned (with a warning) instead of crashing the build.
 */

const useSample = process.env.NODE_ENV !== 'production';

function warnUnconfigured() {
  console.warn(
    useSample
      ? '[catalog] Firebase is not configured; serving the built-in sample catalog (dev only).'
      : '[catalog] Firebase is not configured; returning empty data.'
  );
}

function asImage(value: unknown): ProductImage | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Partial<ProductImage>;
  if (typeof v.url !== 'string' || typeof v.publicId !== 'string') return null;
  const image: ProductImage = { url: v.url, publicId: v.publicId };
  if (typeof v.width === 'number') image.width = v.width;
  if (typeof v.height === 'number') image.height = v.height;
  return image;
}

function asImages(value: unknown): ProductImage[] {
  if (!Array.isArray(value)) return [];
  return value.map(asImage).filter((i): i is ProductImage => i !== null);
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function strArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
}

export function docToProduct(doc: DocumentSnapshot<DocumentData>): Product {
  const d = doc.data() ?? {};
  return {
    id: doc.id,
    slug: str(d.slug),
    title: str(d.title),
    sku: str(d.sku),
    categoryId: str(d.categoryId),
    categoryName: str(d.categoryName),
    tagline: str(d.tagline),
    description: str(d.description),
    badge: typeof d.badge === 'string' && d.badge.trim() ? d.badge : null,
    isFeatured: Boolean(d.isFeatured),
    order: typeof d.order === 'number' ? d.order : 0,
    coverImage: asImage(d.coverImage),
    images: asImages(d.images),
    features: Array.isArray(d.features) ? d.features : [],
    narrative: strArray(d.narrative),
    specs: Array.isArray(d.specs) ? d.specs : [],
    relatedIds: strArray(d.relatedIds),
    createdAt: toIso(d.createdAt),
    updatedAt: toIso(d.updatedAt),
  };
}

export function docToCategory(doc: DocumentSnapshot<DocumentData>): Category {
  const d = doc.data() ?? {};
  return {
    id: doc.id,
    name: str(d.name),
    slug: str(d.slug),
    description: str(d.description),
    order: typeof d.order === 'number' ? d.order : 0,
    createdAt: toIso(d.createdAt),
    updatedAt: toIso(d.updatedAt),
  };
}

function sortByOrder<T extends { order: number }>(items: T[], key: keyof T): T[] {
  return [...items].sort(
    (a, b) => a.order - b.order || String(a[key]).localeCompare(String(b[key]))
  );
}

export const getCategories = cache(async (): Promise<Category[]> => {
  if (!isFirebaseConfigured()) {
    warnUnconfigured();
    return useSample ? sampleCategories : [];
  }
  const snap = await adminDb().collection(COLLECTIONS.categories).get();
  return sortByOrder(snap.docs.map(docToCategory), 'name');
});

export const getCategoryById = cache(async (id: string): Promise<Category | null> => {
  if (!isFirebaseConfigured()) return (await getCategories()).find((c) => c.id === id) ?? null;
  const doc = await adminDb().collection(COLLECTIONS.categories).doc(id).get();
  return doc.exists ? docToCategory(doc) : null;
});

export const getProducts = cache(async (): Promise<Product[]> => {
  if (!isFirebaseConfigured()) {
    warnUnconfigured();
    return useSample ? sampleProducts : [];
  }
  const snap = await adminDb().collection(COLLECTIONS.products).get();
  return sortByOrder(snap.docs.map(docToProduct), 'title');
});

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  const all = await getProducts();
  return all.filter((p) => p.isFeatured);
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  if (!isFirebaseConfigured()) return (await getProducts()).find((p) => p.slug === slug) ?? null;
  const snap = await adminDb()
    .collection(COLLECTIONS.products)
    .where('slug', '==', slug)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return docToProduct(snap.docs[0]);
});

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  if (!isFirebaseConfigured()) return (await getProducts()).find((p) => p.id === id) ?? null;
  const doc = await adminDb().collection(COLLECTIONS.products).doc(id).get();
  return doc.exists ? docToProduct(doc) : null;
});

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const all = await getProducts();
  const byId = new Map(all.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter((p): p is Product => Boolean(p));
}

export async function countProductsInCategory(categoryId: string): Promise<number> {
  if (!isFirebaseConfigured()) return (await getProducts()).filter((p) => p.categoryId === categoryId).length;
  const snap = await adminDb()
    .collection(COLLECTIONS.products)
    .where('categoryId', '==', categoryId)
    .count()
    .get();
  return snap.data().count;
}

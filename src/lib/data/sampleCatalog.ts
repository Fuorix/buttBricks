import { slugify } from '@/lib/validation';
import type { Category, Product } from '@/lib/types';
import { productData as legacyCards } from '../../../scripts/seed/legacyProductsData';
import { productListData as legacyDetails } from '../../../scripts/seed/legacyProductListData';

/**
 * Sample catalog used ONLY in development when Firebase is not configured,
 * so the site can be previewed on a fresh clone. Images point at /public.
 * The seed script pushes this same data into Firestore + Cloudinary.
 */

const EPOCH = '2024-01-01T00:00:00.000Z';

function localImage(path: string) {
  return { url: path, publicId: `local:${path}` };
}

export const sampleCategories: Category[] = [...new Set(legacyDetails.map((p) => p.collection))].map(
  (name, order) => ({
    id: slugify(name),
    name,
    slug: slugify(name),
    description: '',
    order,
    createdAt: EPOCH,
    updatedAt: EPOCH,
  })
);

export const sampleProducts: Product[] = legacyDetails.map((detail, order) => {
  const card = legacyCards.find((c) => c.slug === detail.slug);
  return {
    id: detail.slug,
    slug: detail.slug,
    title: detail.title,
    sku: card?.sku ?? '',
    categoryId: slugify(detail.collection),
    categoryName: detail.collection,
    tagline: card?.tagline ?? '',
    description: detail.description,
    badge: card?.tag ?? null,
    isFeatured: card?.isFeatured ?? true,
    order,
    coverImage: card?.image ? localImage(card.image) : null,
    images: detail.images.map(localImage),
    features: detail.features,
    narrative: detail.narrative,
    specs: detail.specs,
    relatedIds: detail.relatedSlugs,
    createdAt: EPOCH,
    updatedAt: EPOCH,
  };
});

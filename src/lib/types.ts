/**
 * Shared domain types for the catalog (public site) and the admin module.
 * Everything here is plain JSON-serialisable so it can cross the
 * Server Component -> Client Component boundary.
 */

export interface ProductImage {
  /** Cloudinary secure delivery URL. */
  url: string;
  /** Cloudinary public_id, used for deletion and transformations. */
  publicId: string;
  width?: number;
  height?: number;
}

export interface ProductFeature {
  icon: string;
  label: string;
  text: string;
}

export interface SpecItem {
  spec: string;
  detail: string;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  sku: string;
  categoryId: string;
  /** Denormalised category name so cards can render without a join. */
  categoryName: string;
  tagline: string;
  description: string;
  /** Small ribbon on the card image, e.g. "PREMIUM". Null hides it. */
  badge: string | null;
  isFeatured: boolean;
  order: number;
  coverImage: ProductImage | null;
  images: ProductImage[];
  features: ProductFeature[];
  narrative: string[];
  specs: SpecItem[];
  relatedIds: string[];
  createdAt: string;
  updatedAt: string;
}

/** Fields the admin can set. Everything else is derived on the server. */
export type ProductInput = Omit<
  Product,
  'id' | 'categoryName' | 'createdAt' | 'updatedAt'
>;

export type CategoryInput = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>;

/** Standard shape returned by admin server actions to `useActionState`. */
export interface ActionState {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
}

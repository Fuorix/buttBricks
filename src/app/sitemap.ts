import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/data/catalog';

/**
 * Dynamic sitemap: the five static marketing routes plus one entry per
 * product. If the catalog read fails (misconfigured credentials, Firestore
 * outage) we still emit the static routes rather than failing the route.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buttbricks.com';

/** Strip any trailing slash so joins never produce a double slash. */
const baseUrl = siteUrl.replace(/\/+$/, '');

interface StaticRoute {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}

const staticRoutes: StaticRoute[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/projects', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/heritage', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const products = await getProducts();

    for (const product of products) {
      if (!product.slug) continue;

      const updated = new Date(product.updatedAt);

      entries.push({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: Number.isNaN(updated.getTime()) ? now : updated,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error('[sitemap] Could not load products; serving static routes only.', error);
  }

  return entries;
}

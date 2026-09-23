import type { MetadataRoute } from 'next';

/**
 * Crawler rules. The admin module and any API routes are kept out of the
 * index; everything else on the public site is fair game.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buttbricks.com';
const baseUrl = siteUrl.replace(/\/+$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

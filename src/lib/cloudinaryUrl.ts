/**
 * Client-safe helper: inject delivery transformations into a Cloudinary URL.
 * `https://res.cloudinary.com/<cloud>/image/upload/v123/a/b.jpg`
 *   -> `https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_800/v123/a/b.jpg`
 * Non-Cloudinary URLs (e.g. legacy /public paths) are returned untouched.
 */
export function cld(url: string, opts: { width?: number; height?: number; crop?: 'fill' | 'fit' } = {}): string {
  if (!url.includes('/image/upload/')) return url;
  const parts = ['f_auto', 'q_auto'];
  if (opts.width) parts.push(`w_${opts.width}`);
  if (opts.height) parts.push(`h_${opts.height}`);
  if (opts.crop) parts.push(`c_${opts.crop}`);
  return url.replace('/image/upload/', `/image/upload/${parts.join(',')}/`);
}

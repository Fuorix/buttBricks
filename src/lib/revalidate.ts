import 'server-only';
import { revalidatePath } from 'next/cache';

/**
 * The public catalog pages are statically prerendered. After any admin
 * mutation we purge them so the next visitor gets fresh HTML (on-demand ISR).
 *
 * The root-layout form is used deliberately: Next tags every route with its
 * full file path including route groups (e.g. `/(site)/products/[slug]/page`),
 * so a pattern like `/products/[slug]` would not match. Purging from the root
 * layout hits every page on this small site and is the reliable option.
 */
export function revalidateCatalog(): void {
  revalidatePath('/', 'layout');
}

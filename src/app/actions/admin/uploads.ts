'use server';

import { requireSession } from '@/lib/auth/session';
import { destroyImages, signUpload, uploadFolder, type UploadSignature } from '@/lib/cloudinary';

/**
 * Cloudinary helpers exposed to the admin UI.
 * The browser uploads straight to Cloudinary with a signature minted here.
 */

const FOLDERS = ['products', 'categories'] as const;
export type UploadKind = (typeof FOLDERS)[number];

export async function getUploadSignatureAction(kind: UploadKind): Promise<UploadSignature> {
  await requireSession();
  if (!FOLDERS.includes(kind)) throw new Error('Unknown upload kind');
  return signUpload(uploadFolder(kind));
}

/** Remove an image that was uploaded but then discarded before saving the form. */
export async function discardUploadAction(publicId: string): Promise<{ ok: boolean }> {
  await requireSession();
  // Only ever delete assets inside our own upload folder.
  if (!publicId.startsWith(`${uploadFolder()}/`)) return { ok: false };
  await destroyImages([publicId]);
  return { ok: true };
}

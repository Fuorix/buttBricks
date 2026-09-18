import 'server-only';
import { v2 as cloudinary } from 'cloudinary';

/**
 * Cloudinary is used for all product/category imagery.
 *
 * Uploads happen directly from the admin browser to Cloudinary using a
 * signature minted here (so the API secret never leaves the server and the
 * file never passes through a Vercel function, avoiding the 4.5 MB body limit).
 * Deletions are performed server-side.
 */

function configured() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.'
    );
  }
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
  return { cloud_name, api_key };
}

export function uploadFolder(sub?: string) {
  const root = process.env.CLOUDINARY_UPLOAD_FOLDER || 'buttbricks';
  return sub ? `${root}/${sub}` : root;
}

export interface UploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
}

/** Mint a short-lived signature for a direct browser upload into `folder`. */
export function signUpload(folder: string): UploadSignature {
  const { cloud_name, api_key } = configured();
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET as string
  );
  return { cloudName: cloud_name, apiKey: api_key, timestamp, signature, folder };
}

/** Delete assets by public_id. Failures are logged, never thrown. */
export async function destroyImages(publicIds: string[]): Promise<void> {
  if (publicIds.length === 0) return;
  configured();
  await Promise.all(
    publicIds.map(async (id) => {
      try {
        await cloudinary.uploader.destroy(id, { invalidate: true });
      } catch (error) {
        console.error(`Cloudinary destroy failed for ${id}:`, error);
      }
    })
  );
}

/** Server-side upload used by the seed script (reads a local file path). */
export async function uploadFromPath(filePath: string, folder: string, publicId?: string) {
  configured();
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

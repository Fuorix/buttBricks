/**
 * One-off migration: pushes the legacy hard-coded catalog into Firestore and
 * uploads the product photos from /public to Cloudinary.
 *
 *   npm run seed              # upload images + write categories/products
 *   npm run seed -- --no-images   # write Firestore docs, keep whatever images the docs already have
 *
 * Safe to re-run: documents are keyed by slug and merged; Cloudinary uploads
 * use fixed public_ids with overwrite enabled.
 *
 * This script is intentionally self-contained (it does not import the app's
 * `server-only` modules) so it can run under plain Node via tsx.
 */

import path from 'node:path';
import fs from 'node:fs';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { v2 as cloudinary } from 'cloudinary';
import { slugify } from '../src/lib/validation';
import { productData as legacyCards } from './seed/legacyProductsData';
import { productListData as legacyDetails } from './seed/legacyProductListData';

const SKIP_IMAGES = process.argv.includes('--no-images');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const FOLDER_ROOT = process.env.CLOUDINARY_UPLOAD_FOLDER || 'buttbricks';

function need(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing env var ${name}. Copy .env.example to .env.local and fill it in.`);
    process.exit(1);
  }
  return value;
}

function initFirebase() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: need('FIREBASE_PROJECT_ID'),
        clientEmail: need('FIREBASE_CLIENT_EMAIL'),
        privateKey: need('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      }),
    });
  }
  return getFirestore();
}

function initCloudinary() {
  cloudinary.config({
    cloud_name: need('CLOUDINARY_CLOUD_NAME'),
    api_key: need('CLOUDINARY_API_KEY'),
    api_secret: need('CLOUDINARY_API_SECRET'),
    secure: true,
  });
}

interface SeedImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

async function upload(publicPath: string, slug: string): Promise<SeedImage | null> {
  const file = path.join(PUBLIC_DIR, publicPath);
  if (!fs.existsSync(file)) {
    console.warn(`  ! missing file ${publicPath}, skipping`);
    return null;
  }
  const publicId = path.parse(file).name.replace(/[^a-zA-Z0-9_-]/g, '-');
  const res = await cloudinary.uploader.upload(file, {
    folder: `${FOLDER_ROOT}/products/${slug}`,
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
  });
  console.log(`  ↑ ${publicPath} -> ${res.public_id}`);
  return { url: res.secure_url, publicId: res.public_id, width: res.width, height: res.height };
}

async function main() {
  const db = initFirebase();
  if (!SKIP_IMAGES) initCloudinary();

  // 1. Categories — derived from the legacy `collection` labels, in first-seen order.
  const categoryNames = [...new Set(legacyDetails.map((p) => p.collection))];
  const categoryIdByName = new Map<string, string>();
  console.log(`Seeding ${categoryNames.length} categories…`);
  for (const [index, name] of categoryNames.entries()) {
    const id = slugify(name);
    categoryIdByName.set(name, id);
    await db
      .collection('categories')
      .doc(id)
      .set(
        {
          name,
          slug: id,
          description: '',
          order: index,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    console.log(`  ✓ ${name} (${id})`);
  }

  // 2. Products — merge the card data (home/catalog) with the detail-page data.
  console.log(`Seeding ${legacyDetails.length} products…`);
  for (const [index, detail] of legacyDetails.entries()) {
    const card = legacyCards.find((c) => c.slug === detail.slug);
    const ref = db.collection('products').doc(detail.slug);
    const existing = (await ref.get()).data() ?? {};

    let coverImage = existing.coverImage ?? null;
    let images = existing.images ?? [];
    if (!SKIP_IMAGES) {
      console.log(`  ${detail.title}: uploading images`);
      coverImage = card?.image ? await upload(card.image, detail.slug) : null;
      const uploaded = await Promise.all(detail.images.map((img) => upload(img, detail.slug)));
      images = uploaded.filter((i): i is SeedImage => i !== null);
      if (!coverImage) coverImage = images[0] ?? null;
    }

    await ref.set(
      {
        slug: detail.slug,
        title: detail.title,
        sku: card?.sku ?? '',
        categoryId: categoryIdByName.get(detail.collection),
        categoryName: detail.collection,
        tagline: card?.tagline ?? '',
        description: detail.description,
        badge: card?.tag ?? null,
        isFeatured: card?.isFeatured ?? true,
        order: index,
        coverImage,
        images,
        features: detail.features,
        narrative: detail.narrative,
        specs: detail.specs,
        // Legacy related lists are slugs; seeded doc ids equal slugs.
        relatedIds: detail.relatedSlugs,
        createdAt: existing.createdAt ?? FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`  ✓ ${detail.title}`);
  }

  console.log('Done. Open /admin to manage the catalog.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import 'server-only';
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

/**
 * Firebase Admin SDK singleton.
 *
 * The Admin SDK bypasses Firestore security rules, so it is only ever used
 * from server code (Server Components, Server Actions, the seed script).
 * The public site never ships a Firebase client bundle.
 */

function readCredentials() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Vercel stores the key with literal "\n"; local .env files may use real newlines.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) return null;
  return { projectId, clientEmail, privateKey };
}

export function isFirebaseConfigured(): boolean {
  return readCredentials() !== null;
}

let app: App | null = null;

function getApp(): App {
  if (app) return app;
  const existing = getApps();
  if (existing.length > 0) {
    app = existing[0];
    return app;
  }
  const credentials = readCredentials();
  if (!credentials) {
    throw new Error(
      'Firebase is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.'
    );
  }
  app = initializeApp({ credential: cert(credentials) });
  return app;
}

export function adminDb() {
  return getFirestore(getApp());
}

export function adminAuth() {
  return getAuth(getApp());
}

/** Firestore collection names, kept in one place. */
export const COLLECTIONS = {
  products: 'products',
  categories: 'categories',
} as const;

/** Convert Firestore Timestamps (and anything else) into an ISO string. */
export function toIso(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') return value;
  return new Date(0).toISOString();
}

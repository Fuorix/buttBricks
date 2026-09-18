import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { SESSION_COOKIE } from '@/lib/auth/session-cookie';

/**
 * Admin authentication.
 *
 * Flow: email + password -> Firebase Auth REST (signInWithPassword) -> ID token
 * -> Firebase session cookie (httpOnly) minted by the Admin SDK.
 * Every admin page and server action calls `verifySession()`; `proxy.ts` only
 * does an optimistic "cookie exists" check for redirects.
 */

export { SESSION_COOKIE };
const SESSION_DAYS = 5;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

export interface AdminSession {
  uid: string;
  email: string;
}

export class AuthError extends Error {}

function allowedEmails(): string[] | null {
  const raw = process.env.ADMIN_EMAILS;
  if (!raw) return null;
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

async function signInWithPassword(email: string, password: string): Promise<string> {
  const apiKey = process.env.FIREBASE_WEB_API_KEY;
  if (!apiKey) throw new Error('FIREBASE_WEB_API_KEY is not set.');

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      cache: 'no-store',
    }
  );
  const json = (await res.json()) as { idToken?: string; error?: { message?: string } };
  if (!res.ok || !json.idToken) {
    const code = json.error?.message ?? 'UNKNOWN';
    if (code.startsWith('TOO_MANY_ATTEMPTS')) {
      throw new AuthError('Too many attempts. Please try again later.');
    }
    throw new AuthError('Invalid email or password.');
  }
  return json.idToken;
}

export async function createSession(email: string, password: string): Promise<AdminSession> {
  const normalised = email.trim().toLowerCase();
  const allowed = allowedEmails();
  if (allowed && !allowed.includes(normalised)) {
    throw new AuthError('This account is not permitted to access the admin.');
  }

  const idToken = await signInWithPassword(normalised, password);
  const auth = adminAuth();
  const decoded = await auth.verifyIdToken(idToken);
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: SESSION_MS });

  const store = await cookies();
  store.set(SESSION_COOKIE, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MS / 1000,
  });

  return { uid: decoded.uid, email: decoded.email ?? normalised };
}

/**
 * Read and verify the session cookie. Memoised per request with React `cache`
 * so the layout and every action in the same request share one verification.
 */
export const verifySession = cache(async (): Promise<AdminSession | null> => {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const decoded = await adminAuth().verifySessionCookie(token, false);
    const email = (decoded.email ?? '').toLowerCase();
    const allowed = allowedEmails();
    if (allowed && !allowed.includes(email)) return null;
    return { uid: decoded.uid, email };
  } catch {
    return null;
  }
});

/** Throws unless a valid admin session exists. Use at the top of every action. */
export async function requireSession(): Promise<AdminSession> {
  const session = await verifySession();
  if (!session) throw new AuthError('Unauthorized');
  return session;
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  store.delete(SESSION_COOKIE);
  if (!token) return;
  try {
    const decoded = await adminAuth().verifySessionCookie(token, false);
    await adminAuth().revokeRefreshTokens(decoded.uid);
  } catch {
    // Cookie already invalid; nothing to revoke.
  }
}

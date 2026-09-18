'use server';

import { redirect } from 'next/navigation';
import { AuthError, createSession, destroySession } from '@/lib/auth/session';
import type { ActionState } from '@/lib/types';

function safeNextPath(value: FormDataEntryValue | null): string {
  const next = typeof value === 'string' ? value : '';
  // Only allow same-origin admin paths to avoid open redirects.
  return next.startsWith('/admin') && !next.startsWith('//') ? next : '/admin';
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const next = safeNextPath(formData.get('next'));

  if (!email || !password) {
    return { ok: false, message: 'Enter your email and password.' };
  }

  try {
    await createSession(email, password);
  } catch (error) {
    if (error instanceof AuthError) return { ok: false, message: error.message };
    console.error('loginAction error:', error);
    return {
      ok: false,
      message: 'Sign-in is unavailable. Check the server configuration (Firebase env vars).',
    };
  }

  redirect(next);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect('/admin/login');
}

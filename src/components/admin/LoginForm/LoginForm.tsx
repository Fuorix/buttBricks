'use client';

import React, { useActionState } from 'react';
import { loginAction } from '@/app/actions/admin/auth';
import type { ActionState } from '@/lib/types';
import { Field } from '@/components/admin/ui/Field';
import { Notice } from '@/components/admin/ui/Notice';
import ui from '@/components/admin/ui/admin.module.css';
import styles from './LoginForm.module.css';

interface LoginFormProps {
  next: string;
}

const initialState: ActionState = { ok: true };

export const LoginForm: React.FC<LoginFormProps> = ({ next }) => {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="next" value={next} />

      {!state.ok && state.message && <Notice kind="error">{state.message}</Notice>}

      <Field label="Email" htmlFor="login-email" required>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="you@company.com"
        />
      </Field>

      <Field label="Password" htmlFor="login-password" required>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </Field>

      <button type="submit" className={`${ui.btnPrimary} ${styles.submit}`} disabled={pending}>
        <span className="material-symbols-outlined">login</span>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
};

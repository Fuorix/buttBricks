'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ui from '@/components/admin/ui/admin.module.css';
import styles from './error.module.css';

/**
 * Error boundary for the admin dashboard. Nested inside the `(dashboard)`
 * layout, so the sidebar shell stays in place and the operator can still
 * navigate away from a broken screen.
 *
 * A common cause here is a Firestore or Cloudinary credential problem, which
 * surfaces as a Server Component error, so the hint points at that first.
 */
export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error('[admin] Unhandled error:', error);
  }, [error]);

  return (
    <div className={styles.wrap}>
      <div className={ui.card}>
        <span className={`${ui.pageLabel} font-label-caps`}>Error</span>
        <h1 className={ui.pageTitle}>This screen failed to load.</h1>
        <p className={ui.pageSubtitle}>
          Retry the request below. If it keeps failing, check that the Firebase and Cloudinary
          environment variables are set correctly on the server.
        </p>

        <div className={styles.actions}>
          <button type="button" className={ui.btnPrimary} onClick={() => unstable_retry()}>
            Try Again
          </button>
          <Link href="/admin" className={ui.btnSecondary}>
            Back to Dashboard
          </Link>
        </div>

        {error.digest && (
          <p className={`${ui.muted} ${styles.digest}`}>Reference code: {error.digest}</p>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

/**
 * Error boundary for the public site. Sits inside the `(site)` layout, so the
 * header and footer stay rendered around it.
 *
 * Visitors never see `error.message`: for Server Component errors Next.js
 * replaces it with a generic string in production anyway, and showing it would
 * risk leaking internals. The digest is shown instead so support can match the
 * report to a server log line.
 */
export default function SiteError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error('[site] Unhandled error:', error);
  }, [error]);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <span className={`${styles.tagline} font-label-caps`}>Something went wrong</span>
        <h1 className={`${styles.title} font-headline-lg`}>This page could not be loaded.</h1>
        <p className={`${styles.description} font-body-lg`}>
          The problem is on our side, not yours. Try again in a moment, or browse our collections
          while we look into it.
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.primaryButton} onClick={() => unstable_retry()}>
            Try Again
          </button>
          <Link href="/" className={styles.secondaryButton}>
            Back to Home
          </Link>
        </div>

        {error.digest && (
          <p className={styles.digest}>Reference code: {error.digest}</p>
        )}
      </div>
    </main>
  );
}

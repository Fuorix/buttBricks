import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
};

/**
 * Global 404. Lives at the app root so it also catches URLs outside the
 * `(site)` group, and renders the public chrome itself.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.content}>
          <span className={`${styles.tagline} font-label-caps`}>Error 404</span>
          <h1 className={`${styles.title} font-headline-lg`}>This page has not been fired yet.</h1>
          <p className={`${styles.description} font-body-lg`}>
            The address you followed does not exist or has moved. Browse our collections or get in
            touch and we will point you in the right direction.
          </p>
          <div className={styles.actions}>
            <Link href="/products" className={styles.primaryButton}>
              View Collections
            </Link>
            <Link href="/" className={styles.secondaryButton}>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

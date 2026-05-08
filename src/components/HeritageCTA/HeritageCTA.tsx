import React from 'react';
import styles from './HeritageCTA.module.css';
import Link from 'next/link';

export const HeritageCTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={`${styles.patternOverlay} brick-grid-pattern`}></div>
      <div className={styles.contentContainer}>
        <h2 className={`${styles.title} font-display-xl`}>Build For Eternity.</h2>
        <Link href="/contact" className={styles.buttonLink}>
          <button className={`${styles.button} font-label-caps`}>
            JOIN OUR LEGACY
          </button>
        </Link>
      </div>
    </section>
  );
};
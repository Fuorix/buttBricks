import React from 'react';
import styles from './HeritageCTA.module.css';
import Link from 'next/link';

export const HeritageCTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.patternOverlay}>
        <div className={styles.gridContainer}>
          <div className={styles.gridLine}></div><div className={styles.gridLine}></div><div className={styles.gridLine}></div><div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div><div className={styles.gridLine}></div><div className={styles.gridLine}></div><div className={styles.gridLine}></div>
          <div className={styles.gridLine}></div><div className={styles.gridLine}></div><div className={styles.gridLine}></div><div></div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <h2 className={`${styles.title} font-headline-lg`}>Build For Eternity.</h2>
        <Link href="/contact">
          <button className={`${styles.button} font-headline-md`}>
            JOIN OUR LEGACY
          </button>
        </Link>
      </div>
    </section>
  );
};

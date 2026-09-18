import React from 'react';
import Link from 'next/link';
import styles from './FloatingCTA.module.css';

interface FloatingCTAProps {
  productTitle: string;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ productTitle }) => {
  return (
    <div className={styles.floatingContainer}>
      <Link href="/contact" className={styles.ctaButton}>
        <span className="material-symbols-outlined">chat</span>
        <span className={`${styles.ctaText} font-label-caps`}>
          Get Quote<span className={styles.ctaProduct}> for {productTitle}</span>
        </span>
      </Link>
    </div>
  );
};
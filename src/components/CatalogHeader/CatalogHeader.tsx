import React from 'react';
import styles from './CatalogHeader.module.css';

export const CatalogHeader: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.catalogHeaderSection}>
      <div className={styles.content}>
        <span className={`${styles.tagline} font-label-caps`}>Our Portfolio</span>
        <h1 className={`${styles.title} font-display-xl`}>Our Collections</h1>
        <p className={`${styles.description} font-body-lg`}>
          A testament to four decades of structural integrity. Every brick and tile is fired with precision, blending ancestral craftsmanship with contemporary industrial performance.
        </p>
      </div>
      <div className={styles.accentLineContainer}>
        <div className={styles.accentLine} />
      </div>
      </div>
    </section>
  );
};
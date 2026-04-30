import React from 'react';
import styles from './CustomShapeCTA.module.css';

export const CustomShapeCTA: React.FC = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <span className={`material-symbols-outlined ${styles.icon}`}>
          architecture
        </span>
        <h2 className={`${styles.title} font-headline-lg`}>Can't find what you need?</h2>
        <p className={`${styles.description} font-body-lg`}>
          Our kiln masters and design engineers specialize in bespoke shapes and custom material densities for mega-scale architectural projects.
        </p>
        <button type="button" className={styles.button}>
          Request a custom shape
        </button>
      </div>
    </section>
  );
};
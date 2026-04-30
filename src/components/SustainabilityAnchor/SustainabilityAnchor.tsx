import React from 'react';
import styles from './SustainabilityAnchor.module.css';

export const SustainabilityAnchor: React.FC = () => {
  return (
    <section className={styles.anchorSection}>
      <div className={styles.architecturalGrid}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={`${styles.title} font-display-xl`}>Built for permanence.</h2>
            <p className={`${styles.description} font-body-lg`}>
              Our materials are engineered to withstand the test of centuries, not just decades. Every brick is a commitment to structural legacy.
            </p>
          </div>
          <div className={styles.iconContent}>
            <div className={styles.iconBox}>
              <span className={`material-symbols-outlined ${styles.icon}`}>eco</span>
            </div>
            <div className={styles.iconBox}>
              <span className={`material-symbols-outlined ${styles.icon}`}>diamond</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
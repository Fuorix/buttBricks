import React from 'react';
import styles from './ProjectsStats.module.css';

export const ProjectsStats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.statItem}>
            <p className={`${styles.value} font-headline-lg`}>50+</p>
            <p className={`${styles.label} font-label-caps`}>Mega Projects</p>
          </div>
          <div className={styles.statItem}>
            <p className={`${styles.value} font-headline-lg`}>12M</p>
            <p className={`${styles.label} font-label-caps`}>Bricks Laid</p>
          </div>
          <div className={styles.statItem}>
            <p className={`${styles.value} font-headline-lg`}>40</p>
            <p className={`${styles.label} font-label-caps`}>Years Legacy</p>
          </div>
          <div className={styles.statItem}>
            <p className={`${styles.value} font-headline-lg`}>08</p>
            <p className={`${styles.label} font-label-caps`}>Cities Transformed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

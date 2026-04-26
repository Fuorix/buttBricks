import React from 'react';
import styles from './StatsBar.module.css';

export const StatsBar = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-display-xl`}>1979</p>
          <p className={`${styles.statLabel} font-label-caps`}>YEAR ESTABLISHED</p>
        </div>
        
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-display-xl`}>03</p>
          <p className={`${styles.statLabel} font-label-caps`}>PRODUCTION KILNS</p>
        </div>
        
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-display-xl`}>24+</p>
          <p className={`${styles.statLabel} font-label-caps`}>MEGA PROJECTS</p>
        </div>
        
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-display-xl`}>06</p>
          <p className={`${styles.statLabel} font-label-caps`}>EXPORT COUNTRIES</p>
        </div>
      </div>
    </section>
  );
};

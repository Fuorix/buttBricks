import React from 'react';
import styles from './StatsBar.module.css';

export const StatsBar: React.FC = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-headline-lg`}>1979</p>
          <p className={`${styles.statLabel} font-label-caps`}>Year Established</p>
        </div>
        
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-headline-lg`}>03</p>
          <p className={`${styles.statLabel} font-label-caps`}>Production Kilns</p>
        </div>
        
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-headline-lg`}>24+</p>
          <p className={`${styles.statLabel} font-label-caps`}>Mega Projects</p>
        </div>
        
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-headline-lg`}>06</p>
          <p className={`${styles.statLabel} font-label-caps`}>Export Countries</p>
        </div>
      </div>
    </section>
  );
};
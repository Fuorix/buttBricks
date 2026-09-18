import React from 'react';
import styles from './StatsBar.module.css';

export const StatsBar: React.FC = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-headline-lg`}>45+</p>
          <p className={`${styles.statLabel} font-label-caps`}>Years of Excellence</p>
        </div>
        
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-headline-lg`}>02</p>
          <p className={`${styles.statLabel} font-label-caps`}>Production Kilns</p>
        </div>
        
        <div className={styles.statItem}>
          <p className={`${styles.statValue} font-headline-lg`}>25+</p>
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
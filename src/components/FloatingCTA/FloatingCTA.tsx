import React from 'react';
import styles from './FloatingCTA.module.css';

export const FloatingCTA: React.FC = () => {
  return (
    <div className={styles.floatingContainer}>
      <button type="button" className={styles.ctaButton}>
        <span className="material-symbols-outlined">chat</span>
        <span className={`${styles.ctaText} font-label-caps`}>Get Quote for Fare Face</span>
      </button>
    </div>
  );
};
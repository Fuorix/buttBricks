import React from 'react';
import styles from './FloatingCTA.module.css';

export const FloatingCTA = () => {
  return (
    <div className={styles.floatingContainer}>
      <button className={styles.ctaButton}>
        <span className="material-symbols-outlined" data-icon="chat">chat</span>
        <span className={`${styles.ctaText} font-label-caps`}>Get Quote for Fare Face</span>
      </button>
    </div>
  );
};

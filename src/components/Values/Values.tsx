import React from 'react';
import styles from './Values.module.css';

export const Values = () => {
  return (
    <section className={styles.valuesSection}>
      <div className={styles.grid}>
        <div className={styles.valueItem}>
          <span className={`material-symbols-outlined ${styles.icon}`} data-icon="verified">verified</span>
          <h4 className={`${styles.title} font-headline-md`}>QUALITY</h4>
          <p className={`${styles.description} font-body-md`}>The uncompromising standard of &lsquo;Grade-A&rsquo; masonry excellence.</p>
        </div>
        
        <div className={styles.valueItem}>
          <span className={`material-symbols-outlined ${styles.icon}`} data-icon="handshake">handshake</span>
          <h4 className={`${styles.title} font-headline-md`}>INTEGRITY</h4>
          <p className={`${styles.description} font-body-md`}>Honest materials and transparent industrial relationships.</p>
        </div>
        
        <div className={styles.valueItem}>
          <span className={`material-symbols-outlined ${styles.icon}`} data-icon="lightbulb">lightbulb</span>
          <h4 className={`${styles.title} font-headline-md`}>INNOVATION</h4>
          <p className={`${styles.description} font-body-md`}>Advancing kiln technology for superior structural results.</p>
        </div>
        
        <div className={styles.valueItem}>
          <span className={`material-symbols-outlined ${styles.icon}`} data-icon="forest">forest</span>
          <h4 className={`${styles.title} font-headline-md`}>SUSTAINABILITY</h4>
          <p className={`${styles.description} font-body-md`}>Respecting the earth from which our legacy is harvested.</p>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import styles from './ContactHero.module.css';

export const ContactHero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textColumn}>
            <span className={`${styles.tagline} font-label-caps`}>Direct Consultations</span>
            <h1 className={`${styles.title} font-display-xl`}>Inquiry & Consultation</h1>
            <p className={`${styles.description} font-headline-md`}>
              Partner with our material experts for your next project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
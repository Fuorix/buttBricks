import React from 'react';
import styles from './Features.module.css';
import { featuresData } from '@/data/featuresData'; // Linked here

export const Features: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {featuresData.map((feature, index) => (
            <div key={index} className={styles.card}>
              <span className={`material-symbols-outlined ${styles.icon}`}>
                {feature.icon}
              </span>
              <h4 className={`${styles.cardTitle} font-headline-md`}>{feature.title}</h4>
              <p className={`${styles.cardDescription} font-body-md`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
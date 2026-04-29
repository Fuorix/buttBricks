import React from 'react';
import styles from './Features.module.css';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const featuresData: Feature[] = [
  {
    icon: 'diamond',
    title: 'Premium Quality',
    description: 'Superior compressive strength and consistent aesthetic across every batch.'
  },
  {
    icon: 'public',
    title: 'Export Ready',
    description: 'Trusted for international projects with global logistics support and standards.'
  },
  {
    icon: 'architecture',
    title: 'Custom Shapes',
    description: 'Specialized moulding capabilities for unique architectural requirements.'
  },
  {
    icon: 'history_edu',
    title: '45+ Years Legacy',
    description: 'Unmatched experience in clay manufacturing and structural engineering.'
  }
];

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
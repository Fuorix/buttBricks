import React from 'react';
import styles from './TechnicalSpecs.module.css';
import type { SpecItem } from '@/lib/types';

interface TechnicalSpecsProps {
  specs: SpecItem[];
}

export const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ specs }) => {
  return (
    <section className={styles.specsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`${styles.tagline} font-label-caps`}>Engineering Datasheet</span>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                <th className={`${styles.tableHeader} font-label-caps`}>Specification</th>
                <th className={`${styles.tableHeader} font-label-caps`}>Detail</th>
                <th className={`${styles.tableHeader} font-label-caps`}>Unit / Method</th>
              </tr>
            </thead>
            <tbody>
              {specs.map((item, index) => (
                <tr key={index} className={`${styles.tableRow} font-body-md`}>
                  <td className={`${styles.tableCell} ${styles.specName}`}>{item.spec}</td>
                  <td className={styles.tableCell}>{item.detail}</td>
                  <td className={`${styles.tableCell} ${styles.textSecondary}`}>{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

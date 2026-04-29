import React from 'react';
import styles from './TechnicalSpecs.module.css';

interface SpecItem {
  spec: string;
  detail: string;
  unit: string;
}

const specData: SpecItem[] = [
  { spec: 'Dimensions', detail: '9" x 1.5" x 3"', unit: 'Nominal Size' },
  { spec: 'Material Composition', detail: 'Refined Red Clay', unit: 'ASTM C67' },
  { spec: 'Surface Finish', detail: 'Smooth-Faced Architectural', unit: 'Grade SW' },
  { spec: 'Compression Strength', detail: 'Over 3,500 PSI', unit: 'Load Bearing' },
  { spec: 'Dry Weight', detail: '1.4 kg', unit: 'Per Unit' },
];

export const TechnicalSpecs: React.FC = () => {
  return (
    <section className={styles.specsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`${styles.tagline} font-label-caps`}>Engineering Datasheet</span>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableRow}>
                <th className={`${styles.tableHeader} font-label-caps`}>Specification</th>
                <th className={`${styles.tableHeader} font-label-caps`}>Detail</th>
                <th className={`${styles.tableHeader} font-label-caps`}>Unit/Method</th>
              </tr>
            </thead>
            <tbody className="font-body-md">
              {specData.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={`${styles.tableCell} ${styles.fontSemibold}`}>{item.spec}</td>
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
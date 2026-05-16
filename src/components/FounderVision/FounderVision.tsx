import React from 'react';
import styles from './FounderVision.module.css';

export const FounderVision: React.FC = () => {
  return (
    <section id="founder-vision" className={styles.founderSection}>
      <div className={styles.gridContainer}>
        <div className={styles.textColumn}>
          <span className={`${styles.tagline} font-label-caps`}>The Genesis</span>
          <h2 className={`${styles.title} font-headline-lg`}>The Vision of Muhammad Yaqoob Butt</h2>
          <div className={styles.accentLine}></div>
          <p className={`${styles.leadText} font-body-lg`}>
            In 1979, Muhammad Yaqoob Butt laid the first kiln in Lahore with a singular conviction: that a brick is not merely a building block, but the very DNA of architectural permanence.
          </p>
          <p className={`${styles.bodyText} font-body-md`}>
            What began as a localized craft quickly transformed under his leadership. His obsession with the chemical composition of clay and the precision of the firing process saw Butt Bricks evolve from a regional supplier to an international exporter, setting the benchmark for industrial masonry in Pakistan.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageBackdrop}></div>
          <img
            className={styles.image}
            alt="Haji M. Yaqoob Butt, Founder of Butt Bricks"
            src="/leader01.jpg"
          />
        </div>
      </div>
    </section>
  );
};
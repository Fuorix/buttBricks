import React from 'react';
import styles from './ProductOverview.module.css';

export const ProductOverview: React.FC = () => {
  return (
    <section className={styles.overviewSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.titleColumn}>
            <h2 className={`${styles.title} font-headline-lg`}>Structural Narrative</h2>
          </div>
          <div className={styles.contentColumn}>
            <p className={`${styles.leadText} font-body-lg`}>
              The Fare Face Gutka represents the pinnacle of our masonry tradition. Unlike standard bricks, the Gutka is specifically engineered for high-visibility architectural surfaces where the aesthetic texture of the material is as critical as its structural integrity.
            </p>
            <p className={`${styles.bodyText} font-body-md`}>
              Each piece is fired at precisely 1,100°C in our heritage kilns, resulting in a rich, uniform terracotta hue that does not fade under UV exposure. Its slender profile (9" x 1.5") allows architects to create modern, elongated bond patterns that emphasize the horizontal lines of a structure, a hallmark of industrial luxury design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
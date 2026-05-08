import React from 'react';
import styles from './ProductOverview.module.css';
import { ProductDetail } from '@/data/productListData';

interface ProductOverviewProps {
  product: ProductDetail;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({ product }) => {
  return (
    <section className={styles.overviewSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.titleColumn}>
            <h2 className={`${styles.title} font-headline-lg`}>Structural Narrative</h2>
          </div>
          <div className={styles.contentColumn}>
            {product.narrative.map((text, index) => (
              <p
                key={index}
                className={index === 0 ? `${styles.leadText} font-body-lg` : `${styles.bodyText} font-body-md`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
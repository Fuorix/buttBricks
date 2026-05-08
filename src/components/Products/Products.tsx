import React from 'react';
import Image from 'next/image';
import styles from './Products.module.css';
import { productData } from '@/data/productsData'; 

export const Products: React.FC = () => {
  return (
    <section className={styles.productsSection} id="products">
      <div className={`brick-grid-pattern ${styles.patternOverlay}`} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`${styles.tagline} font-label-caps`}>Collections</span>
          <h2 className={`${styles.title} font-headline-lg`}>Architectural Masonry</h2>
        </div>
        
        <div className={styles.grid}>
          {productData.map((product, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image 
                  className={styles.image} 
                  src={product.image} 
                  alt={product.alt} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {product.tag && (
                  <div className={styles.cardBadge}>{product.tag}</div>
                )}
              </div>
              <h3 className={`${styles.cardTitle} font-headline-md`}>{product.title}</h3>
              <p className={`${styles.cardDescription} font-body-md`}>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
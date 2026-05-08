import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CatalogGrid.module.css';
import { productData } from '@/data/productsData';

export const CatalogGrid: React.FC = () => {
  const displayedProducts = productData.filter(item => item.isFeatured).slice(0, 6);

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.masonryGrid}>
          {displayedProducts.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={item.image} 
                  alt={item.alt} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={`${styles.cardTitle} font-headline-md`}>{item.title}</h3>
                  {item.badge && (
                    <span className={`${styles.badge} ${styles['badge' + item.badge.type]}`}>
                      {item.badge.text}
                    </span>
                  )}
                </div>
                
                <p className={`${styles.cardDescription} font-body-md`}>
                  {item.description}
                </p>
                
                <div className={styles.cardFooter}>
                  <span className={`${styles.sku} font-label-caps`}>SKU: {item.sku}</span>
                  <Link href={`/products/${item.slug}`} className={styles.detailsLink}>
                    View Technical Specs
                    <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
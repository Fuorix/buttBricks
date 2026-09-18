import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CatalogGrid.module.css';
import { cld } from '@/lib/cloudinaryUrl';
import type { Product } from '@/lib/types';

interface CatalogGridProps {
  products: Product[];
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <p className={`${styles.emptyState} font-body-md`}>
            No products in this collection yet. Please check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.masonryGrid}>
          {products.map((item) => {
            const image = item.coverImage ?? item.images[0] ?? null;
            return (
              <div key={item.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {image && (
                    <Image
                      src={cld(image.url, { width: 900 })}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.image}
                    />
                  )}
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={`${styles.cardTitle} font-headline-md`}>{item.title}</h3>
                    {item.badge && (
                      <span className={`${styles.badge} ${styles.badgeprimary}`}>{item.badge}</span>
                    )}
                  </div>

                  <p className={`${styles.cardDescription} font-body-md`}>{item.description}</p>

                  <div className={styles.cardFooter}>
                    <span className={`${styles.sku} font-label-caps`}>
                      {item.sku ? `SKU: ${item.sku}` : item.categoryName}
                    </span>
                    <Link href={`/products/${item.slug}`} className={styles.detailsLink}>
                      View Technical Specs
                      <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

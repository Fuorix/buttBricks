import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Products.module.css';
import { cld } from '@/lib/cloudinaryUrl';
import type { Product } from '@/lib/types';

interface ProductsProps {
  products: Product[];
}

export const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <section className={styles.productsSection} id="products">
      <div className={`brick-grid-pattern ${styles.patternOverlay}`} />
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`${styles.tagline} font-label-caps`}>Collections</span>
          <h2 className={`${styles.title} font-headline-lg`}>Architectural Masonry</h2>
        </div>

        <div className={styles.grid}>
          {products.map((product) => {
            const image = product.coverImage ?? product.images[0] ?? null;
            return (
              <Link href={`/products/${product.slug}`} key={product.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {image && (
                    <Image
                      className={styles.image}
                      src={cld(image.url, { width: 900 })}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  {product.badge && (
                    <div className={styles.cardBadge}>{product.badge}</div>
                  )}
                </div>
                <h3 className={`${styles.cardTitle} font-headline-md`}>{product.title}</h3>
                <p className={`${styles.cardDescription} font-body-md`}>{product.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

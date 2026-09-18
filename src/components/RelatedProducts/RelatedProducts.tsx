"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './RelatedProducts.module.css';
import { cld } from '@/lib/cloudinaryUrl';
import type { Product } from '@/lib/types';

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const [offset, setOffset] = useState(0);

  if (products.length === 0) return null;

  // How many cards can we show at once (always 3 on desktop)
  const visibleCount = 3;
  const canGoLeft = offset > 0;
  // Only allow scrolling right if there are items beyond the current window
  const canGoRight = offset + visibleCount < products.length;

  const visible = products.slice(offset, offset + visibleCount);

  // Pad with nulls if we have fewer than 3 to keep grid stable
  const padded: (Product | null)[] = [...visible];
  while (padded.length < visibleCount) padded.push(null);

  return (
    <section className={styles.relatedSection}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <span className={`${styles.tagline} font-label-caps`}>Curation</span>
            <h3 className={`${styles.title} font-headline-md`}>Similar Materials</h3>
          </div>

          {/* Arrows only shown if there are more items than fit */}
          {products.length > visibleCount && (
            <div className={styles.controls}>
              <button
                type="button"
                className={`${styles.controlButton} ${!canGoLeft ? styles.controlDisabled : ''}`}
                onClick={() => canGoLeft && setOffset((o) => o - 1)}
                aria-label="Previous products"
                disabled={!canGoLeft}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                type="button"
                className={`${styles.controlButton} ${!canGoRight ? styles.controlDisabled : ''}`}
                onClick={() => canGoRight && setOffset((o) => o + 1)}
                aria-label="Next products"
                disabled={!canGoRight}
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}
        </div>

        <div className={styles.grid}>
          {padded.map((item, index) => {
            if (!item) {
              // Empty placeholder keeps grid columns stable
              return <div key={`empty-${index}`} className={styles.cardPlaceholder} />;
            }
            const image = item.coverImage ?? item.images[0] ?? null;
            return (
              <Link href={`/products/${item.slug}`} key={item.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={cld(image.url, { width: 800 })}
                      alt={item.title}
                      className={styles.image}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardTag}>{item.categoryName}</span>
                  <h4 className={`${styles.cardTitle} font-headline-sm`}>{item.title}</h4>
                  <p className={styles.cardDescription}>{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './ProductHero.module.css';
import { cld } from '@/lib/cloudinaryUrl';
import type { Product } from '@/lib/types';

interface ProductHeroProps {
  product: Product;
}

export const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
  const [activeImage, setActiveImage] = useState(0);

  // Gallery falls back to the cover image so a product never renders empty.
  const gallery = product.images.length > 0 ? product.images : product.coverImage ? [product.coverImage] : [];
  const current = gallery[activeImage] ?? gallery[0];

  // Show first 4 thumbnails; overlay on the 4th shows how many remain beyond those 4
  const visibleThumbs = gallery.slice(0, 4);
  const moreCount = gallery.length > 4 ? gallery.length - 4 : 0;

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          <div className={styles.mainImageWrapper}>
            {current && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                className={styles.image}
                src={cld(current.url, { width: 1400 })}
                alt={`${product.title} main view`}
              />
            )}
          </div>

          {visibleThumbs.length > 1 && (
            <div className={styles.thumbnailGrid}>
              {visibleThumbs.map((img, index) => {
                const isLast = index === 3;
                const showOverlay = isLast && moreCount > 0;
                return (
                  <button
                    key={img.publicId}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`${styles.thumbnailWrapper} ${activeImage === index ? styles.thumbnailActive : ''}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={styles.image}
                      src={cld(img.url, { width: 400 })}
                      alt={`${product.title} view ${index + 1}`}
                    />
                    {showOverlay && (
                      <div className={styles.moreOverlay}>
                        <span className="font-label-caps">+{moreCount} More</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.titleSection}>
            <span className={`${styles.tagline} font-label-caps`}>{product.categoryName}</span>
            <h1 className={`${styles.title} font-display-xl`}>{product.title}</h1>
            <p className={`${styles.description} font-body-lg`}>{product.description}</p>
          </div>

          {product.features.length > 0 && (
            <div className={styles.featuresSection}>
              {product.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.iconWrapper}>
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className={`${styles.featureTitle} font-label-caps`}>{feature.label}</h4>
                    <p className={styles.featureDesc}>{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.actionSection}>
            <Link href="/contact" className={styles.inquireButton}>
              Inquire for Project Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

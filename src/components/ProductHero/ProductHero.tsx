"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './ProductHero.module.css';
import { ProductDetail } from '@/data/productListData';

interface ProductHeroProps {
  product: ProductDetail;
}

export const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
  const [activeImage, setActiveImage] = useState(0);
  // Show first 4 thumbnails; overlay on the 4th shows how many remain beyond those 4
  const visibleThumbs = product.images.slice(0, 4);
  const moreCount = product.images.length > 4 ? product.images.length - 4 : 0;

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          <div className={styles.mainImageWrapper}>
            <img
              className={styles.image}
              src={product.images[activeImage]}
              alt={`${product.title} main view`}
            />
          </div>

          <div className={styles.thumbnailGrid}>
            {visibleThumbs.map((img, index) => {
              const isLast = index === 3;
              const showOverlay = isLast && moreCount > 0;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`${styles.thumbnailWrapper} ${activeImage === index ? styles.thumbnailActive : ''}`}
                >
                  <img
                    className={styles.image}
                    src={img}
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
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.titleSection}>
            <span className={`${styles.tagline} font-label-caps`}>{product.collection}</span>
            <h1 className={`${styles.title} font-display-xl`}>{product.title}</h1>
            <p className={`${styles.description} font-body-lg`}>{product.description}</p>
          </div>

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
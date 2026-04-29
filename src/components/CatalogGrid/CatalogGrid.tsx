import React from 'react';
import Link from 'next/link';
import styles from './CatalogGrid.module.css';

interface Badge {
  text: string;
  type: 'primary' | 'dark' | 'secondary';
}

interface CatalogItem {
  title: string;
  description: string;
  image: string;
  alt: string;
  badge: Badge;
  sku: string;
  slug: string;
}

const catalogData: CatalogItem[] = [
  {
    title: 'Fare Face Gutka',
    description: 'A classic structural choice for modern elevations. Known for its uniform texture and high compressive strength, perfect for load-bearing walls.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc3vg1UhXz0OkDZew6rXcjivLr--3q7sX2GRRtJp-vCh--EX76wdWoAxLTZTYHm5yrHYeMz9M_smOsa-_xvBPDEIcS1IzbntfCFkb0iSDjZP88lBEsM6gmG7krLV3c2omEUESBtbzfHUsvFgGV0WaJrZPj1gkLlR8pi-gb9XKRkhMmAzXP193g0NDA1camFwdLdTLTiGZYeTn7TN2cYGqPZm1nSIRPEIgC-Do7CJmYPIVmCAK4bRq52B_KI7GFFmgnNdoZ8Px8P8_-',
    alt: 'Close-up texture of premium terracotta fare face gutka bricks with rich earthy red tones and clean sharp edges in industrial lighting',
    badge: { text: 'Premium', type: 'primary' },
    sku: 'BB-FFG-001',
    slug: 'fare-face-gutka'
  },
  {
    title: 'Heritage Pattern Tile',
    description: 'Hand-pressed patterns inspired by historical architecture. These tiles offer a slip-resistant surface with an aesthetic that matures over decades.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3y24jOvZLBwR3_MMG40P8yZX_3RtROrPvLu4ytTSlqDnshG1Nw2E-1JKE9EzPeKccGeJwTuORPI6vFXdE_sTKUc-IxrvE2Io5fH9t6UcV1QtLB1wSKYS7waUUgSEdORey3ja8OP2nqV0AWGd4mBpV80l0UWBXf3NWzhZZrmn8zL0LVw_uT47m4ywSzBuFlEshRU6aO5mgj2fHbyvp6lIHaaFiG6PjHpof6LyWbfchHZPXttekPyRvNZgWkDT48-acS1Maip_OnGhT',
    alt: 'Detailed geometric pattern on architectural terracotta floor tiles showing craftsmanship and natural clay variations in a minimalist gallery setting',
    badge: { text: 'Artisan', type: 'dark' },
    sku: 'BB-HPT-042',
    slug: 'heritage-pattern-tile'
  },
  {
    title: 'Carbon Iron Series',
    description: 'Unique high-heat firing process that creates metallic carbon finishes. Designed for architectural statements that require a rugged, high-end edge.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8jF38y87x8IY6qL6lF1js04vnMmlvL25BmBnvtVQweQcQjGLMt96UoCIbd00SI6cqMc95CqIMfYAbxCWF1Y4zpk-Y_meo6Ior9NeamDFXl77z7sqB0rseeUyhEY58ZVl9bixilmzaSCqAUtH-LNndumE-ikQ6bOKoGQyhKEqM8ZjNkI-PtKx9PH3xa79UV1KpPdOd_t8DHWGbvnPMCtGcAMkAzwXUM8gO8J0Kmdx06IiJ6Vamf7MwTHEVkadSuk5los6HW9ofx6Yx',
    alt: 'Deep charred black brick cladding with subtle metallic iron luster under direct sunlight, showcasing heavy industrial texture',
    badge: { text: 'Luxury', type: 'primary' },
    sku: 'BB-CIS-009',
    slug: 'carbon-iron-series'
  },
  {
    title: 'Standard Red Paver',
    description: 'The backbone of urban landscapes. Durable, weatherproof, and color-fast pavers that maintain their integrity under heavy pedestrian traffic.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2VnqdKOJFlyrpOOwf46b1hpvyP-DPks4j634251DnmX6JiAsVd8Z8q6f9fWoibTyn2G-e-_wM9QGvOd0QctRNk-pt1Gp08NyiFfodboDiuEjkT0qInhWtUvtAHt_WXUK9fmyyXR4tOuaGSqcsNboVRrc01LxWwIHxKX-XBlRGUyXGcQAg-mj62rTFGr7ar1lWRjMShSnzrKyT_05fU76mcj24FZuTjXRBI0NSPsaa7UoJKIa1_9zZqapC9wLjkIcRjwMrUZxfMBt2',
    alt: 'Professional flat lay of standard red masonry pavers arranged in a perfect herringbone pattern with clean grout lines',
    badge: { text: 'Essentials', type: 'secondary' },
    sku: 'BB-SRP-110',
    slug: 'standard-red-paver'
  }
];

export const CatalogGrid: React.FC = () => {
  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.masonryGrid}>
          {catalogData.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={`${styles.cardTitle} font-headline-md`}>{item.title}</h3>
                  <span className={`${styles.badge} ${styles['badge' + item.badge.type]}`}>
                    {item.badge.text}
                  </span>
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
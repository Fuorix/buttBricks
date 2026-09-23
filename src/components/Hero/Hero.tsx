import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const brickImageUrl = "/hero-brick-wall.jpg";

  return (
    <section className={styles.heroSection}>
      <div 
        className={styles.heroBackground} 
        style={{ backgroundImage: `url('${brickImageUrl}')` }}
        role="img"
        aria-label="Premium red terracotta bricks wall"
      />
      
      <div className={styles.heroOverlay} />
      
      <div className={styles.heroContent}>
        <span className={styles.established}>Established 1979</span>
        <h1 className={`${styles.title} font-display-xl`}>
          Pakistan&apos;s Premier Brick Manufacturer
        </h1>
        <p className={`${styles.description} font-body-lg`}>
          Supplying architects, engineers and contractors with premium quality face bricks, floor designs and khaprail across Pakistan and the world.
        </p>
        
        <div className={styles.buttonGroup}>
          <Link href="/products" className={styles.primaryButton}>
            Explore Products
          </Link>
          <Link href="/contact" className={styles.secondaryButton}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};
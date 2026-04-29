import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <p className={`${styles.brandName} font-headline-md`}>Butt Bricks</p>
            <p className={`${styles.brandTagline} font-label-caps`}>Built to Last Since 1979</p>
          </div>
          
          <div className={styles.links}>
            <Link href="/heritage" className={`${styles.link} font-label-caps`}>Our Heritage</Link>
            <Link href="/products" className={`${styles.link} font-label-caps`}>Products</Link>
            <Link href="/projects" className={`${styles.link} font-label-caps`}>Mega Projects</Link>
            <Link href="/contact" className={`${styles.link} font-label-caps`}>Contact & Support</Link>
          </div>
          
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <span className="material-symbols-outlined">social_leaderboard</span>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Brand Awareness">
              <span className="material-symbols-outlined">brand_awareness</span>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Groups">
              <span className="material-symbols-outlined">groups</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <div className={styles.container}>
          <p className={`${styles.copyright} font-label-caps`}>
            © 2025-2026 Butt Bricks Company. Built to Last. Crafted for Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};
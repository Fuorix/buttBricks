import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <p className={`${styles.brandName} font-headline-md`}>Butt Bricks</p>
            <p className={`${styles.brandTagline} font-body-md`}>Built to Last Since 1979</p>
          </div>
          
          <div className={styles.links}>
            <Link href="/heritage" className={styles.link}>Our Heritage</Link>
            <Link href="/products" className={styles.link}>Products</Link>
            <Link href="/projects" className={styles.link}>Mega Projects</Link>
            <Link href="/contact" className={styles.link}>Contact &amp; Support</Link>
          </div>
          
          <div className={styles.social}>
            <a href="#" className={styles.socialLink}>
              <span className="material-symbols-outlined" data-icon="facebook">social_leaderboard</span>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className="material-symbols-outlined" data-icon="brand_awareness">brand_awareness</span>
            </a>
            <a href="#" className={styles.socialLink}>
              <span className="material-symbols-outlined" data-icon="groups">groups</span>
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

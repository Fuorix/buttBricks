import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logoLink}>
              <Image 
                src="/favicon.png" 
                alt="Butt Bricks Logo" 
                width={36} 
                height={36} 
                className={styles.logoImage}
              />
              <p className={`${styles.brandName} font-headline-md`}>Butt Bricks</p>
            </Link>
            <p className={`${styles.brandDescription} font-body-md`}>
              Premium quality bricks and Gutka Products for all your construction needs. Building strong foundations since 1979.
            </p>
            
            <div className={styles.social}>
              {/* 2. Use the icons simply like this */}
              <a href="https://web.facebook.com/buttbrickscompany/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="https://x.com/buttbricks" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                <FaXTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/buttbricks/?_l=en_US" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className={styles.linksColumn}>
            <h3 className={`${styles.columnTitle} font-label-caps`}>Quick Links</h3>
            <div className={styles.linkList}>
              <Link href="/heritage" className={styles.link}>Our Heritage</Link>
              <Link href="/products" className={styles.link}>Products</Link>
              <Link href="/projects" className={styles.link}>Mega Projects</Link>
              <Link href="/contact" className={styles.link}>Contact & Support</Link>
            </div>
          </div>
          
          <div className={styles.contactColumn}>
            <h3 className={`${styles.columnTitle} font-label-caps`}>Contact Us</h3>
            
            <div className={styles.contactItem}>
              <span className={`material-symbols-outlined ${styles.contactIcon}`}>location_on</span>
              <p className={styles.contactText}>
                Defence Road, Canal Bridge,<br />
                Harbans Pura, Lahore, Punjab,<br />
                Pakistan. (54000)
              </p>
            </div>
            
            <div className={styles.contactItem}>
              <span className={`material-symbols-outlined ${styles.contactIcon}`}>mail</span>
              <a href="mailto:info@buttbricks.com" className={styles.contactText}>info@buttbricks.com</a>
            </div>

            <div className={styles.contactItem}>
              <span className={`material-symbols-outlined ${styles.contactIcon}`}>call</span>
              <div className={styles.phoneList}>
                <a href="tel:+923219485444" className={styles.contactText}>+92 321 9485444</a>
                <a href="tel:+923212222957" className={styles.contactText}>+92 321 2222957</a>
                <a href="tel:+923214001318" className={styles.contactText}>+92 321 4001318</a>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <div className={styles.container}>
          <p className={`${styles.copyright} font-label-caps`}>
            © 2026 Butt Bricks Company - Butt Brothers Bricks Company. Built to Last.
          </p>
        </div>
      </div>
    </footer>
  );
};
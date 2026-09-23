import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import styles from './Footer.module.css';

/**
 * Social profiles. Add an entry only when the real profile URL is known;
 * an icon with no destination is worse than no icon at all.
 * TODO(client): supply the Instagram profile URL and re-add FaInstagram here.
 */
const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/buttbrickscompany/',
    Icon: FaFacebook,
  },
  { label: 'X', href: 'https://x.com/buttbricks', Icon: FaXTwitter },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/buttbricks/',
    Icon: FaLinkedin,
  },
] satisfies { label: string; href: string; Icon: typeof FaFacebook }[];

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
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
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
              <a href="mailto:buttbricks@yahoo.com" className={styles.contactText}>buttbricks@yahoo.com</a>
            </div>

            <div className={styles.contactItem}>
              <span className={`material-symbols-outlined ${styles.contactIcon}`}>call</span>
              <div className={styles.phoneList}>
                <a href="tel:+923219485444" className={styles.contactText}>+92 321 9485444</a>
                <a href="tel:+923281222957" className={styles.contactText}>+92 328 1222957</a>
                <a href="tel:+923214001318" className={styles.contactText}>+92 321 4001318</a>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <div className={styles.container}>
          <p className={`${styles.copyright} font-label-caps`}>
            © {new Date().getFullYear()} Butt Bricks Company - Butt Brothers Bricks
            Company. Built to Last.
          </p>
        </div>
      </div>
    </footer>
  );
};
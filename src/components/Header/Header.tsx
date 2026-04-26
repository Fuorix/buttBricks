"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <span className={`material-symbols-outlined ${styles.logoIcon}`} data-icon="construction">
            construction
          </span>
          <span className={styles.logoText}>Butt Bricks</span>
        </div>
        
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>Home</Link>
          <Link href="/products" className={`${styles.navLink} ${pathname.startsWith('/products') ? styles.active : ''}`}>Products</Link>
          <Link href="/heritage" className={`${styles.navLink} ${pathname === '/heritage' ? styles.active : ''}`}>About</Link>
          <Link href="/projects" className={`${styles.navLink} ${pathname === '/projects' ? styles.active : ''}`}>Mega Projects</Link>
          <Link href="/contact" className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}>Contact</Link>
        </div>
        
        <button className={styles.ctaButton}>
          <span className="material-symbols-outlined" data-icon="chat" style={{ fontSize: '14px' }}>
            chat
          </span>
          Inquire Now
        </button>
      </nav>
    </header>
  );
};

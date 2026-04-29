"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logoContainer} onClick={closeMenu}>
          <span className={`material-symbols-outlined ${styles.logoIcon}`}>
            construction
          </span>
          <span className={styles.logoText}>Butt Bricks</span>
        </Link>
        
        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`} onClick={closeMenu}>Home</Link>
          <Link href="/products" className={`${styles.navLink} ${pathname.startsWith('/products') ? styles.active : ''}`} onClick={closeMenu}>Products</Link>
          <Link href="/heritage" className={`${styles.navLink} ${pathname === '/heritage' ? styles.active : ''}`} onClick={closeMenu}>About</Link>
          <Link href="/projects" className={`${styles.navLink} ${pathname === '/projects' ? styles.active : ''}`} onClick={closeMenu}>Mega Projects</Link>
          <Link href="/contact" className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`} onClick={closeMenu}>Contact</Link>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.ctaButton}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              chat
            </span>
            <span className={styles.ctaText}>Inquire Now</span>
          </button>
          
          <button className={styles.menuToggle} onClick={toggleMenu} aria-label="Toggle menu">
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};
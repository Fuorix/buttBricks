"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [controlNavbar]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'PRODUCTS', href: '/products' },
    { name: 'ABOUT US', href: '/heritage' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
      <nav className={styles.nav}>
        {/* Left Section: Logo */}
        <div className={styles.navLeft}>
          <Link href="/" className={styles.logoContainer} onClick={() => setIsMobileMenuOpen(false)}>
            <Image 
              src="/favicon.png" 
              alt="Butt Bricks Logo" 
              width={32} 
              height={32} 
              className={styles.logoImage}
              priority
            />
            <span className={styles.logoText}>BUTT BRICKS</span>
          </Link>
        </div>

        {/* Center Section: Navigation Links */}
        <div 
          className={`${styles.backdrop} ${isMobileMenuOpen ? styles.backdropVisible : ''}`} 
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        
        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href} className={styles.navItem}>
              <Link 
                href={link.href} 
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className={styles.mobileOnlyCta}>
            <Link href="/quote" className={styles.ctaButton} onClick={() => setIsMobileMenuOpen(false)}>
               <span className="material-symbols-outlined">construction</span>
               <span>GET A QUOTE</span>
            </Link>
          </li>
        </ul>

        <div className={styles.navRight}>
          <div className={styles.actions}>
            <Link href="/contact" className={`${styles.ctaButton} ${styles.desktopCta}`}>
              <span className="material-symbols-outlined">construction</span>
              <span className={styles.ctaText}>GET A QUOTE</span>
            </Link>
            
            <button 
              className={styles.menuToggle} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
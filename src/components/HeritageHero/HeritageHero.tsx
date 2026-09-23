"use client";

import React, { useRef } from 'react';
import styles from './HeritageHero.module.css';

export const HeritageHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  const scrollToNextSection = () => {
    if (heroRef.current && heroRef.current.nextElementSibling) {
      const nextSection = heroRef.current.nextElementSibling as HTMLElement;
      const targetPosition = nextSection.getBoundingClientRect().top + window.scrollY ;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={heroRef} className={styles.heroSection}>
      <div className={styles.overlay}></div>
      <img 
        className={styles.image} 
        alt="Cinematic shot of a traditional industrial brick kiln at dawn with glowing fire light and rising smoke against a moody grey sky" 
        src="/heritage-hero.jpg"
      />
      <div className={styles.contentContainer}>
        <span className={`${styles.tagline} font-label-caps`}>Est. 1979 — Lahore</span>
        <h1 className={`${styles.title} font-display-xl`}>
          Our Heritage: <br/>
          Fired by Tradition, <br/>
          <span className={styles.italicText}>Built for the Future.</span>
        </h1>
      </div>
      <button 
        type="button"
        className={styles.scrollIndicator} 
        onClick={scrollToNextSection}
        aria-label="Scroll to next section"
      >
        <span className="material-symbols-outlined" aria-hidden="true">south</span>
      </button>
    </section>
  );
};
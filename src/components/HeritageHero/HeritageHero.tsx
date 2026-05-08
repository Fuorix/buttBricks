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
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU_6ElvQPSIV2qPD0QlHL5dQeS17uPWlpN4VRs7QxoaN_8V7G9OI2uraWkKldJlK7dAjxgIYzjrZa_Xy9vS_VviSMecrYjaJn0sHB3ncw5hSrx2wqEkZ3Owdp9uKo3sbXjr17g547Lo9_DfPIYml_oq4fslxoKtzxgUiHUgy0SSsZ3veGGasN8cVRJJmyrG1YO5_hQfahWWxy6lzkPSvLb4WyCfl6Pp68B8JCZZblMfyDJEd5pq-o6wqffYG1QsOZrDQ-yy-xib8-T"
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
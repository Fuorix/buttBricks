import React from 'react';
import styles from './About.module.css';

export const About = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.container}>
        <div className={styles.contentColumn}>
          <span className={`${styles.tagline} font-label-caps`}>OUR HERITAGE</span>
          <h2 className={`${styles.title} font-display-xl`}>Legacy Built in Clay & Fire</h2>
          <div className={styles.divider}></div>
          
          <p className={`${styles.description} font-body-lg`}>
            Founded by <strong>Muhammad Yaqoob Butt</strong>, the Butt Bricks Company has been at the forefront of Pakistan's industrial masonry for over four decades.
          </p>
          <p className={`${styles.description} ${styles.marginBottom} font-body-lg`}>
            Operating from three state-of-the-art production kilns in Jallo, Lahore, we combine centuries-old craftsmanship with modern industrial precision to deliver bricks that are not just building materials, but a legacy of strength.
          </p>
          
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={`material-symbols-outlined ${styles.checkIcon}`} data-icon="check_circle">check_circle</span>
              <span>3 Specialized Kilns in Jallo</span>
            </li>
            <li className={styles.featureItem}>
              <span className={`material-symbols-outlined ${styles.checkIcon}`} data-icon="check_circle">check_circle</span>
              <span>Direct Source from Factory</span>
            </li>
            <li className={styles.featureItem}>
              <span className={`material-symbols-outlined ${styles.checkIcon}`} data-icon="check_circle">check_circle</span>
              <span>Internationally Recognized Standards</span>
            </li>
          </ul>
        </div>
        
        <div className={styles.imageColumn}>
          <div className={styles.imageAccent}></div>
          <img 
            className={styles.image} 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEQ2R8LIPAAPGRc2briiHadzrK_uw3041rz4hv_etUfpqTnTQBrMZgaAj5m9A4men5A3MI9QLhC5BZNX1gNA-1hTPA8THLa6D-1bG4tBeMRB1GHuIjOtdpIfy4AsA6jK-ggeBBjwPPAv7kgj6rLBiPuQFEMdqQj2AfQavhWckQejtkEwHUf67m7LcGDPWNK6RUxrlV3tOiyhdB7RxCn018LO8B8A2ebghRaF9AI9zH-4WYHBRBzvf3tJbOf8XYhBJncNFnRJVw30kQ" 
            alt="Wide shot of an industrial brick kiln facility at sunset with smoke stacks and rows of cooling bricks" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

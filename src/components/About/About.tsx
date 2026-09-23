import React from 'react';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.container}>
        <div className={styles.contentColumn}>
          <span className={`${styles.tagline} font-label-caps`}>Our Heritage</span>
          <h2 className={`${styles.title} font-headline-lg`}>Legacy Built in Clay & Fire</h2>
          <div className={styles.divider} />
          
          <p className={`${styles.description} font-body-lg`}>
            Founded by <strong>Muhammad Yaqoob Butt</strong>, the Butt Bricks Company has been at the forefront of Pakistan&apos;s industrial masonry for over four decades.
          </p>
          <p className={`${styles.description} ${styles.marginBottom} font-body-lg`}>
            Operating from two state-of-the-art production kilns in Lahore, we combine centuries-old craftsmanship with modern industrial precision to deliver bricks that are not just building materials, but a legacy of strength.
          </p>
          
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={`material-symbols-outlined ${styles.checkIcon}`}>check_circle</span>
              <span>2 Specialized Kilns</span>
            </li>
            <li className={styles.featureItem}>
              <span className={`material-symbols-outlined ${styles.checkIcon}`}>check_circle</span>
              <span>Direct Source from Factory</span>
            </li>
            <li className={styles.featureItem}>
              <span className={`material-symbols-outlined ${styles.checkIcon}`}>check_circle</span>
              <span>Internationally Recognized Standards</span>
            </li>
          </ul>
        </div>
        
        <div className={styles.imageColumn}>
          <div className={styles.imageAccent} />
          <img 
            className={styles.image} 
            src="/about-factory.jpg" 
            alt="Wide shot of an industrial brick kiln facility at sunset with smoke stacks and rows of cooling bricks" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
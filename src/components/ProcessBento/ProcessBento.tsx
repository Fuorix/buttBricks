import React from 'react';
import styles from './ProcessBento.module.css';

export const ProcessBento = () => {
  return (
    <section className={styles.bentoSection}>
      <div className={styles.header}>
        <span className={`${styles.title} font-label-caps`}>The Methodology</span>
        <h2 className={`${styles.tagline} font-headline-lg`}>Ancestral Craft meets Industrial Performance</h2>
      </div>
      
      <div className={styles.bentoGrid}>
        <div className={styles.mainFeature}>
          <img 
            className={styles.image} 
            alt="Vast industrial masonry yard with thousands of perfectly stacked terracotta bricks" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkdON-AbCsH1BtKB-Y9WP0Iql2ZGM5OA5n1vY36jzJpKTvm9nHlmVXsyMIC7PH4zDwz7wZ__Yn_-VcIosvm1OKrNy4lKt10kWtyeugyiWjrZQEwgkBD7qbgxXrdRJJeBlu9RdlKLbPdIBv8yCTRKnnDFdPEG56FaOjnSRaNHakiq8Q0hnBqs9VKOLnaFT1GIqvpw60cjTyq245V0kfnooTQreE2-rAqIMii2p0V0XZlVdoHK0xV2yCkyYGJ54Y8I_h3LqXKy4UE9vV"
          />
          <div className={styles.overlay}></div>
          <div className={styles.featureContent}>
            <h3 className={`${styles.featureTitle} font-headline-md`}>Lahore Operations</h3>
            <p className={`${styles.featureDesc} font-body-md`}>
              Our strategic location allows access to the finest alluvial clay, processed through our proprietary slow-fire method.
            </p>
          </div>
        </div>
        
        <div className={styles.sideFeatures}>
          <div className={styles.topFeature}>
            <span className={`material-symbols-outlined ${styles.icon}`} data-icon="science">science</span>
            <div>
              <h4 className={`${styles.sideTitle} font-headline-md`}>Thermal Stability</h4>
              <p className={`${styles.sideDesc} font-body-md`}>Every batch undergoes rigorous stress testing to ensure centuries of durability.</p>
            </div>
          </div>
          
          <div className={styles.bottomFeature}>
            <span className={`material-symbols-outlined ${styles.iconDark}`} data-icon="eco">eco</span>
            <div>
              <h4 className={`${styles.sideTitleDark} font-headline-md`}>Sustainable Clay</h4>
              <p className={`${styles.sideDescDark} font-body-md`}>Eco-conscious excavation and carbon-monitored firing cycles.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
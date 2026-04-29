import React from 'react';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div 
        className={styles.heroBackground} 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApNfdTZB5hVvbxAnDbXqNjRH_77M6Mpy7ESnOuA4rFfXE2zDeTEgB3JU9KQ8dL4Vy6knD0eNoUSlkfC7srG7uLfZgCYbZhSh10jvHBvkMFkatWp6a951YemIIw9_TGUGN8xKjnDs-VkYSpFvi9KYsSv8eT6oBHOmy85X2JzPzW7TKykeTDWuWYUlcp75gvUGj1sdJQIH-r5EULXthJ_mzPt6At0LGMQdstmgh51Ite63xabX0TQJqQnMEtvm4NDe4vQFg7PVaRw_mr')" }}
        role="img"
        aria-label="Close up of premium red terracotta bricks in a meticulously aligned wall with sharp grout lines and industrial lighting"
      />
      <div className={styles.heroOverlay} />
      
      <div className={styles.heroContent}>
        <span className={styles.established}>Established 1979</span>
        <h1 className={`${styles.title} font-display-xl`}>
          Pakistan's Premier Brick Manufacturer Since 1979
        </h1>
        <p className={`${styles.description} font-body-lg`}>
          Supplying architects, engineers and contractors with premium quality face bricks, floor designs and khaprail across Pakistan and the world.
        </p>
        
        <div className={styles.buttonGroup}>
          <button className={styles.primaryButton}>
            Explore Products
          </button>
          <button className={styles.secondaryButton}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};
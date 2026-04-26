import React from 'react';
import styles from './ProductHero.module.css';

export const ProductHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.imageColumn}>
        <div className={styles.mainImageWrapper}>
          <img 
            className={styles.image} 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKuBET6rU0YjkX9WsVaG0T_2iqyIVr41RXi24cLCr1HKsj826yywVYMlP5XpzBbZ7qxOjsPCCvE1e78lmK5vUnfawDuZmeG6FnUo4x0nLDwH0So3zRzUWyawnnClvtmD6-5qSwnQD12ztHJdH1hUSjUg-vIVCd16JbtM-nmUdDRCCgOctzGtF0buutV4QlELQUpP-n5z877bjQ39TItNhO2HzTzHL87OAWM2XXjl8nkw44TzxlfKFcIQIcet1UMSoz_AmCW_WB1NA4" 
            alt="Close-up of Fare Face Gutka brick with deep red clay texture, smooth edges, and architectural precision under warm natural light." 
          />
        </div>
        
        <div className={styles.thumbnailGrid}>
          <div className={styles.thumbnailWrapper}>
            <img 
              className={styles.image} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhEdrMKaKtr_xaDwAnJXWu79HN3EKlt6K8Z_D2bPzATMmShJprjwTpH9agQA_fbyPWRMzim6QJ-25n5uov4KlyCwn0HkTltqJVhSZIzmYwzMc83kNqT7YeSfzN7frIbse0nPsHyUDpH5iqwZPOJ2eTgkv-OMvxo2rHDOaUz2C0pO0BzngX8w5W_m3oKjG9buidCNsNNVlc2NfYRQoHRUwKqiA0HoufIRTHEW-5k05gXVLAu9DnRger7x3rLwYaMpz1Asa0Al27EXV9" 
              alt="Detailed macro shot showing the smooth clay finish and industrial strength of the Fare Face Gutka material." 
            />
          </div>
          <div className={styles.thumbnailWrapper}>
            <img 
              className={styles.image} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7CI6OnOXKgw8ZGC7QXhS4orFVDzxDzVe0qXmIpF61UpXe8pkQfoO5nkHu3-VzwNxO54lcsLWTR9NXTg4gD7OLZkxsq7k0VVLIfBVSfi13c8oklVP-5ExA_lo2UvTRmvTV04qKZoKp5tcHh-YepMloP5-TBY2rswGvhDB3YV6XG3NHGVkJ0m0Gbm3lhO2gaa7RUTPYy19W1v3gKZpOmG5ZPQMGwOlY-_Vwq0XmdF-kKTcsgITDXIvCyXBEOhfnq2aaCUxtSuUfC0cz" 
              alt="Modern architectural facade featuring Fare Face Gutka bricks in a sophisticated horizontal pattern on a contemporary luxury home." 
            />
          </div>
          <div className={`${styles.thumbnailWrapper} ${styles.moreImages}`}>
            <img 
              className={styles.image} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWU874K8lwGNO2iCqLkozEgbV9DDdKkZgjcwQvcjhqO440opdN4KshWH_GicJ42GlPJJNyUKg4ghQHDS9l32ymtXJyDPJCxpSOu8AmPca7cTtarTj1Cs7SqAulmL4siOBwkVrX0q9Uejks1nNV-Ea5_TgjTLGyHIhdCJDDG5hcpuGdIKS8GfcqPI9y-lfrMUqDV12KwozPlNcwpN58rGks5s6iHQqptTy182HbNGSOl6hoxVIaQFOfSe0gD7nWHiQO37OoJ3-uvRRZ" 
              alt="Construction site overview with pallets of high-quality red bricks ready for structural implementation in a premium project." 
            />
            <div className={styles.moreOverlay}>
              <span className="font-label-caps text-white">+5 More</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.contentColumn}>
        <div className={styles.titleSection}>
          <span className={`${styles.tagline} font-label-caps`}>Signature Collection</span>
          <h1 className={`${styles.title} font-display-xl`}>Fare Face Gutka</h1>
          <p className={`${styles.description} font-body-lg`}>
            The architect's choice for precision masonry. Crafted from aged red clay for a finish that matures gracefully with time.
          </p>
        </div>
        
        <div className={styles.featuresSection}>
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <span className="material-symbols-outlined" data-icon="shield">shield</span>
            </div>
            <div>
              <h4 className={`${styles.featureTitle} font-label-caps`}>Weather Resistant</h4>
              <p className={styles.featureDesc}>Withstands extreme thermal shifts.</p>
            </div>
          </div>
          
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <span className="material-symbols-outlined" data-icon="eco">eco</span>
            </div>
            <div>
              <h4 className={`${styles.featureTitle} font-label-caps`}>Eco-Friendly</h4>
              <p className={styles.featureDesc}>100% natural kiln-fired clay.</p>
            </div>
          </div>
          
          <div className={styles.featureItem}>
            <div className={styles.iconWrapper}>
              <span className="material-symbols-outlined" data-icon="fitness_center">fitness_center</span>
            </div>
            <div>
              <h4 className={`${styles.featureTitle} font-label-caps`}>High Strength</h4>
              <p className={styles.featureDesc}>Structural grade compression.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.actionSection}>
          <button className={styles.inquireButton}>
            Inquire for Project Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

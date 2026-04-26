import React from 'react';
import styles from './ContactMap.module.css';

export const ContactMap = () => {
  return (
    <section className={styles.mapSection}>
      <div className={styles.container}>
        <div className={styles.mapWrapper}>
          <div 
            className={styles.mapBackground}
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGA8zvvYhKdsRXWj6J8p2jQyTArs-yQxGhLLNBiR6bojK4JvrxY9OCrmTevtRvCus7EdLOUHFvl-SoxumE7aRLpOuaaAoyjn8XCOrPJnjMN2KFkDe4JLvNxdte41Z_MxgK1yS3hgjMHkyfK2v3uSU2P9nTgnoSDnXKnguZr3CjJM5Yvq5x78YM8z4OXt1mNonp2k1phZPW0Qiz_OriBXfGvosVWXEJ7vlg7GKyTzeB0KtTbFsEP7GO9MV0RcpPY09OIv1jqCih9RUK')" }}
          ></div>
          <div className={styles.mapOverlay}></div>
          <div className={styles.pinContainer}>
            <div className={styles.pinIconWrapper}>
              <span className={`material-symbols-outlined ${styles.pinIcon}`} data-icon="home_pin" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>home_pin</span>
            </div>
          </div>
          
          <div className={styles.structuralBorder}></div>
          
          <div className={styles.visitorCard}>
            <p className={`${styles.visitorTitle} font-label-caps`}>Visitor Access</p>
            <p className={`${styles.visitorDesc} font-body-md`}>Site visits available by appointment only. Please schedule through the inquiry form.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

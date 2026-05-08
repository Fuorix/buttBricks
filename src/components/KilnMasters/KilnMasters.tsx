import React from 'react';
import styles from './KilnMasters.module.css';

export const KilnMasters = () => {
  return (
    <section className={styles.mastersSection}>
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          <img 
            className={styles.image} 
            alt="Professional engineer and an elderly master craftsman discussing blueprints at a construction site with heavy brickwork" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0yiOxt-7QJ7eukmnU54a1S0mnSBaODJsS4h62pOtDPgAf03JMeHmdIGmrDGfHCxiKpoZ5DFAfHv1dXFWO_pr29CrkJXLNLnUEL5HwJ823u8bp1LjRtR7-Y179Lz75ao5WuWdQmD2f-alWo7qBP0tYuqjBWjulIq9W2AeGG0tCNnJxFrxGLiFSGtV_0OTi3BjJX2IPQntj78T_VlVNns9S_qB-kapoaSps5GHPDzjCahnHt5lN2vKJadj7zBKxt4tmXavNbqXQCeCj"
          />
        </div>
        
        <div className={styles.contentColumn}>
          <h2 className={`${styles.title} font-headline-lg`}>Masters of the Flame</h2>
          <p className={`${styles.description} font-body-lg`}>
            Behind every shipment are our 'Kiln Masters' artisans who possess a multi-generational understanding of temperature and texture. We pair their intuition with high-precision structural engineers to bridge the gap between art and infrastructure.
          </p>
          
          <div className={styles.list}>
            <div className={styles.listItem}>
              <span className={`${styles.number} font-headline-md`}>01</span>
              <span className={`${styles.listText} font-label-caps`}>Generational Wisdom</span>
            </div>
            <div className={styles.listItem}>
              <span className={`${styles.number} font-headline-md`}>02</span>
              <span className={`${styles.listText} font-label-caps`}>Engineering Precision</span>
            </div>
            <div className={styles.listItem}>
              <span className={`${styles.number} font-headline-md`}>03</span>
              <span className={`${styles.listText} font-label-caps`}>Logistical Mastery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
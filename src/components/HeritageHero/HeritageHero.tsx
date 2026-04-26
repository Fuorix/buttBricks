import React from 'react';
import styles from './HeritageHero.module.css';

export const HeritageHero = () => {
  return (
    <section className={styles.heroSection}>
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
      <div className={styles.scrollIndicator}>
        <span className="material-symbols-outlined" data-icon="south">south</span>
      </div>
    </section>
  );
};

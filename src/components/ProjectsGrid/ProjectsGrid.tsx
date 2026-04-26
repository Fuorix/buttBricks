import React from 'react';
import styles from './ProjectsGrid.module.css';

export const ProjectsGrid = () => {
  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.masonryGrid}>
          {/* Large Card: Allama Iqbal Airport */}
          <div className={`${styles.card} ${styles.cardLarge}`}>
            <div className={`${styles.imageWrapper} ${styles.aspect16_9}`}>
              <img 
                className={styles.image} 
                alt="Airport Architecture" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Uj86CPgJFhvll-kZs8mo5mUTIU8nxJEbOlkhu6NciYDyRSpXMQZeeneBAL719eIF7IflAUr1BwjKjoZ_noVv5MHylP_V-8h1zyO7ywxOTi8-SfIXuMa6oqTM-Cd-C7il83XW3PNqlLeNMaT5Cfv54WcEYbiEU-1UwPuI1PkH4MquCLEK45s_bufJXvXKLMEC5x-TIJztd3egRrp66BjD6eGbRAai2SEQKY0SNOCllvXz3tnitg6wXwonnI8crVm0eGV5IgCNHHM8"
              />
              <div className={styles.badgeWrapper}>
                <span className={`${styles.badge} font-label-caps`}>Infrastructure</span>
              </div>
            </div>
            <div className={styles.cardContentBordered}>
              <div>
                <h3 className={`${styles.cardTitle} font-headline-md`}>Allama Iqbal International Airport</h3>
                <p className={`${styles.cardLocation} font-body-md`}>Lahore, Pakistan</p>
              </div>
              <span className={`material-symbols-outlined ${styles.arrowIcon}`} data-icon="arrow_outward">arrow_outward</span>
            </div>
          </div>
          
          {/* Side Card: LUMS */}
          <div className={`${styles.card} ${styles.cardSide}`}>
            <div className={`${styles.imageWrapper} ${styles.aspect4_5}`}>
              <img 
                className={styles.image} 
                alt="University Building" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeNEwLCOvOh5jhzK99zX-sMLrliUflruqwpIze03Ibyz4wS4HEa-hQJXZZoJunSaa0_34ZV9ztWMzU7sCDpEQ-viiOSs3hu9vplbk9_ESPcHlCExS-A2CCxSHab4pz6YGYwRYTSagwteiBnB3675YzknAtNfF0WzTAw_ysJGz-8IT0evOuADGKtah0is90Yjs0Cc4femg90eT43SpV6wwhop0LqJ-yTPcVFzNgHPg-I6eek2-IlsziMxS6vZPTE-2o3GuzApKzOkBF"
              />
              <div className={styles.badgeWrapper}>
                <span className={`${styles.badge} font-label-caps`}>Educational</span>
              </div>
            </div>
            <div className={styles.cardContentBorderedBottom}>
              <h3 className={`${styles.cardTitle} font-headline-md`}>LUMS Campus Expansion</h3>
              <p className={`${styles.cardLocation} font-body-md`}>Lahore, Punjab</p>
            </div>
          </div>
          
          {/* Standard Card: Shaukat Khanum */}
          <div className={`${styles.card} ${styles.cardStandard}`}>
            <div className={`${styles.imageWrapper} ${styles.aspectVideo}`}>
              <img 
                className={styles.image} 
                alt="Healthcare Facility" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpj5lJttM4kL3rumKW4e1hqfZ73pUlMPFm04swg1Ur9QObeEQU3SdzSuIlJhKsh8IkPIA6D4RJZxJw8ChETS2YxNbMxMOoS-EDxJviNK5-HOyABqD9H2NKvq0oClwkIMiYnNxvVG3ioB0LBu2M2wkMY1GvtOOlMKZbYJoByrfvFp8jWpUMl-5cunHvW_aLTtL6HCy7_U0LqzHVYqsffv2xnMimIHjY-TOWdsZ-SE2jlV3jnD1gaNTU-Q1ZgyWPc2axeNm3p7UajQmD"
              />
              <div className={styles.badgeWrapper}>
                <span className={`${styles.badge} font-label-caps`}>Healthcare</span>
              </div>
            </div>
            <div className={styles.cardContentBorderedBottom}>
              <h3 className={`${styles.cardTitle} font-headline-md`}>Shaukat Khanum Memorial Hospital</h3>
              <p className={`${styles.cardLocation} font-body-md`}>Peshawar, KPK</p>
            </div>
          </div>
          
          {/* Standard Card: Aitchison */}
          <div className={`${styles.card} ${styles.cardStandard}`}>
            <div className={`${styles.imageWrapper} ${styles.aspectVideo}`}>
              <img 
                className={styles.image} 
                alt="Historic School" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlJnng6Evu8NmjAKsN_r1sKhDwdOEY-KMTK29zAEbWuFIf8ot8uMB-uAZgvCeLjRuDjmZJZERF5JmkqaA4OfRx9_LBu_vUG2iMjCtP4_YtN74_VNJfaq1nZY1KSB79bwYw88JmXfBhwWU5EOFixlaJUOttz7LmcsAKLL74MUFy8FlvxWgpcqkh-chG77TVnfiQcnfoq9qLlk66ZxFssktV4X315kw5o95fKgSzsZPDU_GDBYt3Ho93s8n9vrCYrsjeDlpBXs4pGyVh"
              />
              <div className={styles.badgeWrapper}>
                <span className={`${styles.badge} font-label-caps`}>Educational</span>
              </div>
            </div>
            <div className={styles.cardContentBorderedBottom}>
              <h3 className={`${styles.cardTitle} font-headline-md`}>Aitchison College Restoration</h3>
              <p className={`${styles.cardLocation} font-body-md`}>Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

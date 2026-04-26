import React from 'react';
import styles from './ProjectsHeader.module.css';

export const ProjectsHeader = () => {
  return (
    <header className={styles.headerSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContainer}>
            <p className={`${styles.tagline} font-label-caps`}>Portfolio of Excellence</p>
            <h1 className={`${styles.title} font-display-xl`}>Architectural Landmarks</h1>
            <p className={`${styles.subtitle} font-headline-md`}>
              A legacy etched in Pakistan's skyline.
            </p>
          </div>
          <div className={styles.accentLineContainer}>
            <div className={styles.accentLine}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

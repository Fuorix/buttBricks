import React from 'react';
import styles from './ProjectsFilter.module.css';

export const ProjectsFilter = () => {
  return (
    <section className={styles.filterSection}>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          <button className={`${styles.filterButton} ${styles.active} font-label-caps`}>All Projects</button>
          <button className={`${styles.filterButton} font-label-caps`}>Educational</button>
          <button className={`${styles.filterButton} font-label-caps`}>Infrastructure</button>
          <button className={`${styles.filterButton} font-label-caps`}>Healthcare</button>
        </div>
        
        <div className={styles.sortContainer}>
          <span className={`${styles.sortLabel} font-label-caps`}>Sort By:</span>
          <span className={`${styles.sortValue} font-label-caps`}>Newest First</span>
          <span className="material-symbols-outlined" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import styles from './ProjectsGrid.module.css';
import { megaProjectsData } from '@/data/megaProjectsData';

export const ProjectsGrid: React.FC = () => {
  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.masonryGrid}>
          {megaProjectsData.map((project) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  className={styles.image} 
                  alt={project.title} 
                  src={project.image}
                />
                <div className={styles.badgeWrapper}>
                  <span className={`${styles.badge} font-label-caps`}>{project.category}</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={`${styles.cardTitle} font-headline-md`}>{project.title}</h3>
                <p className={`${styles.cardLocation} font-body-md`}>{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
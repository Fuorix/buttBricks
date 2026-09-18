import React from 'react';
import styles from './Projects.module.css';
import { projectsData } from '@/data/projectsData'; // Linked here

export const Projects: React.FC = () => {
  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`${styles.tagline} font-label-caps`}>Portfolio</span>
          <h2 className={`${styles.title} font-headline-lg`}>Trusted by Pakistan&apos;s Biggest Projects</h2>
        </div>
        
        <div className={styles.grid}>
          {projectsData.map((project, index) => (
            <div key={index} className={styles.card}>
              <span className={`material-symbols-outlined ${styles.icon}`}>
                {project.icon}
              </span>
              <p className={`${styles.cardTitle} font-body-lg`}>{project.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
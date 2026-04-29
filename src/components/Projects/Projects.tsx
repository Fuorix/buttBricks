import React from 'react';
import styles from './Projects.module.css';

interface Project {
  icon: string;
  name: string;
}

const projectsData: Project[] = [
  { icon: 'flight', name: 'Allama Iqbal International Airport' },
  { icon: 'school', name: 'LUMS University' },
  { icon: 'health_and_safety', name: 'Shaukat Khanum Cancer Hospital' },
  { icon: 'museum', name: 'Aitchison College' },
  { icon: 'account_balance', name: 'FC College' },
  { icon: 'palette', name: 'Punjab Art Council' },
  { icon: 'child_care', name: 'Children Hospital' },
  { icon: 'sports_golf', name: 'Lahore Gymkhana Club' }
];

export const Projects: React.FC = () => {
  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`${styles.tagline} font-label-caps`}>Portfolio</span>
          <h2 className={`${styles.title} font-headline-lg`}>Trusted by Pakistan's Biggest Projects</h2>
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
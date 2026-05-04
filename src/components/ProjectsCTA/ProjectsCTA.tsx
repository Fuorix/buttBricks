import React from 'react';
import styles from './ProjectsCTA.module.css';
import Link from 'next/link';

export const ProjectsCTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <h2 className={`${styles.title} font-headline-lg`}>Ready to Build the Next Landmark?</h2>
        <p className={`${styles.description} font-body-lg`}>
          Consult with our structural engineers and master masons to bring your architectural vision to life with the permanence of Butt Bricks.
        </p>
        <Link href="/contact" className={styles.link}>
          <button className={`${styles.button} font-label-caps`}>
            Start Your Project
          </button>
        </Link>
      </div>
    </section>
  );
};

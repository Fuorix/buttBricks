import React from 'react';
import styles from './Timeline.module.css';

const timelineEvents = [
  {
    year: '1979',
    title: 'FOUNDATION',
    description: 'Muhammad Yaqoob Butt establishes the first kiln, prioritizing material purity.',
    active: true
  },
  {
    year: '1995',
    title: 'TRIPLE KILN SCALE',
    description: 'Expansion to three high-capacity kilns in the Jallo area to meet industrial demand.',
    active: false
  },
  {
    year: '2008',
    title: 'GLOBAL REACH',
    description: 'Initiation of international exports, bringing Punjab’s earth to global architecture.',
    active: false
  },
  {
    year: '2024',
    title: 'LEGACY PROJECTS',
    description: 'Primary partner for LUMS, Aitchison College, and national infrastructure icons.',
    active: false
  }
];

export const Timeline = () => {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <h2 className={`${styles.mainTitle} font-headline-lg`}>Forty-Five Years of Structural Integrity</h2>
        <div className={styles.grid}>
          {timelineEvents.map((event, index) => (
            <div key={index} className={styles.eventItem}>
              <div className={`${styles.dot} ${event.active ? styles.dotActive : ''}`}></div>
              <span className={`${styles.year} font-display-xl ${event.active ? styles.yearActive : ''}`}>{event.year}</span>
              <h3 className={`${styles.eventTitle} font-headline-md`}>{event.title}</h3>
              <p className={`${styles.eventDesc} font-body-md`}>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

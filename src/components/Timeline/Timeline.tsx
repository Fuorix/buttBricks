import React from 'react';
import styles from './Timeline.module.css';
import { timelineEvents } from '@/data/timelineData';

export const Timeline: React.FC = () => {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <h2 className={`${styles.mainTitle} font-headline-lg`}>Forty-Five Years of Structural Integrity</h2>
        <div className={styles.grid}>
          {timelineEvents.map((event, index) => (
            <div key={index} className={styles.eventItem}>
              <div className={`${styles.dot} ${event.active ? styles.dotActive : ''}`}></div>
              <span className={`${styles.year} font-display-xl ${event.active ? styles.yearActive : ''}`}>
                {event.year}
              </span>
              <h3 className={`${styles.eventTitle} font-headline-md`}>{event.title}</h3>
              <p className={`${styles.eventDesc} font-body-md`}>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
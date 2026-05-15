import React from 'react';
import Image from 'next/image';
import styles from './LeadershipTeam.module.css';
import { leadershipData } from '@/data/leadershipData';

export const LeadershipTeam: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`${styles.tagline} font-label-caps`}>Leadership</span>
          <h2 className={`${styles.title} font-headline-lg`}>Our Leadership Team</h2>
          <div className={styles.accentLine}></div>
          <p className={`${styles.subtitle} font-body-lg`}>
            Meet the visionaries guiding our strategic direction and ensuring excellence.
          </p>
        </div>

        <div className={styles.grid}>
          {leadershipData.map((leader) => (
            <div key={leader.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {leader.isLate && (
                  <span className={`${styles.lateBadge} font-label-caps`}>Late</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <h3 className={`${styles.name} font-headline-sm`}>{leader.name}</h3>
                <span className={`${styles.role} font-label-caps`}>{leader.role}</span>
                <p className={`${styles.description} font-body-md`}>{leader.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import styles from './AppreciationLetters.module.css';
import { appreciationLettersData } from '@/data/appreciationLettersData';
import { Lightbox } from '@/components/Lightbox/Lightbox';

export const AppreciationLetters: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = appreciationLettersData.map((l) => l.image);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={`${styles.tagline} font-label-caps`}>Recognition</span>
        <h2 className={`${styles.title} font-headline-lg`}>Appreciation Letters</h2>
        <div className={styles.divider} />
        <p className={`${styles.subtitle} font-body-lg`}>
          Testimonials of trust from Pakistan&apos;s most distinguished institutions.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {appreciationLettersData.map((letter, index) => (
            <div key={letter.id} className={styles.card} onClick={() => setLightboxIndex(index)}>
              <div className={styles.imageWrapper}>
                <img
                  src={letter.image}
                  alt={`Appreciation Letter ${letter.id}`}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
};

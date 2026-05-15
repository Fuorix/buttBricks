'use client';

import React, { useState } from 'react';
import styles from './ProjectsGrid.module.css';
import { megaProjectsData } from '@/data/megaProjectsData';
import { otherProjectsData } from '@/data/otherProjectsData';
import { Lightbox } from '@/components/Lightbox/Lightbox';

export const ProjectsGrid: React.FC = () => {
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxImages([]);

  const megaImages = megaProjectsData.map((p) => p.image);
  const otherImages = otherProjectsData.map((p) => p.image);

  return (
    <>
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.megaHeading}>
            <span className={`${styles.otherLabel} font-label-caps`}>Portfolio</span>
            <h2 className={`${styles.otherTitle} font-display-sm`}>Mega Projects</h2>
            <div className={styles.otherDivider} />
          </div>
          <div className={styles.masonryGrid}>
            {megaProjectsData.map((project, index) => (
              <div key={project.id} className={styles.card} onClick={() => openLightbox(megaImages, index)}>
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

      {otherProjectsData.length > 0 && (
        <section className={styles.otherSection}>
          <div className={styles.container}>
            <div className={styles.otherHeading}>
              <span className={`${styles.otherLabel} font-label-caps`}>Portfolio</span>
              <h2 className={`${styles.otherTitle} font-display-sm`}>Other Projects</h2>
              <div className={styles.otherDivider} />
            </div>
            <div className={styles.otherGrid}>
              {otherProjectsData.map((project, index) => (
                <div key={project.id} className={styles.otherCard} onClick={() => openLightbox(otherImages, index)}>
                  <div className={styles.otherImageWrapper}>
                    <img
                      className={styles.otherImage}
                      alt={`Project ${project.id}`}
                      src={project.image}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
};

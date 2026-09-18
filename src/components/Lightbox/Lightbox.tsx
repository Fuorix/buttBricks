'use client';

import React, { useEffect, useCallback } from 'react';
import styles from './Lightbox.module.css';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onNavigate }) => {
  const prev = useCallback(() => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onNavigate]);

  const next = useCallback(() => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        <span className="material-symbols-outlined">close</span>
      </button>

      <button type="button" className={`${styles.navBtn} ${styles.prevBtn}`} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      <div className={styles.imageContainer} onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1} of ${images.length}`}
          className={styles.image}
        />
      </div>

      <button type="button" className={`${styles.navBtn} ${styles.nextBtn}`} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      <div className={styles.counter}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

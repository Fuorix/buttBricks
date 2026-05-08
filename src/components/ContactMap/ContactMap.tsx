"use client";

import React, { useRef } from "react";
import styles from "./ContactMap.module.css";

export const ContactMap = () => {
  const mapRef = useRef<HTMLIFrameElement | null>(null);

  const resetMap = () => {
    if (mapRef.current) {
      mapRef.current.src = mapRef.current.src;
    }
  };

  return (
    <section className={styles.mapSection}>
      <div className={styles.container}>
        <div className={styles.mapWrapper}>
          
          <iframe
            ref={mapRef}
            className={styles.mapFrame}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.238926838!2d74.475432!3d31.5497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMyJzU4LjkiTiA3NMKwMjgnMzEuNiJF!5e0!3m2!1sen!2sus!4v1778238926838!5m2!1sen!2sus"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className={styles.mapOverlay}></div>

          <div className={styles.pinContainer}>
            <button
              onClick={resetMap}
              className={styles.pinButton}
              title="Reset map position"
            >
              <div className={styles.pinIconWrapper}>
                <span className={`material-symbols-outlined ${styles.pinIcon}`}>
                  home_pin
                </span>
              </div>
            </button>
          </div>

          <div className={styles.structuralBorder}></div>

          <div className={styles.visitorCard}>
            <p className={`${styles.visitorTitle} font-label-caps`}>
              Visitor Access
            </p>
            <p className={`${styles.visitorDesc} font-body-md`}>
              Site visits available by appointment only.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
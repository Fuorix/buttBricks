"use client";

import React, { useRef } from "react";
import styles from "./ContactMap.module.css";

export const ContactMap = () => {
  const mapRef = useRef<HTMLIFrameElement | null>(null);

  const resetMap = () => {
    if (mapRef.current) {
      // reload iframe → resets map position
      mapRef.current.src = mapRef.current.src;
    }
  };

  return (
    <section className={styles.mapSection}>
      <div className={styles.container}>
        <div className={styles.mapWrapper}>
          
          {/* MAP */}
          <iframe
            ref={mapRef}
            className={styles.mapFrame}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13596.294551854031!2d74.41738088559545!3d31.57702846773293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919101fe628dc2f%3A0x20b9ee546bfcb741!2sHarbanspura%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1777907178729!5m2!1sen!2s"
            loading="lazy"
          ></iframe>

          <div className={styles.mapOverlay}></div>

          {/* RESET PIN */}
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
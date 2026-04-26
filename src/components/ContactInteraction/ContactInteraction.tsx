import React from 'react';
import styles from './ContactInteraction.module.css';

export const ContactInteraction = () => {
  return (
    <section className={styles.interactionSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Inquiry Form */}
          <div className={styles.formColumn}>
            <h2 className={`${styles.formTitle} font-headline-md`}>Technical Inquiry Form</h2>
            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={`${styles.label} font-label-caps`}>Full Name</label>
                  <input className={`${styles.input} font-body-md`} placeholder="John Doe" type="text" />
                </div>
                <div className={styles.formGroup}>
                  <label className={`${styles.label} font-label-caps`}>Company</label>
                  <input className={`${styles.input} font-body-md`} placeholder="Architectural Firm" type="text" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={`${styles.label} font-label-caps`}>Project Type</label>
                <select className={`${styles.select} font-body-md`}>
                  <option>High-end Residential</option>
                  <option>Commercial Development</option>
                  <option>Industrial Landscape</option>
                  <option>Restoration &amp; Heritage</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={`${styles.label} font-label-caps`}>Message</label>
                <textarea className={`${styles.textarea} font-body-md`} placeholder="Detail your structural requirements..." rows={4}></textarea>
              </div>
              <div className={styles.submitContainer}>
                <button className={`${styles.submitButton} font-label-caps`}>SUBMIT PROJECT BRIEF</button>
              </div>
            </form>
          </div>
          
          {/* Contact Info Stack */}
          <div className={styles.infoColumn}>
            {/* WhatsApp Section */}
            <div className={styles.whatsappCard}>
              <div className={styles.cardHeader}>
                <span className={`material-symbols-outlined ${styles.icon}`} data-icon="forum">forum</span>
                <h3 className={`${styles.cardTitle} font-label-caps`}>Regional Expert Support</h3>
              </div>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div>
                    <p className={`${styles.contactRegion} font-body-md`}>South Asia Region</p>
                    <p className={`${styles.contactNumber} font-headline-md`}>+92 42 3578 9011</p>
                  </div>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`} data-icon="arrow_forward">arrow_forward</span>
                </div>
                <div className={styles.contactItem}>
                  <div>
                    <p className={`${styles.contactRegion} font-body-md`}>Middle East Hub</p>
                    <p className={`${styles.contactNumber} font-headline-md`}>+971 4 234 5678</p>
                  </div>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`} data-icon="arrow_forward">arrow_forward</span>
                </div>
              </div>
            </div>
            
            {/* Office Hours & Email */}
            <div className={styles.hoursCard}>
              <div className={styles.hoursGrid}>
                <div>
                  <h4 className={`${styles.smallTitle} font-label-caps`}>Office Hours</h4>
                  <p className={`${styles.text} font-body-md`}>Mon — Sat</p>
                  <p className={`${styles.text} font-body-md`}>09:00 — 18:00 (PST)</p>
                </div>
                <div>
                  <h4 className={`${styles.smallTitle} font-label-caps`}>Official Email</h4>
                  <p className={`${styles.text} font-body-md`}>consul@buttbricks.pk</p>
                  <p className={`${styles.text} font-body-md`}>support@buttbricks.pk</p>
                </div>
              </div>
            </div>
            
            {/* HQ Location */}
            <div className={styles.hqCard}>
              <div>
                <div className={styles.cardHeader}>
                  <span className={`material-symbols-outlined ${styles.hqIcon}`} data-icon="location_on">location_on</span>
                  <h3 className={`${styles.hqTitle} font-label-caps`}>Global Headquarters</h3>
                </div>
                <p className={`${styles.hqAddress} font-headline-md`}>Plot 14-A, Industrial Estate Phase II, Lahore, Pakistan</p>
              </div>
              <div className={styles.hqFooter}>
                <p className={`${styles.hqDesc} font-body-md`}>Our Lahore HQ serves as our primary manufacturing laboratory and design consultation center.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

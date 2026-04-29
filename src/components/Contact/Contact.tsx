import React from 'react';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        <div className={styles.contentColumn}>
          <span className={`${styles.tagline} font-label-caps`}>Get In Touch</span>
          <h2 className={`${styles.title} font-headline-lg`}>Request a Quote</h2>
          <p className={`${styles.description} font-body-lg`}>
            Our technical team is ready to assist with project specifications and bulk orders.
          </p>
          
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={`material-symbols-outlined ${styles.icon}`}>location_on</span>
              <div>
                <h5 className={`${styles.infoTitle} font-label-caps`}>Corporate Address</h5>
                <p className={styles.infoText}>Harbans Pura, Canal Bank Road, Lahore, Pakistan</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <span className={`material-symbols-outlined ${styles.icon}`}>call</span>
              <div>
                <h5 className={`${styles.infoTitle} font-label-caps`}>WhatsApp & Phone</h5>
                <p className={styles.infoText}>+92 (0) 300 1234567<br/>+92 (0) 321 7654321</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <span className={`material-symbols-outlined ${styles.icon}`}>mail</span>
              <div>
                <h5 className={`${styles.infoTitle} font-label-caps`}>Email Inquiry</h5>
                <p className={styles.infoText}>info@buttbricks.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.formColumn}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label className={`${styles.label} font-label-caps`}>Full Name</label>
              <input className={styles.input} type="text" placeholder="Enter your name" />
            </div>
            
            <div className={styles.formGroup}>
              <label className={`${styles.label} font-label-caps`}>Phone Number</label>
              <input className={styles.input} type="tel" placeholder="+92 XXX XXXXXXX" />
            </div>
            
            <div className={styles.formGroup}>
              <label className={`${styles.label} font-label-caps`}>Message</label>
              <textarea className={styles.textarea} placeholder="Tell us about your project requirements..." rows={4} />
            </div>
            
            <button className={styles.submitButton} type="submit">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
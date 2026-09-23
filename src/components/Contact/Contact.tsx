"use client";

import React, { useState } from "react";
import styles from "./Contact.module.css";
import { sendInquiry } from "@/app/actions/sendEmail";

interface FormFields {
  name: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Full name is required.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  // Accepts +92 or 0 followed by a mobile or landline number
  const phoneRegex = /^(\+92|0)(3\d{2}[\s-]?\d{7}|[0-9]{2,3}[\s-]?[0-9]{7})$/;
  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phoneRegex.test(fields.phone.trim())) {
    errors.phone = "Enter a valid Pakistani number (e.g. +92 3XX XXXXXXX).";
  }

  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fields, setFields] = useState<FormFields>({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const updated = { ...fields, [name]: value };
    setFields(updated);
    if (touched[name as keyof FormFields]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, phone: true, message: true });
    const newErrors = validate(fields);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("loading");
    const formData = new FormData(event.currentTarget);
    const result = await sendInquiry(formData);

    if (result.success) {
      setStatus("success");
      setFields({ name: "", phone: "", message: "" });
      setTouched({});
      setErrors({});
    } else {
      setStatus("error");
    }
  }

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
                <p className={styles.infoText}>
                  Defence Road, Canal Bridge,<br />
                  Harbans Pura, Lahore, Punjab,<br />
                  Pakistan. (54000)
                </p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={`material-symbols-outlined ${styles.icon}`}>call</span>
              <div>
                <h5 className={`${styles.infoTitle} font-label-caps`}>WhatsApp & Phone</h5>
                <p className={styles.infoText}>
                  +92 321 9485444<br />
                  +92 328 1222957<br />
                  +92 321 4001318
                </p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={`material-symbols-outlined ${styles.icon}`}>mail</span>
              <div>
                <h5 className={`${styles.infoTitle} font-label-caps`}>Email Inquiry</h5>
                <p className={styles.infoText}>buttbricks@yahoo.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formColumn}>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Anti-spam honeypot: hidden from people, tempting to bots. */}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="home-company-website">Do not fill this in</label>
              <input id="home-company-website" type="text" name="company_website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="home-name" className={`${styles.label} font-label-caps`}>Full Name</label>
              <input
                id="home-name"
                name="name"
                className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ""}`}
                type="text"
                placeholder="Enter your name"
                value={fields.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <span className={styles.fieldError}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="home-phone" className={`${styles.label} font-label-caps`}>Phone Number</label>
              <input
                id="home-phone"
                name="phone"
                className={`${styles.input} ${errors.phone && touched.phone ? styles.inputError : ""}`}
                type="tel"
                placeholder="+92 3XX XXXXXXX"
                value={fields.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone && (
                <span className={styles.fieldError}>{errors.phone}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="home-message" className={`${styles.label} font-label-caps`}>Message</label>
              <textarea
                id="home-message"
                name="message"
                className={`${styles.textarea} ${errors.message && touched.message ? styles.inputError : ""}`}
                placeholder="Tell us about your project requirements..."
                rows={4}
                value={fields.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.message && touched.message && (
                <span className={styles.fieldError}>{errors.message}</span>
              )}
            </div>

            <button
              className={styles.submitButton}
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Submit Inquiry"}
            </button>

            {status === "success" && <p className={styles.successText}>Inquiry sent successfully!</p>}
            {status === "error" && <p className={styles.serverError}>Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};
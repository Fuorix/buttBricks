"use client";

import React, { useState } from "react";
import styles from "./ContactInteraction.module.css";
import { sendProjectBrief } from "@/app/actions/sendEmail";

interface FormFields {
  name: string;
  company: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  message?: string;
}

const PROJECT_TYPES = [
  "High-end Residential",
  "Commercial Development",
  "Industrial Landscape",
  "Restoration & Heritage",
];

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Full name is required.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  // Company is optional but if provided must be meaningful
  if (fields.company.trim().length > 0 && fields.company.trim().length < 2) {
    errors.company = "Company name must be at least 2 characters.";
  }

  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export const ContactInteraction: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fields, setFields] = useState<FormFields>({
    name: "",
    company: "",
    projectType: PROJECT_TYPES[0],
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const updated = { ...fields, [name]: value };
    setFields(updated);
    if (touched[name as keyof FormFields]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, company: true, projectType: true, message: true });
    const newErrors = validate(fields);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("loading");
    const formData = new FormData(event.currentTarget);
    const result = await sendProjectBrief(formData);

    if (result.success) {
      setStatus("success");
      setFields({ name: "", company: "", projectType: PROJECT_TYPES[0], message: "" });
      setTouched({});
      setErrors({});
    } else {
      setStatus("error");
    }
  }

  return (
    <section className={styles.interactionSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Form */}
          <div className={styles.formColumn}>
            <h2 className={`${styles.formTitle} font-headline-md`}>Technical Inquiry Form</h2>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Anti-spam honeypot: hidden from people, tempting to bots. */}
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="contact-company-website">Do not fill this in</label>
                <input
                  id="contact-company-website"
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={`${styles.label} font-label-caps`}>Full Name *</label>
                  <input
                    name="name"
                    className={`${styles.input} font-body-md ${errors.name && touched.name ? styles.inputError : ""}`}
                    placeholder="John Doe"
                    type="text"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <span className={styles.fieldError}>{errors.name}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={`${styles.label} font-label-caps`}>Company</label>
                  <input
                    name="company"
                    className={`${styles.input} font-body-md ${errors.company && touched.company ? styles.inputError : ""}`}
                    placeholder="Architectural Firm"
                    type="text"
                    value={fields.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.company && touched.company && (
                    <span className={styles.fieldError}>{errors.company}</span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={`${styles.label} font-label-caps`}>Project Type</label>
                <select
                  name="projectType"
                  className={`${styles.select} font-body-md`}
                  value={fields.projectType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={`${styles.label} font-label-caps`}>Message *</label>
                <textarea
                  name="message"
                  className={`${styles.textarea} font-body-md ${errors.message && touched.message ? styles.inputError : ""}`}
                  placeholder="Detail your structural requirements..."
                  rows={4}
                  value={fields.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.message && touched.message && (
                  <span className={styles.fieldError}>{errors.message}</span>
                )}
              </div>

              <div className={styles.submitContainer}>
                <button
                  type="submit"
                  className={`${styles.submitButton} font-label-caps`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "SENDING..." : "SUBMIT PROJECT BRIEF"}
                </button>
              </div>

              {status === "success" && (
                <p className={styles.successText}>Project brief sent successfully!</p>
              )}
              {status === "error" && (
                <p className={styles.serverError}>Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          {/* Right Column: Information Cards */}
          <div className={styles.infoColumn}>
            <div className={styles.whatsappCard}>
              <div className={styles.cardHeader}>
                <span className={`material-symbols-outlined ${styles.icon}`}>forum</span>
                <h3 className={`${styles.cardTitle} font-label-caps`}>Regional Expert Support</h3>
              </div>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div>
                    <p className={`${styles.contactRegion} font-body-md`}>Primary Contact</p>
                    <p className={`${styles.contactNumber} font-headline-md`}>+92 321 9485444</p>
                  </div>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                </div>
                <div className={styles.contactItem}>
                  <div>
                    <p className={`${styles.contactRegion} font-body-md`}>Secondary Contact</p>
                    <p className={`${styles.contactNumber} font-headline-md`}>+92 328 1222957</p>
                  </div>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                </div>
              </div>
            </div>

            <div className={styles.hoursCard}>
              <div className={styles.hoursGrid}>
                <div className={styles.hoursInfo}>
                  <h4 className={`${styles.smallTitle} font-label-caps`}>Office Hours</h4>
                  <p className={`${styles.text} font-body-md`}>Mon — Sat</p>
                  <p className={`${styles.text} font-body-md`}>09:00 — 18:00 (PST)</p>
                </div>
                <div className={styles.emailInfo}>
                  <h4 className={`${styles.smallTitle} font-label-caps`}>Official Email</h4>
                  <div className={styles.emailList}>
                    <p className={`${styles.text} font-body-md`}>buttbricks@yahoo.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.hqCard}>
              <div>
                <div className={styles.cardHeader}>
                  <span className={`material-symbols-outlined ${styles.hqIcon}`}>location_on</span>
                  <h3 className={`${styles.hqTitle} font-label-caps`}>Global Headquarters</h3>
                </div>
                <p className={`${styles.hqAddress} font-headline-md`}>
                  Defence Road, Canal Bridge, Harbans Pura, Lahore, Punjab, Pakistan. (54000)
                </p>
              </div>
              <div className={styles.hqFooter}>
                <p className={`${styles.hqDesc} font-body-md`}>
                  Our Lahore HQ serves as our primary manufacturing laboratory and design consultation center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
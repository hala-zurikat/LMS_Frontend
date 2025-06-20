// src/pages/Contact/index.jsx
import React from "react";
import styles from "./ContactPage.module.css";

function ContactPage() {
  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.heading}>Contact Us</h2>
      <p className={styles.subheading}>We'd love to hear from you!</p>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your name" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your email" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Your message..."
            rows="5"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactPage;

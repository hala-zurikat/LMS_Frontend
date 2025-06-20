// src/components/common/TestimonialCard.jsx
import React from "react";
import styles from "./TestimonialCard.module.css";

export default function TestimonialCard({ name, rating, feedback, avatar }) {
  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= count ? styles.starFilled : styles.starEmpty}
          aria-hidden="true"
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      {avatar && (
        <img src={avatar} alt={`${name}'s avatar`} className={styles.avatar} />
      )}
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.rating}>{renderStars(rating)}</div>
      <p className={styles.feedback}>"{feedback}"</p>
    </div>
  );
}

// src/features/courses/components/CourseCard.jsx
import React from "react";
import styles from "./CourseCard.module.css";

export default function CourseCard({ course, onEnroll }) {
  console.log("Course thumbnail:", course.thumbnail_url);

  return (
    <div className={styles.card}>
      <img
        src={course.thumbnail_url}
        alt={course.title}
        className={styles.image}
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>
          {course.description?.slice(0, 100)}...
        </p>
        <button
          className={styles.enrollBtn}
          onClick={() => onEnroll(course.id)}
        >
          Enroll
        </button>
      </div>
    </div>
  );
}

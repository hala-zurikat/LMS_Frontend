// src/features/student/components/CourseCard.jsx
import React from "react";
import styles from "./DashboardPage.module.css";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  const {
    title,
    description,
    progress,
    course_id,
    thumbnail_url,
    instructor_name,
  } = course;

  return (
    <div className={styles.card}>
      {thumbnail_url && (
        <img src={thumbnail_url} alt={title} className={styles.image} />
      )}
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.instructor}>
        Instructor: {instructor_name || "Unknown"}
      </p>
      <p className={styles.description}>{description?.slice(0, 80)}...</p>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress || 0}%` }}
        ></div>
      </div>
      <p className={styles.progressText}>{progress || 0}% completed</p>

      <Link to={`/student/courses/${course_id}`} className={styles.link}>
        Go to Course
      </Link>
    </div>
  );
}

export default CourseCard;

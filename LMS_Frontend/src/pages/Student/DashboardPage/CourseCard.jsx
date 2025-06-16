import React from "react";
import styles from "./DashboardPage.module.css";
import { Link } from "react-router-dom";
function CourseCard({ course }) {
  const { title, description, progress, course_id } = course;

  return (
    <div className={styles.card}>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress || 0}%` }}
        ></div>
      </div>
      <p>{progress || 0}% completed</p>
      <Link to={`/student/courses/${course_id}`} className={styles.link}>
        Go to Course
      </Link>
    </div>
  );
}

export default CourseCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../DashboardPage/DashboardPage.module.css";

function CourseCard({ course }) {
  const navigate = useNavigate();

  if (!course) return null;

  const handleClick = () => {
    navigate(`/student/courses/${course.course_id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src={course.thumbnail_url}
        alt={course.title}
        className={styles.image}
      />
      <h4 className={styles.title}>{course.title}</h4>
      <p className={styles.instructor}>Instructor: {course.instructor_name}</p>
      <p className={styles.description}>{course.description}</p>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${course.progress || 0}%` }}
        />
      </div>
    </div>
  );
}

export default CourseCard;

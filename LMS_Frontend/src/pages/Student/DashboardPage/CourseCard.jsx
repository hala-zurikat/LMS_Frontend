import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../DashboardPage/DashboardPage.module.css";
import { unenrollFromCourse } from "../../../services/courseService"; // استيراد دالة unEnroll

function CourseCard({ course, onUnenrollSuccess }) {
  const navigate = useNavigate();

  if (!course) return null;

  const handleClick = () => {
    navigate(`/student/courses/${course.id || course.course_id}`);
  };

  const handleUnenroll = async (e) => {
    e.stopPropagation(); // لمنع فتح تفاصيل الكورس عند الضغط على زر Unenroll
    if (
      window.confirm(
        `Are you sure you want to unenroll from "${course.title}"?`
      )
    ) {
      try {
        await unenrollFromCourse(course.id || course.course_id);
        alert("You have successfully unenrolled from the course.");
        if (onUnenrollSuccess) onUnenrollSuccess(course.id || course.course_id);
      } catch (error) {
        alert("Failed to unenroll. Please try again later.");
        console.error(error);
      }
    }
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
      <button
        type="button"
        className={styles.unenrollButton}
        onClick={handleUnenroll}
      >
        Unenroll
      </button>
    </div>
  );
}

export default CourseCard;

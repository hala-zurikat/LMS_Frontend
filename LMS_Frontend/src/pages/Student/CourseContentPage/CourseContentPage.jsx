import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCourseContent } from "../../../services/courseService";
import styles from "./CourseContentPage.module.css";

function CourseContentPage() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    async function fetchCourseContent() {
      try {
        const data = await getCourseContent(courseId);
        setCourseData(data);
      } catch (error) {
        console.error("Failed to load course:", error);
      }
    }
    fetchCourseContent();
  }, [courseId]);

  if (!courseData) return <p className={styles.loading}>Loading course...</p>;

  return (
    <div className={styles.courseContainer}>
      <Link to="/student/dashboard" className={styles.backButton}>
        ← Back to Dashboard
      </Link>
      <h2 className={styles.courseTitle}>{courseData.title}</h2>
      <p className={styles.courseDescription}>{courseData.description}</p>

      {courseData.modules.map((module) => (
        <div key={module.id} className={styles.moduleBox}>
          <div className={styles.moduleHeader}>
            <h2>{module.title}</h2>
            <span className={styles.arrow}>▼</span>
          </div>
          <p style={{ padding: "0 20px", color: "#666" }}>
            {module.description}
          </p>

          <ul className={styles.lessonsList}>
            {module.lessons.length > 0 ? (
              module.lessons.map((lesson) => (
                <li key={lesson.id} className={styles.lessonItem}>
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className={styles.lessonLink}
                  >
                    <div className={styles.lessonCard}>
                      <h4>{lesson.title}</h4>
                      <span className={styles.typeTag}>
                        {lesson.content_type}
                      </span>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className={styles.noLessons}>No lessons in this module.</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CourseContentPage;

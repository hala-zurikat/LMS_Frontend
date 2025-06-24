import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseContent } from "../../../services/courseService";
import styles from "./CourseContentPage.module.css";

function CourseContentPage() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourseContent() {
      try {
        const data = await getCourseContent(courseId);
        console.log("Course data from API:", data);
        setCourseData(data);
      } catch (error) {
        console.error("Failed to load course:", error);
        setError("Failed to load course content.");
      }
    }
    fetchCourseContent();
  }, [courseId]);

  if (error) return <p className={styles.error}>{error}</p>;

  if (!courseData) return <p className={styles.loading}>Loading course...</p>;

  // تأكد modules موجودة وهي مصفوفة
  const modules = Array.isArray(courseData.modules) ? courseData.modules : [];

  return (
    <div className={styles.courseContainer}>
      <Link to="/student/dashboard" className={styles.backButton}>
        ← Back to Dashboard
      </Link>
      <h2 className={styles.courseTitle}>{courseData.title}</h2>
      <p className={styles.courseDescription}>{courseData.description}</p>

      {modules.length === 0 ? (
        <p>No modules available for this course.</p>
      ) : (
        modules.map((module) => (
          <div key={module.id} className={styles.moduleBox}>
            <div className={styles.moduleHeader}>
              <h2>{module.title}</h2>
              <span className={styles.arrow}>▼</span>
            </div>
            <p style={{ padding: "0 20px", color: "#666" }}>
              {module.description}
            </p>

            <ul className={styles.lessonsList}>
              {Array.isArray(module.lessons) && module.lessons.length > 0 ? (
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
        ))
      )}
    </div>
  );
}

export default CourseContentPage;

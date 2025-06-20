import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseContent } from "../../../services/courseService";
import styles from "./CourseContentPage.module.css";

function CourseContentPage() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModules, setOpenModules] = useState({});

  useEffect(() => {
    async function fetchCourse() {
      try {
        const data = await getCourseContent(courseId);
        setCourseData(data);
      } catch (err) {
        setError("Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  const toggleModule = (id) => {
    setOpenModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.courseContainer}>
      <h1 className={styles.courseTitle}>{courseData.title}</h1>
      <p className={styles.courseDescription}>{courseData.description}</p>

      {courseData.modules.map((module) => (
        <div key={module.id} className={styles.moduleBox}>
          <div
            className={styles.moduleHeader}
            onClick={() => toggleModule(module.id)}
            tabIndex={0}
            role="button"
            onKeyPress={(e) => {
              if (e.key === "Enter") toggleModule(module.id);
            }}
          >
            <h2>{module.title}</h2>
            <span
              className={`${styles.arrow} ${
                openModules[module.id] ? styles.open : ""
              }`}
            >
              &#9662;
            </span>
          </div>

          {openModules[module.id] && (
            <ul className={styles.lessonsList}>
              {module.lessons.length === 0 && (
                <li className={styles.noLessons}>No lessons available</li>
              )}
              {module.lessons.map((lesson) => (
                <li key={lesson.id} className={styles.lessonItem}>
                  <strong>{lesson.title}</strong> —{" "}
                  <em>{lesson.content_type}</em>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseContentPage;

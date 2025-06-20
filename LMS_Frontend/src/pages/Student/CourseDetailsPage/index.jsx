// src/pages/Student/CourseDetailsPage/index.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseDetails } from "../../../services/courseService";
import styles from "./CourseDetailsPage.module.css";

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const data = await getCourseDetails(courseId);
        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className={styles.container}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <img
        src={course.thumbnail_url}
        alt={course.title}
        className={styles.thumbnail}
      />

      <h3>Modules</h3>
      {course.modules.map((module) => (
        <div key={module.id} className={styles.module}>
          <h4>{module.title}</h4>
          <p>{module.description}</p>
          <ul>
            {module.lessons.map((lesson) => (
              <li key={lesson.id}>
                {lesson.title} ({lesson.content_type})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../../services/instructorService";
import styles from "./ViewCourse.module.css";

export default function ViewCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourseById(id);
      if (data) setCourse(data);
    }
    fetchCourse();
  }, [id]);

  if (!course) return <p className={styles.loading}>Loading course...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{course.title}</h2>
      <div className={styles.info}>
        <p>
          <strong>Description:</strong> {course.description}
        </p>
        <p>
          <strong>Instructor:</strong> {course.instructor_name}
        </p>
        <p>
          <strong>Created at:</strong>{" "}
          {new Date(course.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

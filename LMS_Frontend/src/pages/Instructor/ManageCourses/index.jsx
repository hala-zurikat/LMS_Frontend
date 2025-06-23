// src/pages/Instructor/ManageCourses/index.jsx
import React, { useEffect, useState } from "react";
import {
  getInstructorCourses,
  deleteCourse,
} from "../../../services/instructorService";

import styles from "./ManageCourses.module.css";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const data = await getInstructorCourses();
      setCourses(data);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const success = await deleteCourse(id);
      if (success) {
        setCourses(courses.filter((course) => course.id !== id));
        alert("Course deleted successfully");
      } else {
        alert("Failed to delete course");
      }
    }
  }

  if (loading) return <p className={styles.loadingText}>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Courses</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.price} $</td>
              <td>
                <button
                  className={`${styles.button} ${styles.editBtn}`}
                  onClick={() =>
                    (window.location.href = `/instructor/courses/edit/${course.id}`)
                  }
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className={`${styles.button} ${styles.deleteBtn}`}
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

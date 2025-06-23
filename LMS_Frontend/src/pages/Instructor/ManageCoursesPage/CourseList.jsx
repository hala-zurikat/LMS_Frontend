import React, { useEffect, useState } from "react";
import {
  getInstructorCourses,
  deleteCourse,
} from "../../../services/instructorService";
import { useNavigate } from "react-router-dom";
import styles from "./ManageCoursesPage.module.css";

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      const data = await getInstructorCourses();
      setCourses(data);
    }
    fetchCourses();
  }, []);

  const handleEdit = (courseId) => {
    navigate(`/instructor/courses/edit/${courseId}`);
  };

  const handleView = (courseId) => {
    navigate(`/instructor/courses/view/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCourse(courseId);
      setCourses((prev) => prev.filter((course) => course.id !== courseId));
    } catch (err) {
      console.error("❌ Failed to delete course", err.message);
      alert("Failed to delete course. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Your Courses</h2>
      <button
        className={styles.addBtn}
        onClick={() => navigate("/instructor/add-course")}
      >
        + Add New Course
      </button>

      <div className={styles.courseList}>
        {courses.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <img
              src={course.thumbnail_url || "/default-thumbnail.jpg"}
              alt={course.title}
              className={styles.image}
            />
            <div className={styles.content}>
              <h3 className={styles.title}>{course.title}</h3>
              <p className={styles.instructor}>By {course.instructor_name}</p>
              <p className={styles.description}>{course.description}</p>
              <div className={styles.actions}>
                <button onClick={() => handleView(course.id)}>View</button>
                <button onClick={() => handleEdit(course.id)}>Edit</button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    navigate(`/instructor/courses/${course.id}/modules`)
                  }
                >
                  Manage Modules
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

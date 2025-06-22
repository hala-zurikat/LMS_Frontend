import React, { useState, useEffect } from "react";
import {
  getAllAdminCourses,
  getAdminCourseContent,
  approveAdminCourse,
} from "../../../services/courseService";

import styles from "./ManageCoursesPage.module.css";

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllAdminCourses()
      .then((data) => setCourses(data))
      .catch((err) => alert("Error loading courses: " + err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
    setLoading(true);
    getAdminCourseContent(courseId)
      .then((data) => setModules(data.modules))
      .catch((err) => alert("Error loading course content: " + err.message))
      .finally(() => setLoading(false));
  };

  const handleApprove = (courseId, approve) => {
    approveAdminCourse(courseId, approve)
      .then(() => {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === courseId ? { ...c, is_approved: approve } : c
          )
        );
        alert(`Course ${approve ? "approved" : "rejected"} successfully`);
      })
      .catch((err) => alert("Error updating approval: " + err.message));
  };

  return (
    <div className={styles.container}>
      <div className={styles.coursesList}>
        <h2>Courses</h2>
        {loading && <p>Loading...</p>}
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {courses.map((course) => (
            <li key={course.id} className={styles.courseItem}>
              <p className={styles.courseTitle}>{course.title}</p>
              <p className={styles.courseInfo}>
                <strong>Instructor:</strong> {course.instructor_name}
              </p>
              <p className={styles.courseInfo}>
                <strong>Category:</strong> {course.category_name || "N/A"}
              </p>
              <p className={styles.courseInfo}>
                <strong>Published:</strong> {course.is_published ? "Yes" : "No"}
              </p>
              <p className={styles.courseInfo}>
                <strong>Approved:</strong> {course.is_approved ? "Yes" : "No"}
              </p>
              <div className={styles.buttons}>
                <button
                  onClick={() => handleSelectCourse(course.id)}
                  className={`${styles.button} ${styles.viewBtn}`}
                >
                  View Content
                </button>
                {course.is_published && (
                  <>
                    <button
                      onClick={() => handleApprove(course.id, true)}
                      disabled={course.is_approved}
                      className={`${styles.button} ${styles.approveBtn}`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApprove(course.id, false)}
                      disabled={!course.is_approved}
                      className={`${styles.button} ${styles.rejectBtn}`}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.courseContent}>
        <h2>Course Content</h2>
        {!selectedCourse && <p>Select a course to see its content</p>}
        {modules.map((module) => (
          <div key={module.id} className={styles.moduleItem}>
            <h3 className={styles.moduleTitle}>{module.title}</h3>
            <p>{module.description}</p>
            <ul className={styles.lessonList}>
              {module.lessons.map((lesson) => (
                <li key={lesson.id} className={styles.lessonItem}>
                  {lesson.title} ({lesson.content_type}) - {lesson.duration} min
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

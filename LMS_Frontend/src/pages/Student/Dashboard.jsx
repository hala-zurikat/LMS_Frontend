// src/pages/Student/Dashboard.jsx

import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { getStudentDashboardData } from "../../services/studentService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudentDashboardData();
        setUser(data.user);
        setCourses(data.courses);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.dashboard}>
      {user && (
        <div className={styles.welcomeBox}>
          <h2>
            Welcome, <span className={styles.username}>{user.name}</span> 👋
          </h2>
          <p>
            Email: <strong>{user.email}</strong>
          </p>
        </div>
      )}

      <div className={styles.stats}>
        <p>
          <strong>Total Courses:</strong> {courses.length}
        </p>
        <p>
          <strong>Average Progress:</strong> {calculateAverageProgress(courses)}
          %
        </p>
      </div>

      <h3 className={styles.courseHeader}>Your Courses:</h3>
      <ul className={styles.courseList}>
        {courses.map((course) => (
          <li key={course.id} className={styles.courseCard}>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p>
              <strong>Progress:</strong> {course.progress}%
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function calculateAverageProgress(courses) {
  if (!courses.length) return 0;
  const total = courses.reduce((sum, c) => sum + c.progress, 0);
  return Math.round(total / courses.length);
}

export default Dashboard;

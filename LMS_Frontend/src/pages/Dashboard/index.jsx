import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

function Dashboard() {
  // بيانات وهمية (fake data) مؤقتة — لاحقاً تجيبها من الباك
  const [user, setUser] = useState({ name: "Hala", role: "student" });
  const [stats, setStats] = useState({
    coursesEnrolled: 5,
    coursesTeaching: 2,
    assignmentsPending: 3,
    progressPercent: 70,
  });
  const [courses, setCourses] = useState([
    { id: 1, title: "React Basics", progress: 85, isPublished: true },
    { id: 2, title: "Node.js Advanced", progress: 45, isPublished: true },
  ]);

  // لاحقاً: استدعاء API هنا لجلب البيانات الحقيقية

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome back, {user.name}!</h1>
        <button className={styles.logoutBtn}>Logout</button>
      </header>

      <section className={styles.stats}>
        <div className={styles.card}>
          <h3>Courses Enrolled</h3>
          <p>{stats.coursesEnrolled}</p>
        </div>
        {user.role === "instructor" && (
          <div className={styles.card}>
            <h3>Courses Teaching</h3>
            <p>{stats.coursesTeaching}</p>
          </div>
        )}
        <div className={styles.card}>
          <h3>Assignments Pending</h3>
          <p>{stats.assignmentsPending}</p>
        </div>
        <div className={styles.card}>
          <h3>Progress</h3>
          <p>{stats.progressPercent}%</p>
        </div>
      </section>

      <section className={styles.courses}>
        <h2 className={styles.sectionTitle}>Your Courses</h2>
        <ul className={styles.courseList}>
          {courses.map((course) => (
            <li key={course.id} className={styles.courseItem}>
              <h4>{course.title}</h4>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              {user.role === "instructor" && (
                <p>
                  Status:{" "}
                  {course.isPublished ? (
                    <span className={styles.published}>Published</span>
                  ) : (
                    <span className={styles.unpublished}>Unpublished</span>
                  )}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;

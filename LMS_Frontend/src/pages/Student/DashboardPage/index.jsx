import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import CourseCard from "./CourseCard";
import { getMyEnrollments } from "../../../services/courseService";
import useAuth from "../../../hooks/useAuth";

function DashboardPage() {
  const { user } = useAuth(); // من useAuth.js
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyEnrollments(); // من courseService.js
        setCourses(data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h2>Welcome back, {user?.name} 👋</h2>
      <h3>Your Enrolled Courses</h3>
      <div className={styles.coursesGrid}>
        {courses.length === 0 ? (
          <p>You are not enrolled in any courses yet.</p>
        ) : (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardPage;

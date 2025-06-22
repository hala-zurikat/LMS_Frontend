import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import CourseCard from "./CourseCard";
import { getMyEnrollments } from "../../../services/courseService";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../../components/common/LogoutButton/LogoutButton";

function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyEnrollments();
        console.log("Enrolled Courses:", data);
        setCourses(data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    }
    fetchData();
  }, []);

  const avatarUrl = user?.avatar
    ? `/${user.avatar}`
    : "/avatar/default-avatar.jpg";

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerSection}>
        <img src={avatarUrl} alt="Profile" className={styles.avatar} />
        <h2>Welcome back, {user?.name} 👋</h2>
      </div>

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

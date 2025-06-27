import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import CourseCard from "./CourseCard";
import {
  getMyEnrollments,
  unenrollFromCourse,
} from "../../../services/courseService";
import useAuth from "../../../hooks/useAuth";

import LogoutButton from "../../../components/common/LogoutButton/LogoutButton";

function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  const fetchEnrollments = async () => {
    try {
      const data = await getMyEnrollments();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleUnenrollSuccess = (courseId) => {
    setCourses((prev) =>
      prev.filter((c) => c.id !== courseId && c.course_id !== courseId)
    );
  };

  const avatarUrl = user?.avatar
    ? `/${user.avatar}`
    : "/avatar/default-avatar.jpg";

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerSection}>
        <div className={styles.headerLeft}>
          <img src={avatarUrl} alt="Profile" className={styles.avatar} />
          <h2>Welcome back, {user?.name} 👋</h2>
        </div>

        <LogoutButton />
      </div>

      <h3>Your Enrolled Courses</h3>
      <div className={styles.coursesGrid}>
        {courses.length === 0 ? (
          <p>You are not enrolled in any courses yet.</p>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.id || course.course_id}
              course={course}
              onUnenrollSuccess={handleUnenrollSuccess}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardPage;

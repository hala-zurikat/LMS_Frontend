// src/pages/Instructor/InstructorDashboardPage/components/InstructorOverview.jsx
import React, { useEffect, useState } from "react";
import { getInstructorStats } from "../../../../services/instructorService";
import Chart from "../../../../components/common/Chart";
import styles from "./InstructorOverview.module.css";
import LogoutButton from "../../../../components/common/LogoutButton/LogoutButton.jsx";

export default function InstructorOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const data = await getInstructorStats();
      setStats(data);
    }
    fetchStats();
  }, []);

  if (!stats) return <p>Loading instructor statistics...</p>;

  const chartData = (stats.coursesProgress || []).map((course) => ({
    name: course.name,
    enrolled: course.progress,
  }));

  return (
    <div className={styles.container}>
      {/* ✅ زر تسجيل الخروج في الأعلى */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Instructor Overview</h2>
        <LogoutButton />
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <h3>Total Courses</h3>
          <p>{stats.totalCourses}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Enrollments</h3>
          <p>{stats.totalEnrollments}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Assignments</h3>
          <p>{stats.totalAssignments}</p>
        </div>
      </div>

      <Chart
        data={chartData}
        dataKey="enrolled"
        title="Students Enrolled per Course"
        barColor="#007acc"
      />
    </div>
  );
}

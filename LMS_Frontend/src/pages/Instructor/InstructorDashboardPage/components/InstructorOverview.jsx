// src/pages/Instructor/InstructorDashboardPage/components/InstructorOverview.jsx
import React, { useEffect, useState } from "react";
import { getInstructorStats } from "../../../../services/instructorService";
import Chart from "../../../../components/common/Chart";
import styles from "./InstructorOverview.module.css";

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

  // البيانات الخاصة بالمخطط مبنية على coursesProgress
  const chartData = (stats.coursesProgress || []).map((course) => ({
    name: course.name,
    enrolled: course.progress,
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Instructor Overview</h2>

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

      {/* المخطط البياني الذي يعرض عدد الطلاب المسجلين لكل كورس */}
      <Chart
        data={chartData}
        dataKey="enrolled"
        title="Students Enrolled per Course"
        barColor="#007acc"
      />
    </div>
  );
}

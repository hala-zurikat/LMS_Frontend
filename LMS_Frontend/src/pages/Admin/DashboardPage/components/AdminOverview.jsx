import React, { useEffect, useState } from "react";
import { getAdminStats } from "../../../../services/adminService";
import Chart from "../../../../components/common/Chart";
import LogoutButton from "../../../../components/common/LogoutButton/LogoutButton";
import styles from "./AdminOverview.module.css";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const data = await getAdminStats();
      setStats(data);
    }
    fetchStats();
  }, []);

  if (!stats) return <p>Loading admin statistics...</p>;

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Courses", value: stats.totalCourses },
    { name: "Assignments", value: stats.totalAssignments },
    { name: "Enrollments", value: stats.totalEnrollments },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Platform Statistics</h2>
        <LogoutButton />
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Courses</h3>
          <p>{stats.totalCourses}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Assignments</h3>
          <p>{stats.totalAssignments}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Enrollments</h3>
          <p>{stats.totalEnrollments}</p>
        </div>
      </div>

      <Chart
        data={chartData}
        dataKey="value"
        title="Platform Overview"
        barColor="#4e79a7"
      />
    </div>
  );
}

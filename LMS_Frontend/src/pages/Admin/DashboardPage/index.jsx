import React from "react";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import AdminOverview from "./components/AdminOverview";

export default function AdminDashboardPage() {
  return (
    <div>
      {/* <Sidebar role="admin" />
      <main style={{ marginLeft: "180px", padding: "2rem", flex: 1 }}>
        <h1 style={{ fontSize: "24px", marginBottom: "1rem" }}>
          Admin Dashboard
        </h1>  </main>*/}
      <h1>Admin Dashboard</h1>

      <AdminOverview />
    </div>
  );
}

// src/components/ProtectedRoutes/InstructorRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function InstructorRoute({ children }) {
  // استرجع المستخدم (مثلاً من localStorage أو context)
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // مش مسجل دخول
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "instructor") {
    // ليس instructor، يمنع الدخول
    return <Navigate to="/" replace />;
  }

  return children;
}

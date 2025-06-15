// src/services/studentService.js

import api from "./api"; // axios أو fetch جاهز؟

export async function getStudentDashboardData() {
  const res = await api.get("/student/dashboard");
  return res.data;
}

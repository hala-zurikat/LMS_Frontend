// src/services/instructorService.js
import api from "./api";

export async function getInstructorStats() {
  try {
    const response = await api.get("/instructor/stats");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch instructor statistics", error);
    return null;
  }
}

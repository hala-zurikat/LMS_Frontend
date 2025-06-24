import api from "./api";
import axios from "axios";
export async function getInstructorStats() {
  try {
    const response = await api.get("/instructor/stats");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch instructor statistics", error);
    return null;
  }
}

export async function getInstructorCourses() {
  try {
    const response = await api.get("/instructor/courses");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch instructor courses", error);
    return [];
  }
}
export async function getCourseById(id) {
  const res = await axios.get(`/api/courses/${id}`);
  return res.data;
}

export async function updateCourse(id, data) {
  try {
    const response = await api.put(`/instructor/courses/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update course", error);
    return null;
  }
}

export async function deleteCourse(id) {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error("Failed to delete course", error);
    return false;
  }
}

export async function getCategories() {
  try {
    const res = await api.get("/categories");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return [];
  }
}

export async function createCourse(data) {
  try {
    const res = await api.post("/instructor/courses", data);
    return res.status === 201;
  } catch (error) {
    console.error("Failed to create course", error);
    return false;
  }
}

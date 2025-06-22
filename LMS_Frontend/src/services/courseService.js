import api from "./api";
import axios from "axios";

// Get all available courses
export async function getAllCourses() {
  const response = await api.get("/courses");
  return response.data;
}

// Get the courses the current user is enrolled in
export async function getMyEnrollments() {
  const res = await api.get("/enrollments/me");
  return res.data;
}

// Enroll in a specific course
export async function enrollInCourse(courseId) {
  const res = await api.post("/enrollments", {
    course_id: courseId,
  });
  return res.data;
}

// Get lesson by ID
export async function getLessonById(lessonId) {
  const response = await api.get(`/lessons/${lessonId}`);
  return response.data;
}

export async function getCourseContent(courseId) {
  const response = await api.get(`/courses/${courseId}/details`);
  return response.data;
}
export async function getAllAdminCourses() {
  const response = await api.get("/admin/courses");
  return response.data;
}

export async function getAdminCourseContent(courseId) {
  const response = await api.get(`/admin/courses/${courseId}/content`);
  return response.data;
}

export async function approveAdminCourse(courseId, approve) {
  const response = await api.patch(`/admin/courses/${courseId}/approve`, {
    approve,
  });
  return response.data;
}

import api from "./api";
import axios from "axios";

// Get all available courses
async function getAllCourses() {
  const response = await api.get("/courses");
  return response.data;
}

// Get the courses the current user is enrolled in
async function getMyEnrollments() {
  const res = await api.get("/enrollments/me");
  return res.data;
}

// Enroll in a specific course
async function enrollInCourse(courseId) {
  const res = await api.post("/enrollments", {
    course_id: courseId,
  });
  return res.data;
}

// Get lesson by ID
async function getLessonById(lessonId) {
  const response = await api.get(`/lessons/${lessonId}`);
  return response.data;
}

// Get course by ID
async function getCourseById(courseId) {
  const res = await api.get(`/courses/${courseId}`);
  return res.data;
}

async function getCourseContent(courseId) {
  const response = await api.get(`/courses/${courseId}/details`);
  return response.data;
}

async function getAllAdminCourses() {
  const response = await api.get("/admin/courses");
  return response.data;
}

async function getAdminCourseContent(courseId) {
  const response = await api.get(`/admin/courses/${courseId}/content`);
  return response.data;
}

async function approveAdminCourse(courseId, approve) {
  const response = await api.patch(`/admin/courses/${courseId}/approve`, {
    approve,
  });
  return response.data;
}

async function searchCourses(query) {
  const res = await api.get(
    `/courses/search?query=${encodeURIComponent(query)}`
  );
  return res.data;
}
export async function unenrollFromCourse(courseId) {
  const res = await api.delete(`/enrollments/${courseId}`);
  return res.data;
}
export async function getModulesByCourseId(courseId) {
  const res = await api.get(`/courses/${courseId}/modules`);
  return res.data;
}

// جلب Lessons حسب moduleId
export async function getLessonsByModuleId(moduleId) {
  const res = await api.get(`/modules/${moduleId}/lessons`);
  return res.data;
}
// دوال أخرى...

export {
  getAllCourses,
  getMyEnrollments,
  getCourseById,
  enrollInCourse,
  getLessonById,
  getCourseContent,
  getAllAdminCourses,
  getAdminCourseContent,
  approveAdminCourse,
  searchCourses,
};

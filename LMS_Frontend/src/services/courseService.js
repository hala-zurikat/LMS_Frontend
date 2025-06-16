import api from "./api";

export async function getMyEnrollments() {
  const res = await api.get("/enrollments/me"); // أو endpoint الخاص فيك
  return res.data;
}

export async function getAllCourses() {
  const response = await api.get("/courses"); // رابط الـ API حسب باك اندك
  return response.data;
}
export async function enrollInCourse(courseId) {
  const res = await api.post("/enrollments", {
    course_id: courseId,
  });
  return res.data;
}

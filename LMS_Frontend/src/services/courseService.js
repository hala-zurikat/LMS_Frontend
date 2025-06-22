import api from "./api";
import axios from "axios";

// Get all available courses (لصفحة الاستعراض)
export async function getAllCourses() {
  const response = await api.get("/courses");
  return response.data;
}

// Get the courses the current user is enrolled in (للطالب)
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
// export async function markLessonComplete({
//   courseId,
//   completedLessonsCount,
//   totalLessons,
// })
//   const res = await api.patch("/enrollments/progress", {
//     course_id: courseId,
//     completedLessonsCount,
//     totalLessons,
//   });
//   return res.data;
// }
// export async function getCourseDetails(courseId) {
//   const response = await axios.get(`/api/courses/${courseId}/details`);
//   return response.data;
// }

import api from "./api";
// export async function getLessonContent(lessonId) {
//   try {
//     const response = await api.get(`/lessons/${lessonId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch lesson content", error);
//     throw error;
//   }
// }
export async function getLessonContent(lessonId) {
  const res = await fetch(`/api/lessons/${lessonId}`);
  if (!res.ok) throw new Error("Failed to fetch lesson content");
  return await res.json();
}

export async function getLessonsByModule(moduleId) {
  const res = await api.get(`/lessons/module/${moduleId}`);
  return res.data;
}

export async function deleteLesson(lessonId) {
  const res = await api.delete(`/lessons/${lessonId}`);
  return res.data;
}

// دوال إضافية إذا تحتاجها
export async function getLessonById(lessonId) {
  const res = await api.get(`/lessons/${lessonId}`);
  return res.data;
}

export async function createLesson(data) {
  const res = await api.post("/lessons", data);
  return res.data;
}

export async function updateLesson(id, data) {
  const res = await api.put(`/lessons/${id}`, data);
  return res.data;
}
// lessonService.js
export async function getQuizzesByLessonId(lessonId) {
  const res = await fetch(`/api/quizzes/lesson/${lessonId}`);
  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return await res.json(); // array of quizzes
}

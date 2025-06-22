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

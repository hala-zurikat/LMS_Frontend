import api from "./api";

export async function getModulesByCourse(courseId) {
  const res = await api.get(`/modules/course/${courseId}`);
  return res.data;
}

export async function createModule(data) {
  const res = await api.post("/modules", data);
  return res.data;
}

export async function deleteModule(id) {
  const res = await api.delete(`/modules/${id}`);
  return res.data;
}
export async function getLessonsByModule(moduleId) {
  const res = await api.get(`/lessons/module/${moduleId}`);
  return res.data;
}

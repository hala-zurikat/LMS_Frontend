import api from "./api";

export async function createAssignment(data) {
  const res = await api.post("/assignments", data);
  return res.data;
}

export async function getAssignmentsByLessonId(lessonId) {
  const res = await api.get(`/assignments/lesson/${lessonId}`);
  return res.data;
}
export async function getAssignmentById(id) {
  const res = await api.get(`/assignments/${id}`);
  return res.data;
}
export async function getAssignmentsByUserId(userId) {
  const res = await api.get(`/assignments/user/${userId}`);
  return res.data;
}

export async function updateAssignment(id, data) {
  const res = await api.put(`/assignments/${id}`, data);
  return res.data;
}
export async function getAssignmentsByInstructor(instructorId) {
  const res = await api.get(`/assignments/instructor/${instructorId}`);
  return res.data;
}

export async function deleteAssignment(id) {
  const res = await api.delete(`/assignments/${id}`);
  return res.data;
}

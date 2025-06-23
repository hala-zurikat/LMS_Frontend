import api from "./api";

export async function getAllQuizzesGrouped() {
  const res = await api.get("/quizzes/grouped");
  return res.data;
}
export async function deleteQuiz(id) {
  const res = await fetch(`/api/quizzes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to delete quiz");
  }
  return await res.json();
}

import api from "./api";

export async function submitAssignment(data) {
  const response = await api.post("/submissions", data);
  return response.data;
}
export async function getSubmissionsByUserId(userId) {
  const res = await api.get(`/submissions/user/${userId}`);
  return res.data;
}

export async function updateSubmissionStatus(submissionId, statusData) {
  const res = await api.put(`/submissions/${submissionId}/status`, statusData);
  return res.data;
}

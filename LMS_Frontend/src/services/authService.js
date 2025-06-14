import api from "./api";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (formData) => {
  const response = await axios.post("/api/auth/register", formData);
  return response.data;
};

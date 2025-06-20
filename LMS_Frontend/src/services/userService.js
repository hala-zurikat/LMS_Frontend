import api from "./api";

export const getAllUsers = () => {
  return api.get("/users");
};

export const updateUserRole = (userId, data) => {
  return api.put(`/users/${userId}`, data);
};

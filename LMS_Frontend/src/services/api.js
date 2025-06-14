import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // رابط الباك
  withCredentials: true, // إذا كنتِ بتستخدمي cookies
});

export default api;

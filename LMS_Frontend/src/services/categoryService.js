import api from "./api";

export async function getCategories() {
  const res = await api.get("/categories"); // endpoint عندك في الباك اند
  return res.data;
}

import api from "./api";

export async function getAdminStats() {
  try {
    const response = await api.get("/admin/stats");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch admin statistics", error);
    return null;
  }
}

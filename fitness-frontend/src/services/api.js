import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (userId) {
    config.headers["X-User-ID"] = userId;
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export const getActivities = async () => {
  const response = await api.get("/activities");
  return response.data;
};

export const addActivity = async (activity) => {
  const response = await api.post("/activities", activity);
  return response.data;
};

export const getActivityDetails = async (id) => {
  const response = await api.get(`/recommendations/activity/${id}`);
  return response.data;
};

export default api;
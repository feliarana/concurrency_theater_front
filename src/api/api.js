import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("error", error);

    if (error.response.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

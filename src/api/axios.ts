import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export const publicApi = axios.create({
  baseURL,
});

export const authApi = axios.create({
  baseURL,
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

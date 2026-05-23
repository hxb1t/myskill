import axios from "axios";
import { APPLICATION_JSON } from "../constants/http";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const TIMEOUT = import.meta.env.VITE_API_TIMEOUT;

const handleSessionExpired = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login?session=expired";
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": APPLICATION_JSON,
  },
});

const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/file/upload/profile-picture",
];

apiClient.interceptors.request.use(
  (config) => {
    const isPublicRoute = publicRoutes.some((route) =>
      config.url.includes(route),
    );

    if (!isPublicRoute) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data?.data ?? response.data ?? null;
  },
  (error) => {
    if (error.response?.status === 401) {
      handleSessionExpired();
    }

    const errorMessage =
      error.response?.data?.message ||
      `Request failed with status ${error.response?.status || "Unknown"}`;

    return Promise.reject(new Error(errorMessage));
  },
);

const logout = () => {
  localStorage.removeItem("accessToken");
};

export default apiClient;

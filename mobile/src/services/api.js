import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { DeviceEventEmitter } from "react-native";

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL || "http://localhost:3000",
  timeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/file/upload/profile-picture",
];
apiClient.interceptors.request.use(
  async (config) => {
    const isPublicRoute = publicRoutes.some((route) =>
      config.url.includes(route),
    );

    if (!isPublicRoute) {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.log("Error reading token from SecureStorage:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      DeviceEventEmitter.emit("trigger_force_logout");
    }

    return Promise.reject(error);
  },
);

export default apiClient;

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

const publicRoutes = ["/auth/login", "/auth/register"];
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

    const method = config.method.toUpperCase();
    console.log(`🚀 [OUTGOING] ${method} ${config.baseURL}${config.url}`);

    console.log(`📦 [HEADERS]`, JSON.stringify(config.headers, null, 2));

    if (config.data && !(config.data instanceof FormData)) {
      console.log(`📝 [PAYLOAD]`, JSON.stringify(config.data, null, 2));
    } else if (config.data instanceof FormData) {
      console.log(`📝 [PAYLOAD] FormData (File Upload)`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ [RESPONSE] from ${response.config.url}\nPAYLOAD:`,
      JSON.stringify(response.data, null, 2),
    );
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

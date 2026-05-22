import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";
import { DeviceEventEmitter } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) {
        setAccessToken(token);
      }
    } catch (error) {
      console.error("Failed to fetch token", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
    const subscription = DeviceEventEmitter.addListener(
      "trigger_force_logout",
      logout,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const login = async (token) => {
    await SecureStore.setItemAsync("accessToken", token);
    setAccessToken(token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

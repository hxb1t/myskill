import apiClient from "./api";

export const login = async (username, password) => {
  try {
    return await apiClient.post("/auth/login", {
      username,
      password,
    });
  } catch (err) {
    throw new Error(err.message || "Terjadi kesalahan saat login");
  }
};

export const register = async (
  fullName,
  username,
  password,
  avatarUrl,
  school,
) => {
  try {
    return await apiClient.post("/auth/register", {
      fullName,
      username,
      password,
      avatarUrl,
      school,
    });
  } catch (err) {
    throw new Error(err.message || "Terjadi kesalahan saat register");
  }
};

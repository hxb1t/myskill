import apiClient from "./api";

const login = async (username, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });

    return response.data.data;
  } catch (error) {
    console.log("error", error.message);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Login failed");
    }

    throw new Error("Unable to connect to the server. Please try again.");
  }
};

const register = async (fullName, school, username, password) => {
  try {
    const response = await apiClient.post("/auth/register", {
      fullName,
      school,
      username,
      password,
    });

    return response.data.success;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Register Failed");
    }

    throw new Error("Unable to connect to the server. Please try again.");
  }
};

export default {
  login,
  register,
};

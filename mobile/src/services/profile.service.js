import apiClient from "./api";

const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/user/profile");
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Failed Get User  profile",
      );
    }
  }
};

export default {
  getUserProfile,
};

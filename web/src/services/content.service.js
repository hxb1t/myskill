import apiClient from "./api";

const getContents = async () => {
  try {
    const response = await apiClient.get("/content/discover");
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed Get contents");
    }
  }
};

const getOwnedContents = async () => {
  try {
    const response = await apiClient.get("/content/");
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed Get contents");
    }
  }
};

const getContentDetail = async (contentId) => {
  try {
    const response = await apiClient.get(`/content/${contentId}`);
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed Get contents");
    }
  }
};

const createContent = async (contentData) => {
  try {
    const response = await apiClient.post("/content/create", contentData);
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Failed to create content.",
      );
    }
    throw new Error("Unable to connect to the server.");
  }
};

export default {
  getContents,
  getContentDetail,
  createContent,
  getOwnedContents,
};

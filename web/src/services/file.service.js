import apiClient from "./api";

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "File upload failed.");
    }
    throw new Error("Unable to connect to the server for upload.");
  }
};

export const uploadProfilePicture = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(
      "/file/upload/profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "File upload failed.");
    }
    console.log("error", error);
    throw new Error("Unable to connect to the server for upload.");
  }
};

import apiClient from "./api";

const getMimeType = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();

  if (["mp4", "mov", "avi", "mkv"].includes(ext)) {
    return ext === "mov" ? "video/quicktime" : `video/${ext}`;
  }

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return ext === "jpg" ? "image/jpeg" : `image/${ext}`;
  }

  return "application/octet-stream";
};

const uploadFile = async (fileUri) => {
  try {
    const formData = new FormData();
    const filename = fileUri.split("/").pop();

    const type = getMimeType(filename);

    formData.append("file", {
      uri: fileUri,
      name: filename,
      type,
    });

    const response = await apiClient.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "File upload failed.");
    }
    throw new Error("Unable to connect to the server for upload.");
  }
};

export default {
  uploadFile,
};

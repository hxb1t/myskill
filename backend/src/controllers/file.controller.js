const fileService = require("../services/file.service");
const { sendSuccess } = require("../utils/apiResponse");
const logger = require("../utils/logger");

const uploadFile = async (req, res, next) => {
  try {
    const userId = req.claims.userId;
    logger.info(`[UploadFile] File upload initiated by userId: ${userId}`);
    const data = await fileService.uploadFileToMinio(req.file, userId);
    sendSuccess(res, data);
  } catch (error) {
    logger.error("Error uploading file: ", error.message);
    next(error);
  }
};

const uploadProfilePicture = async (req, res, next) => {
  try {
    logger.info(
      `[UploadPublicFile] File upload initatied by user registration`,
    );
    const data = await fileService.uploadProfilePicture(req.file);
    sendSuccess(res, data);
  } catch (error) {
    logger.error("Error uploading file: ", error.message);
    next(error);
  }
};

module.exports = { uploadFile, uploadProfilePicture };

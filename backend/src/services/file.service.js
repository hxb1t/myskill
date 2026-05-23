const { minioClient } = require("../config/minio");
const { BadRequestError } = require("../utils/errors");
const logger = require("../utils/logger");

const User = require("../models/User");

const uploadFileToMinio = async (file, userId) => {
  logger.info("[uploadFileToMinio] Upload file");
  if (!file) {
    logger.error("[UploadFileToMinio] Failed due to empty file");
    throw new BadRequestError("No file provided");
  }

  const existingUser = await User.findById(userId);
  if (!existingUser) {
    logger.error("[UploadFileToMinio] User not found", `userId: ${userId}`);
    throw new BadRequestError("User not found");
  }

  const bucketName = process.env.MINIO_BUCKET_NAME || "myskill-bucket";
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const fileName = `${userId}-${timestamp}-${file.originalname}`;

  const bucketExists = await minioClient.bucketExists(bucketName);
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName);
  }

  await minioClient.putObject(bucketName, fileName, file.buffer, file.size, {
    "Content-Type": file.mimetype,
  });

  const fileUrl = await minioClient.presignedGetObject(
    bucketName,
    fileName,
    7 * 24 * 60 * 60,
  );

  return { fileName, url: fileUrl };
};

const uploadProfilePicture = async (file) => {
  logger.info("[uploadFileToMinio] Upload file");
  if (!file) {
    logger.error("[UploadFileToMinio] Failed due to empty file");
    throw new BadRequestError("No file provided");
  }

  const bucketName = process.env.MINIO_BUCKET_NAME || "myskill-bucket";
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const fileName = `profile-picture-${timestamp}-${file.originalname}`;

  const bucketExists = await minioClient.bucketExists(bucketName);
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName);
  }

  await minioClient.putObject(bucketName, fileName, file.buffer, file.size, {
    "Content-Type": file.mimetype,
  });

  const fileUrl = await minioClient.presignedGetObject(
    bucketName,
    fileName,
    7 * 24 * 60 * 60,
  );

  return { fileName, url: fileUrl };
};

module.exports = { uploadFileToMinio, uploadProfilePicture };

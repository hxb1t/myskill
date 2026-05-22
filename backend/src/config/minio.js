const Minio = require("minio");
const multer = require("multer");

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_HOST,
  port: process.env.MINIO_PORT,
  useSSL: false,
  accessKey: process.env.MINIO_USERNAME,
  secretKey: process.env.MINIO_PASSWORD,
});

module.exports = { minioClient };

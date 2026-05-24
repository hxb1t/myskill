const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/file.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  fileController.uploadFile,
);

router.post(
  "/upload/profile-picture",
  upload.single("file"),
  fileController.uploadProfilePicture,
);

module.exports = router;

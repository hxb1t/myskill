const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/file.controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.post("/upload", upload.single("file"), fileController.uploadFile);

module.exports = router;

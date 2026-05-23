const express = require("express");
const multer = require("multer");
const contentController = require("../controllers/content.controller");

const router = express.Router();

router.get("/", contentController.getUserContents);
router.get("/discover", contentController.getContents);
router.post("/create", contentController.createContent);
router.get("/:contentId", contentController.getContentById);

module.exports = router;

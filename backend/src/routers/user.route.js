const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user.controller");

router.get("/:userId", userController.getUserProfile);

module.exports = router;

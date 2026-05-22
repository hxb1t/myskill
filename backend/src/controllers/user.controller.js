const userService = require("../services/user.service");
const { sendSuccess } = require("../utils/apiResponse");
const logger = require("../utils/logger");

const getUserProfile = async (req, res, next) => {
  try {
    logger.info("request: ", req.params);
    const userProfile = await userService.getUserProfile(req.params.userId);
    sendSuccess(res, userProfile);
  } catch (error) {
    logger.error("Error happened when get user profile", error.message);
    next(error);
  }
};

module.exports = { getUserProfile };

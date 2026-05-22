const userService = require("../services/user.service");
const { sendSuccess } = require("../utils/apiResponse");
const logger = require("../utils/logger");

const getUserProfile = async (req, res, next) => {
  try {
    logger.info("claims: ", req.userId);
    const userProfile = await userService.getUserProfile(req.claims.userId);
    sendSuccess(res, userProfile);
  } catch (error) {
    logger.error("Error happened when get user profile", error.message);
    next(error);
  }
};

module.exports = { getUserProfile };

const logger = require("../utils/logger");
const { BadRequestError } = require("../utils/errors");
const User = require("../models/User");

const getUserProfile = async (userId) => {
  if (!userId) {
    logger.error("Invalid request, userId cannot be empty");
    throw new BadRequestError("Invalid Request. User ID Cannot be Empty");
  }

  const existingUser = await User.findOne({ _id: userId });
  if (!existingUser) {
    logger.error("User not found with userId:", userId);
    throw new BadRequestError("User not found");
  }

  return {
    fullName: existingUser.fullName,
    username: existingUser.username,
    school: existingUser.school,
    avatarUrl: existingUser.avatarUrl,
  };
};

module.exports = { getUserProfile };

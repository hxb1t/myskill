const contentService = require("../services/content.service");
const { sendSuccess } = require("../utils/apiResponse");
const logger = require("../utils/logger");

const getContents = async (req, res, next) => {
  try {
    const contents = await contentService.getContents(req.claims.userId);
    sendSuccess(res, contents);
  } catch (error) {
    logger.error("[getContents] Unexpected error happened", error.message);
    next(error);
  }
};

const createContent = async (req, res, next) => {
  try {
    const content = await contentService.createContent(
      req.body,
      req.claims.userId,
    );
    sendSuccess(res, content);
  } catch (error) {
    logger.error("[createContent] Unexpected error happened", error.message);
    next(error);
  }
};

module.exports = { getContents, createContent };

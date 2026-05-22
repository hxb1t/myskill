const logger = require("../utils/logger");
const { BadRequestError } = require("../utils/errors");
const User = require("../models/User");
const { Content, Article, Video } = require("../models/Content");

const getContents = async (userId) => {
  if (!userId) {
    logger.error("[getContents] User id is empty");
    throw new BadRequestError("Invalid request");
  }

  const contents = await Content.find({ authorId: { $ne: userId } })
    .sort({ createdAt: -1 })
    .populate("authorId", "fullName username school avatarUrl");

  return contents;
};

const getContentDetail = async (contentId) => {
  if (!contentId) {
    logger.error("[getContentDetail] Content id is empty");
    throw new BadRequestError("Invalid request");
  }

  const content = await Content.findById(contentId).populate(
    "authorId",
    "fullName username school avatarUrl",
  );

  return content;
};

const createContent = async (data, userId) => {
  if (!userId) {
    logger.error("[createContent] Missing userId in claims");
    throw new BadRequestError("Unauthorized user session");
  }

  if (data.type === "article") {
    if (!data.title || !data.thumbnailUrl || !data.contentHtml) {
      logger.error("[createContent] Invalid request for article type");
      throw new BadRequestError(
        "Missing required fields for creating an Article",
      );
    }

    const newArticle = await Article.create({
      authorId: userId,
      title: data.title,
      thumbnailUrl: data.thumbnailUrl,
      contentHtml: data.contentHtml,
    });

    logger.info(`createContent Article created successfully by ${userId}`);
    return newArticle;
  }

  if (data.type === "video") {
    if (
      !data.title ||
      !data.thumbnailUrl ||
      !data.videoUrl ||
      !data.descriptionHtml
    ) {
      logger.error("[createContent] Invalid request for video type");
      throw new BadRequestError("Missing required fields for creating a Video");
    }

    const newVideo = await Video.create({
      authorId: userId,
      title: data.title,
      thumbnailUrl: data.thumbnailUrl,
      videoUrl: data.videoUrl,
      descriptionHtml: data.descriptionHtml,
    });

    logger.info(`[createContent] Video created successfully by ${userId}`);
    return newVideo;
  }

  logger.error(`[createContent] Invalid content type provided: ${type}`);
  throw new BadRequestError(
    "[createContent] Invalid content type. Must be 'article' or 'video'.",
  );
};

module.exports = { createContent, getContents, getContentDetail };

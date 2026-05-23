const mongoose = require("mongoose");
const { Content } = require("../models/Content");
const User = require("../models/User");
const contentSeeds = require("../config/seeds/content.json");
const userSeeds = require("../config/seeds/user.json");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("Connected to Mongodb Atlas");
  } catch (error) {
    console.error(error);
  }
};

const seedContentData = async () => {
  try {
    const count = await Content.countDocuments();
    if (count > 0) {
      logger.info("Content data already exists. Skipping seed.");
      return;
    }

    const formattedSeeds = contentSeeds.map((item) => ({
      ...item,
      _id: item._id?.$oid || item._id,
      authorId: item.authorId?.$oid || item.authorId,
      createdAt: item.createdAt?.$date || item.createdAt,
      updatedAt: item.updatedAt?.$date || item.updatedAt,
    }));

    await Content.insertMany(formattedSeeds);
    logger.info("Content Data seeded successfully");
  } catch (error) {
    logger.error("Error seeding Content Data:", error);
  }
};

const seedUserData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      logger.info("User data already exists. Skipping seed.");
      return;
    }

    const formattedUserSeeds = userSeeds.map((user) => ({
      ...user,
      _id: user._id?.$oid || user._id,
      createdAt: user.createdAt?.$date || user.createdAt,
      updatedAt: user.updatedAt?.$date || user.updatedAt,
    }));

    await User.insertMany(formattedUserSeeds);
    logger.info("User Data seeded successfully");
  } catch (error) {
    logger.error("Error seeding User Data: ", error);
  }
};

module.exports = { connectDB, seedContentData, seedUserData };

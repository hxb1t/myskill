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

module.exports = { connectDB };

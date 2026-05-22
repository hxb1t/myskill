const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  school: { type: String, required: true},
  avatarUrl: { type: String },
});

module.exports = mongoose.model("User", userSchema);

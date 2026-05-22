const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

const USER_VALIDATION_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;

const register = async ({ fullName, username, password, school }) => {
  if (!username || !USER_VALIDATION_REGEX.test(username)) {
    throw new BadRequestError("Invalid Username format!");
  }

  const existing = await User.findOne({ username });
  if (existing) throw new BadRequestError("Username already registered!");

  const passwordHash = await bcrypt.hash(
    password,
    Number(process.env.PASSWORD_HASH_SALT) || 12,
  );

  const createdUser = await User.create({
    fullName,
    username,
    school,
    passwordHash,
    avatarUrl:
      "https://images.unsplash.com/photo-1772371272152-d1806d4351e0?q=80&w=880&auto=format&fit=crop",
  });

  return {
    id: createdUser._id,
    name: createdUser.fullName,
    username: createdUser.username,
  };
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new UnauthorizedError();

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new UnauthorizedError();

  const accessToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: Number(process.env.JWT_EXPIRED_TIME) || 900 },
  );

  return {
    accessToken,
  };
};

module.exports = { register, login };

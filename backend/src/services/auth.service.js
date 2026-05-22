const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

const USER_VALIDATION_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1772371272206-0525c3183ca9?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1740252117012-bb53ad05e370?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?q=80&w=200&h=200&auto=format&fit=crop",
];

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

  const randomAvatarUrl =
    DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];

  const createdUser = await User.create({
    fullName,
    username,
    school,
    passwordHash,
    avatarUrl: randomAvatarUrl,
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

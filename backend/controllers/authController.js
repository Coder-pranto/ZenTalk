const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const createError = require('../utils/createError');
const { generateTokenAndSetCookie } = require('../utils/generateToken');

const signup = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    throw createError("Passwords don't match", 400);
  }

  const user = await User.findOne({ username });

  if (user) {
    throw createError('Username already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const boyProfilePic = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
    username + '_male',
  )}`;

  const girlProfilePic = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
    username + '_female',
  )}`;

  const newUser = new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
  });

  await newUser.save();

  generateTokenAndSetCookie(newUser._id, res);

  res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    username: newUser.username,
    profilePic: newUser.profilePic,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw createError('Username and password are required', 400);
  }

  const user = await User.findOne({ username }).lean();

  if (!user) {
    throw createError('Invalid username or password', 400);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw createError('Invalid username or password', 400);
  }

  generateTokenAndSetCookie(user._id, res);

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    profilePic: user.profilePic,
  });
};

const logout = (req, res) => {
  if (!req.cookies?.jwt) {
    throw createError('User already logged out', 400);
  }

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return res.status(200).json({
    message: 'Logged out successfully',
  });
};

module.exports = {
  signup,
  login,
  logout,
};

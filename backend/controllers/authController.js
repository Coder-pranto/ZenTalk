const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const { generateTokenAndSetCookie }= require('../utils/generateToken.js');

const signup = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    const err = new Error("Passwords don't match");
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ username });

  if (user) {
    const err = new Error('Username already exists');
    err.status = 400;
    throw err;
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const boyProfilePic = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(username + '_male')}`;
  const girlProfilePic = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(username + '_female')}`;


  const newUser = new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
  });

  await newUser.save(); // 💡 Reminder: `new User()` always truthy → no if-check needed!
                       // ❌ Any real errors (validation, duplicate username, DB fail) → 
                       // automatically caught by Express v5 global error middleware.
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
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }
  const user = await User.findOne({ username }).lean(); // 💡 .lean() returns a plain JS object instead of a Mongoose document, which is more efficient for read-only operations like this.

  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ error: 'Invalid username or password' });
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

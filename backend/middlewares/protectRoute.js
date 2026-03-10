const User = require('../models/userModel');
const createError = require('../utils/createError');
const { verifyToken } = require('../utils/generateToken');

const protectRoute = async (req, res, next) => {
  const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1];

  if (!token) throw createError('Unauthorized- No token provided', 401);

  const decoded = verifyToken(token);

  const user = await User.findById(decoded.userId).select('-password');

  if (!user) throw createError('User not found', 404);

  req.user = user;

  next();
};

module.exports = protectRoute;

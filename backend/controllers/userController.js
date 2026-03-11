const User = require('../models/userModel');
const createError = require('../utils/createError');

const getUsersForSidebar = async (req, res) => {
  const loggedInUserId = req.user?._id;

  if (!loggedInUserId) {
    throw createError('Unauthorized', 401);
  }

  const users = await User.find({ _id: { $ne: loggedInUserId } })
    .select('-password -__v')
    .lean()
    .sort({ fullName: 1 });

  res.status(200).json({
    success: true,
    data: users,
  });
};

module.exports = { getUsersForSidebar };

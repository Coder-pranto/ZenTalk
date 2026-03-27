const Conversation  = require('../models/conversationModel');
const Message = require('../models/messageModel');
const { getReceiverSocketId, io } =  require("../socket/socketConfig");
const createError = require('../utils/createError');

const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (!message || message.trim() === '') {
    throw createError('Message cannot be empty', 400);
  }

  if (!receiverId) {
    throw createError('Receiver ID required', 400);
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      messages: [],
    });
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  conversation.messages.push(newMessage._id);

  await conversation.save();

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit('newMessage', newMessage);
  }


  res.status(201).json({
    success: true,
    data: newMessage,
  });
};

const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate('messages');

  if (!conversation) {
    return res.status(200).json({
      success: true,
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    data: conversation.messages,
  });
};
module.exports = {
  sendMessage,
  getMessages,
};

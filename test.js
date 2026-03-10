const Coversation = require("../models/conversationModel.js");
const Message = require("../models/messageModel.js");

const sendMessage = async (req, res) => {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, reciverId]
        }
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, reciverId]
        });
    }

    const newMessage = await Message.create({
        senderId,
        reciverId,
        message
    });
   


        conversation.messages.push(newMessage._id);

      await conversation.save();
    res.status(201).json(newMessage);

}
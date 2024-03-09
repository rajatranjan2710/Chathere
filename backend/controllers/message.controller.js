import Conversation from "../models/Conversation.model.js";
import Message from "../models/message.model.js";

export const sendmessage = async (req, res) => {
  console.log("message sent");

  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    if (!message) {
      return res.status(400).json({
        error: "Send something",
      });
    }

    let conversations = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversations) {
      conversations = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      messages: message,
    });

    if (newMessage) {
      conversations.messages.push(newMessage._id);
    }

    await conversations.save();
    await newMessage.save();
    // await conversations.save();

    res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.log("Error in sendmessage controller      ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getchat = async (req, res) => {
  const { id: getchatof } = req.params;
  const sender = req.user._id;

  const conversations = await Conversation.find({
    participants: { $all: [sender, getchatof] },
  }).populate("messages");

  console.log(conversations);

  if (!conversations) {
    return res.status(200).json({
      message: "No conversations yet",
    });
  }

  res.status(201).json({
    message: "data fetched",
    conversations,
  });
};

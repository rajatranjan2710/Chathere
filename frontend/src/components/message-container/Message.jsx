import React from "react";
import { useSelector } from "react-redux";

const Message = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const { selectedConversation } = useSelector((state) => state.conversations);
  // console.log(user);
  const newUser = JSON.parse(user);

  const isCurrentUser = item.senderId === newUser._id;

  return (
    <div className={`chat-bubble-${isCurrentUser ? "sender" : "reciever"}`}>
      <div className="name">{item.messages}</div>
      <div>
        <img
          src={
            isCurrentUser ? newUser.profilepic : selectedConversation.profilepic
          }
          alt="gojo"
        />
      </div>
    </div>
  );
};

export default Message;

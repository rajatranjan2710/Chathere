import React from "react";
import ContainerHeader from "./ContainerHeader";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  return (
    <div className="messageContainer">
      <ContainerHeader />
      <Messages />
      <SendMessage />
    </div>
  );
};

export default MessageContainer;

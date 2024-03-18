import React, { useEffect } from "react";
import Message from "./Message";
import useGetConversations from "../../hooks/useGetConversation";
import { useSelector } from "react-redux";
import { Rings } from "react-loader-spinner";

const Messages = () => {
  const { loading, messagesEndRef, scrollToBottom } = useGetConversations();

  // const messagesEndRef = useRef(null);
  const { messages } = useSelector((state) => state.conversations);

  //To scroll when there is new message
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages, scrollToBottom]);

  return (
    <div className="messages">
      {loading ? (
        <Rings
          height={100}
          width={100}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          color="red"
        />
      ) : messages.length === 0 ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Messages empty
        </div>
      ) : (
        <>
          {messages.map((item, index) => (
            <div key={index}>
              <Message item={item} />
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </>
      )}
    </div>
  );
};

export default Messages;

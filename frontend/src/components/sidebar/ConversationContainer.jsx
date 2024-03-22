import React from "react";
import Conversations from "./Conversations";
import useConversations from "../../hooks/useConversations";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import useListenMessage from "../../hooks/useListenMessage";

const ConversationContainer = () => {
  const { loading } = useConversations();

  const { conversations } = useSelector((state) => state.conversations);
  // useListenMessage();

  return (
    <div className="conversation_container">
      {loading ? (
        <Loader />
      ) : (
        conversations.map((item, index) => (
          <Conversations item={item} key={index} />
        ))
      )}
    </div>
  );
};

export default ConversationContainer;

import React from "react";
import Conversations from "./Conversations";
import useConversations from "../../hooks/useConversations";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const ConversationContainer = () => {
  const { loading } = useConversations();

  const { conversations } = useSelector((state) => state.conversations);

  return (
    <div className="conversation_container">
      {loading ? (
        <Loader />
      ) : (
        conversations.map((item, index) => (
          <Conversations item={item} key={index} index={index} />
        ))
      )}
    </div>
  );
};

export default ConversationContainer;

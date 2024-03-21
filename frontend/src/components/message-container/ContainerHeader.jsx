import React from "react";
import "../../styles/messageContainer.scss";
import { useSelector } from "react-redux";

const ContainerHeader = () => {
  const { selectedConversation } = useSelector((state) => state.conversations);

  return (
    <div className="container-header">
      <div className="avatar">
        <img src={selectedConversation?.profilepic || ""} alt="" />
      </div>
      <div>{selectedConversation?.fullName || ""} </div>
    </div>
  );
};

export default ContainerHeader;

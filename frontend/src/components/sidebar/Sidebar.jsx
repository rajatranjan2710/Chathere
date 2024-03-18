import React from "react";
import "../../styles/home.scss";
import SearchTab from "./SearchTab";
import ConversationContainer from "./ConversationContainer";
// import LogoutButton from "./LogoutButton";
// import Conversations from "./Conversations";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SearchTab />
      <ConversationContainer />
    </div>
  );
};

export default Sidebar;

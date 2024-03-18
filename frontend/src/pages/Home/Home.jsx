import React from "react";
// import useLogout from "../../hooks/useLogout";
// import Loader from "../../components/Loader";
import "../../styles/home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message-container/MessageContainer";
import { useSelector } from "react-redux";
import ProfileShow from "../../components/message-container/ProfileShow";
import PlaceholderComponent from "../../components/PlaceholderComponent";

const Home = () => {
  const { isProfileOpen } = useSelector((state) => state.util);
  const { selectedConversation } = useSelector((state) => state.conversations);
  // const { loading, logout } = useLogout();

  // const signOutClickHandler = () => {
  //   logout();
  // };

  return (
    <div className="home">
      <Sidebar />
      {isProfileOpen ? (
        <ProfileShow />
      ) : selectedConversation ? (
        <MessageContainer />
      ) : (
        <PlaceholderComponent />
      )}
    </div>
  );
};

export default Home;

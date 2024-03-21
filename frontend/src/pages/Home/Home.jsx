import React, { useEffect } from "react";
import "../../styles/home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message-container/MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import ProfileShow from "../../components/message-container/ProfileShow";
import PlaceholderComponent from "../../components/PlaceholderComponent";
import { useSocketContext } from "../../components/context/SocketContext";
import { setOnlineUsers } from "../../redux/reducers/socketReducer";
import useListenMessage from "../../hooks/useListenMessage";

const Home = () => {
  const { isProfileOpen } = useSelector((state) => state.util);
  const { selectedConversation } = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  //For Notification

  useEffect(() => {
    console.log("using home useEffect");
    if (socket) {
      socket.on("getOnlineUsers", (users) => {
        console.log("io from server in home :", users);
        dispatch(setOnlineUsers(users));
      });
    }
  }, [socket, dispatch]);

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

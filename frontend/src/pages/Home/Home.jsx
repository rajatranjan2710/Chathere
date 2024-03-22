import React, { useEffect } from "react";
import "../../styles/home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message-container/MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import ProfileShow from "../../components/message-container/ProfileShow";
import PlaceholderComponent from "../../components/PlaceholderComponent";
import { useSocketContext } from "../../components/context/SocketContext";
import {
  isHomeMounted,
  setOnlineUsers,
} from "../../redux/reducers/socketReducer";
import useListenMessage from "../../hooks/useListenMessage";
import toast from "react-hot-toast";

const Home = () => {
  const { isProfileOpen } = useSelector((state) => state.util);
  const { messages, conversations, selectedConversation } = useSelector(
    (state) => state.conversations
  );
  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  //For Notification

  useEffect(() => {
    // console.log("using home useEffect");
    if (socket) {
      socket.on("getOnlineUsers", (users) => {
        // console.log("io from server in home :", users);
        dispatch(setOnlineUsers(users));
      });
    }
  }, [socket, dispatch]);

  // useListenMessage();

  useEffect(() => {
    dispatch(isHomeMounted());
  }, []);
  //trial code

  useEffect(() => {
    if (socket) {
      socket.on("message", (messages) => {
        const senderId = messages.senderId;

        const ConversationToFind = conversations.find(
          (conversation) => conversation._id === senderId
        );

        if (!ConversationToFind) {
          return;
        }

        if (!selectedConversation) {
          toast.success(`New message from ${ConversationToFind.fullName}`);
        }
      });

      return () => {
        socket.off("message");
      };
    }
  }, [dispatch, messages, socket, conversations]);

  // useListenMessage();

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

import React from "react";
// import img1 from "../../assets/img1.jpg";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updatedSelecctedConversation } from "../../redux/reducers/conversationsReducer";

const Conversations = ({ item }) => {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.socket);

  // if the online users include the props.item._id their online status is true
  const isOnline = onlineUsers.includes(item._id);

  //for notification
  const notification = localStorage.getItem("notification-count");
  const parsedNotification = notification ? JSON.parse(notification) : {};
  const conversationNotification = parsedNotification[item._id] || 0;

  // selectedChat or not
  const { selectedConversation } = useSelector((state) => state.conversations);
  const isSelected =
    selectedConversation && selectedConversation._id === item._id;

  const clickHandler = (_id) => {
    // console.log("clicked");
    // toast.success("CLicked");
    // console.log(_id);
    dispatch(updatedSelecctedConversation(_id));
  };

  return (
    <>
      <div
        className={`conversations ${isSelected ? "selected" : ""}`}
        onClick={() => clickHandler(item._id)}
      >
        <div className="img">
          <img className="avatar" src={item.profilepic} alt="img1" />
          <div className={`${isOnline ? "onlineStatus" : ""}`}></div>
        </div>
        <div className="name">{item.fullName}</div>
        {conversationNotification > 0 && (
          <div className="notification">{conversationNotification}</div>
        )}
      </div>
      <div className="line"></div>
    </>
  );
};

export default Conversations;

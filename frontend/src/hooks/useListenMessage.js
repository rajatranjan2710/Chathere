import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  updateNotificationCount,
  updatedMessageOnSend,
} from "../redux/reducers/conversationsReducer";
import { useSocketContext } from "../components/context/SocketContext";
import toast from "react-hot-toast";

const useListenMessage = () => {
  // const { socket } = useSocket();

  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  // const { messages } = useSelector((state) => state.conversations);
  const [notificationCount, setNotificationCount] = useState(() => {
    const storedNotificationCount = localStorage.getItem("notification-count");
    return storedNotificationCount ? JSON.parse(storedNotificationCount) : {};
  });
  const [shouldPersist, setShouldPersist] = useState(false);
  const { selectedConversation } = useSelector((state) => state.conversations);

  useEffect(() => {
    console.log("socket listener initialized");
    // console.log("socket :", socket);
    // console.log("value of socket in useListen", socket);

    socket.on("message", (messages) => {
      // console.log("message : ", messages);
      const senderId = messages.senderId;
      console.log("senderId of this new message", senderId);
      if (selectedConversation._id === senderId) {
        toast(`New message (${messages.messages})`);
        // console.log(messages.senderId);
        dispatch(updatedMessageOnSend(messages));
      } else {
        console.log("running else part");
        toast.success(`New message from ${senderId}`);
        setNotificationCount((prevCount) => ({
          ...prevCount,
          [senderId]: (prevCount[senderId] || 0) + 1,
        }));
        setShouldPersist(true);
        // console.log("norifications : ", notificationCount);
      }
    });

    return () => {
      console.log("unmounting the message");
      socket.off("message");
    };
  }, [dispatch, socket, selectedConversation]);

  useEffect(() => {
    if (selectedConversation._id) {
      setNotificationCount((prevCount) => ({
        ...prevCount,
        [selectedConversation._id]: 0,
      }));
      setShouldPersist(true);

      const updatedNotificationCount = { ...notificationCount };
      delete updatedNotificationCount[selectedConversation._id];
      localStorage.setItem(
        "notification-count",
        JSON.stringify(updatedNotificationCount)
      );
    }
  }, [selectedConversation, notificationCount]);

  useEffect(() => {
    // Update local storage when notificationCount changes
    // console.log("cause new notification");
    if (shouldPersist) {
      localStorage.setItem(
        "notification-count",
        JSON.stringify(notificationCount)
      );
    }
    setShouldPersist(false);
  }, [notificationCount, shouldPersist]);

  useEffect(() => {
    // Update Redux store with the updated notificationCount
    dispatch(updateNotificationCount(notificationCount));
  }, [notificationCount, dispatch]);
};
export default useListenMessage;

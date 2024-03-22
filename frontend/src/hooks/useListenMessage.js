import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  updateNotification,
  updateNotificationCount,
  updatedMessageOnSend,
} from "../redux/reducers/conversationsReducer";
import { useSocketContext } from "../components/context/SocketContext";
import toast from "react-hot-toast";

const useListenMessage = () => {
  // const { socket } = useSocket();

  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const [notify, setNotify] = useState(false);
  const [notificationCount, setNotificationCount] = useState(() => {
    const storedNotificationCount = localStorage.getItem("notification-count");
    return storedNotificationCount ? JSON.parse(storedNotificationCount) : {};
  });
  const { isHomeMounted } = useSelector((state) => state.socket);
  // const [shouldPersist, setShouldPersist] = useState(false);
  const { messages, conversations, selectedConversation } = useSelector(
    (state) => state.conversations
  );

  // console.log("UseListen");

  useEffect(() => {
    // console.log("flag");
    if (!socket) {
      console.log("not socket");
      return;
    }
    // console.log("socket listener initialized");
    // console.log("socket :", socket);
    // console.log("value of socket in useListen", socket);

    socket.on("message", (messages) => {
      // console.log("message : ", messages);
      const senderId = messages.senderId;

      //Finding the user which matches to senderId
      const SenderUser = conversations.find(
        (conversation) => conversation._id === senderId
      );

      // console.log("senderId of this new message", senderId);
      if (selectedConversation && selectedConversation._id === senderId) {
        toast.success(`New message from (${SenderUser.fullName})`);
        // console.log(messages.senderId);
        dispatch(updatedMessageOnSend(messages));
      } else {
        // console.log("running else part");
        setNotify(true);
        toast.success(`New message from ${SenderUser.fullName}`);
        setNotificationCount((prevCount) => ({
          ...prevCount,
          [senderId]: (prevCount[senderId] || 0) + 1,
        }));
        // console.log(notificationCount);
        // setShouldPersist(true);
        // console.log("norifications : ", notificationCount);
      }
    });

    return () => {
      // console.log("unmounting the message");
      socket.off("message");
    };
  }, [dispatch, selectedConversation, messages, isHomeMounted]);

  useEffect(() => {
    if (!selectedConversation) {
      return;
    }
    // console.log("running use Effect 2");
    if (selectedConversation._id) {
      setNotificationCount((prevCount) => ({
        ...prevCount,
        [selectedConversation._id]: 0,
      }));
      // setShouldPersist(true);

      const updatedNotificationCount = { ...notificationCount };
      delete updatedNotificationCount[selectedConversation._id];
      localStorage.setItem(
        "notification-count",
        JSON.stringify(updatedNotificationCount)
      );
    }
  }, [selectedConversation, isHomeMounted, notify]);

  useEffect(() => {
    // Update local storage when notificationCount changes
    // console.log("running useEffect 3");
    // if (shouldPersist) {
    localStorage.setItem(
      "notification-count",
      JSON.stringify(notificationCount)
    );
    // }
    // const not = localStorage.getItem("notification-count");
    // console.log("running not : ", not);
    // setShouldPersist(false);
  }, [notify]);

  useEffect(() => {
    // Update Redux store with the updated notificationCount
    // setShouldPersist(true);

    // console.log("running use Effect 4");

    dispatch(updateNotification());

    setNotify(false);
    // setShouldPersist(false);
  }, [notify]);

  return { notificationCount };
  // console.log("here is the notification : ", notificationCount);
};

export default useListenMessage;

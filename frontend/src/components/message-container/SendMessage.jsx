import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import { Rings } from "react-loader-spinner";

const SendMessage = () => {
  const [message, setMessage] = useState({
    message: "",
  });
  const { loading, sendMessage } = useSendMessage();

  // console.log(message);

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
    // console.log(message);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (message.message === "") {
      return;
    }
    // console.log("we are in sendmessage onsubmit");
    sendMessage(message);
    setMessage({ message: "" });
  };

  return (
    <div className="sendMessage">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="type your message"
          name="message"
          value={message.message}
          onChange={handleChange}
        />
        {loading ? (
          <Rings />
        ) : (
          <button type="submit">
            <IoSend size={26} />
          </button>
        )}
      </form>
    </div>
  );
};

export default SendMessage;

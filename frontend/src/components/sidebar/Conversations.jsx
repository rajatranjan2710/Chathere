import React from "react";
// import img1 from "../../assets/img1.jpg";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updatedSelecctedConversation } from "../../redux/reducers/conversationsReducer";

const Conversations = ({ item, index }) => {
  const dispatch = useDispatch();

  // if (isSelected) {
  //   console.log("Here is", isSelected);
  // }
  const { selectedConversation } = useSelector((state) => state.conversations);
  const isSelected =
    selectedConversation && selectedConversation._id === item._id;

  const clickHandler = (_id) => {
    console.log("clicked");
    toast.success("CLicked");
    console.log(_id);
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
        </div>
        <div className="name">{item.fullName}</div>
        <div className="emoji">{index}</div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default Conversations;

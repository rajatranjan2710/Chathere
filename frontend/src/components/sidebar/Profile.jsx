import React from "react";
import gojo1 from "../../assets/gojo1.png";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProfileOpen } from "../../redux/reducers/utilReducer";

const Profile = () => {
  const dispatch = useDispatch();

  const profileOpenHandler = () => {
    toast.success("Clicked");
    // console.log("clicked");
    dispatch(setProfileOpen());
  };

  return (
    <div className="profile" onClick={profileOpenHandler}>
      {" "}
      <img src={gojo1} alt="gojo" />{" "}
    </div>
  );
};

export default Profile;

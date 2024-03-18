import React from "react";
import gojo1 from "../../assets/gojo1.png";
// import { useSelector } from "react-redux";
import LogoutButton from "../sidebar/LogoutButton";

const ProfileShow = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  //   console.log(user);
  return (
    <div className="profile-show">
      <div className="profile-avatar">
        <img src={gojo1} alt="gojo" />
      </div>
      <div>{userData.fullName}</div>
      <div>{userData.username}</div>
      <LogoutButton />
    </div>
  );
};

export default ProfileShow;

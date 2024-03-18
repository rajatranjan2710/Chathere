import React from "react";
import "../../styles/home.scss";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="logout-button">
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default LogoutButton;

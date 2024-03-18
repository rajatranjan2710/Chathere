import React, { useState } from "react";
import "../../styles/login.scss";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";
import Loader from "../../components/Loader";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // Using useEffect to check weather user is login or not

  const { loading, signUplol } = useSignUp();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await signUplol(formData);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="container">
      <h1>Get Started</h1>
      <h4>Create a new account</h4>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Full name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div className="radio-container">
          <div>
            <input
              type="radio"
              name="gender"
              value="Male"
              id="male"
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              value="Female"
              id="female"
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
        Already have an account
      </Link>
    </div>
  );
};

export default SignUp;

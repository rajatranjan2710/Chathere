import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUplol = async (formData) => {
    const success = ValidDate(formData);
    console.log(success);
    if (!success) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${server}/signup`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      toast.success(response.data.message);

      navigate("/home");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUplol };
};

export default useSignUp;

const ValidDate = (formData) => {
  if (
    !formData.userName ||
    !formData.fullName ||
    !formData.password ||
    !formData.confirmPassword ||
    !formData.gender
  ) {
    toast.error("All fields are required");
    return false;
  } else if (formData.password !== formData.confirmPassword) {
    toast.error("Password Doesn't Match");
    return false;
  } else if (formData.password.length < 6) {
    toast.error("Password must have atleast 6 characters");
    return false;
  } else {
    return true;
  }
};

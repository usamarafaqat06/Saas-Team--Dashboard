import React, { useState, useEffect } from "react";
import SignUp from "../components/signup/SignUp";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useCreateAdminMutation } from "../redux/apiCalls/apiSlice";

const SignUpPage = () => {
  const [inputValue, setInput] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
  });
  const [createAdmin, { error }] = useCreateAdminMutation();
  console.log("error", error);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await createAdmin(inputValue);
      if (response.data.status === true) console.log("data saved", inputValue);
      alertify.set("notifier", "position", "top-center");
      alertify.success(response.data.message);
      navigate("/");
      setInput("");
      if (response.data.status === false) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (error) {
      alertify.set("notifier", "position", "top-center");
      alertify.error(error && error.data.message);
    }
  }, [error]);

  const handleChange = (e) => {
    setInput({ ...inputValue, [e.target.name]: e.target.value });
    console.log("input data", inputValue);
  };
  return (
    <SignUp
      handleChange={handleChange}
      inputValue={inputValue}
      submitHandler={submitHandler}
    />
  );
};

export default SignUpPage;

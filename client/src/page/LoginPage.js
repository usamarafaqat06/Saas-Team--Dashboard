import React, { useState, useEffect } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import {
  useLoginAdminMutation,
  useLoginUserMutation,
} from "../redux/apiCalls/apiSlice";
import { useNavigate } from "react-router-dom";
import Login from "../components/login/Login";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [saveAdmin, setSaveAdmin] = useState(false);
  const [loginAdmin, { error: loginError }] = useLoginAdminMutation();
  const [loginUser, { error: userLoginError }] = useLoginUserMutation();

  const navigate = useNavigate();
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [selectedRole, setSelectedRole] = useState("admin");

  const [inputValue, setInput] = useState({
    userName: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (selectedRole === "admin") {
        const res = await loginAdmin(inputValue);
        console.log("Admin login response", res);

        if (res.data.status) {
          const token = res.data.token;
          localStorage.setItem("access_token_admin", token);
          alertify.set("notifier", "position", "top-right");
          alertify.success(res.data.message);
          localStorage.setItem("adminRole", res.data.type);
          if (res.data.type === "admin") {
            navigate("/mainDashboard");
          }
        } else {
          alertify.set("notifier", "position", "top-right");
          alertify.error(res.data.message);
        }
      } else if (selectedRole === "user") {
        const res = await loginUser(inputValue);

        if (res.data.type === "user") {
          const token = res.data.token;
          console.log("usertoken", token);
          if (res.data.status) {
            localStorage.setItem("access_token_User", token);
            alertify.set("notifier", "position", "top-right");
            alertify.success(res.data.message);
            localStorage.setItem("userRole", res.data.type);
            navigate("/user-dashboard");
          }
          if (!res.data.status) {
            alertify.set("notifier", "position", "top-right");
            alertify.error(res.error.data.message);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (loginError) {
      alertify.set("notifier", "position", "top-right");
      alertify.error(loginError && loginError.data.message);
    }
  }, [loginError, navigate]);
  useEffect(() => {
    if (userLoginError) {
      alertify.set("notifier", "position", "top-right");
      alertify.error(userLoginError && userLoginError.data.message);
    }
  }, [userLoginError, navigate]);

  const handleChange = (e) => {
    setInput({ ...inputValue, [e.target.name]: e.target.value });
  };
  return (
    <Login
      handleChange={handleChange}
      submitHandler={submitHandler}
      togglePassword={togglePassword}
      showPassword={showPassword}
      setSelectedRole={setSelectedRole}
      selectedRole={selectedRole}
      inputValue={inputValue}
      setSaveAdmin={setSaveAdmin}
      saveAdmin={saveAdmin}
    />
  );
};
export default LoginPage;

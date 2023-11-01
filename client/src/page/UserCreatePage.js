import React, { useState } from "react";
import { useCreateUserMutation } from "../redux/apiCalls/apiSlice";
import { AdminToken } from "../redux/utils/adminAuth";
import UserCreate from "../components/user/UserCreate";

function UserCreatePage({ closeModal }) {
  const [createUser] = useCreateUserMutation();

  const [user, setUser] = useState({
    userName: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const submitHandler = async (e) => {
    const tokenTest = AdminToken();
    e.preventDefault();
    try {
      await createUser({ user, tokenTest });
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <UserCreate
      submitHandler={submitHandler}
      handleChange={handleChange}
      showPassword={showPassword}
      togglePassword={togglePassword}
      user={user}
      closeModal={closeModal}
    />
  );
}

export default UserCreatePage;

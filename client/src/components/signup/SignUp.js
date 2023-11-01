import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import InputFields from "../login/InputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { socialIcons } from "../login/SocialIcons";
const SignUp = ({ handleChange, inputValue, submitHandler }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="background">
        <div>
          <div className="md:w-[700px] p-[60px]  bg-[#fff] rounded ">
            <h2 className="text-center text-[36px] text-blue-600 font-bold mb-2">
              Get started with Us
            </h2>
            <span className="text-center block mb-6  text-[17px] font-bold">
              Register a new membership
            </span>
            <form className="w-[100%] mb-6" onSubmit={submitHandler}>
              <InputFields
                iconname={faUser}
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={inputValue.name}
                required
                placeholder="Full Name"
                className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none"
              />
              <InputFields
                iconname={faEnvelope}
                type="email"
                name="email"
                id="email"
                required
                onChange={handleChange}
                value={inputValue.email}
                placeholder="Email"
                className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none"
              />
              <InputFields
                iconname={faLock}
                type="text"
                required
                name="userName"
                id="userName"
                onChange={handleChange}
                value={inputValue.userName}
                placeholder=" User Name"
                className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none"
              />
              <InputFields
                iconname={faLock}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                variant="pass"
                required
                value={inputValue.password}
                className="border border-[#86a4c3] w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none"
                togglepassword={togglePassword}
                showpassword={showPassword}
              />
              <div className="flex items-center  mb-[40px] gap-[40px] mt-[30px]">
                <input type="checkbox" className="h-6 w-6 text-indigo-600 " />
                <label className="text-[17px] ">
                  {" "}
                  I agree to the{" "}
                  <span className="text-[#D97706] font-bold">Terms</span>
                </label>
              </div>
              <div className="flex justify-center ">
                <button
                  type="submit"
                  className="bg-[#00abea]  text-white font-semibold py-2 hover:bg-[#000] hover:transition-all  px-6 rounded"
                >
                  SIGN UP
                </button>
              </div>
            </form>
            <div className="flex justify-center">
              <label className="text-[17px] ">
                {" "}
                Already have an account?{" "}
                <Link to="/" className="text-[#D97706] font-bold">
                  Login In
                </Link>
              </label>
            </div>
            <span className="block text-center pt-3 text-[#fff] text-[20px]">
              -Register with-
            </span>
            <div className="flex items-center justify-center mt-3">
              {socialIcons.map((icons, index) => (
                <a
                  key={index}
                  href={icons.link}
                  className={`mx-2 h-[50px] w-[50px] bg-[${icons.color}] rounded-[100%] box-border inline-block text-[#fff] flex items-center justify-center text-[20px]`}
                  style={{ backgroundColor: icons.color }}
                >
                  <FontAwesomeIcon icon={icons.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

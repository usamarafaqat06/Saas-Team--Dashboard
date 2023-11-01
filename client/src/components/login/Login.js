import "alertifyjs/build/css/alertify.css";
import "./Login.css";
import { Link } from "react-router-dom";
import { faUser, faLock, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import InputFields from "./InputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialIcons } from "../login/SocialIcons";

const Login = (props) => {
  const {
    submitHandler,
    inputValue,
    handleChange,
    showPassword,
    togglePassword,
    selectedRole,
    setSelectedRole,
    saveAdmin,
    setSaveAdmin,
  } = props;
  return (
    <>
      <div className="background-1 h-full">
        <div>
          <div className="md:w-[600px] p-[60px]  bg-[#fff] rounded ">
            <h2 className="text-center text-[36px] text-blue-600 font-bold mb-2">
              Let's dive in
            </h2>
            <span className="text-center block mb-6  text-[17px] font-bold">
              Login to continue.
            </span>
            <form className="w-[100%] mb-6" onSubmit={submitHandler}>
              <InputFields
                iconname={faUser}
                type="text"
                name="userName"
                id="userName"
                value={inputValue.userName}
                onChange={handleChange}
                placeholder="Username"
                className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none"
              />
              <InputFields
                iconname={faLock}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                variant="pass"
                value={inputValue.password}
                onChange={handleChange}
                placeholder="Password"
                className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none "
                togglepassword={togglePassword}
                showpassword={showPassword}
              />
              <div className="flex items-center  mb-4 relative">
                <FontAwesomeIcon
                  icon={faUserCheck}
                  className=" border  border-[#86a4c3]  py-[16px] w-[54px] rounded rounded-r-none  "
                />
                <select
                  name="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="border border-[#86a4c3] w-[100%] p-3  outline-none text-[#000]  focus:border-0 border-l-0"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex  justify-between ">
                <div className="flex items-start  mb-[40px] gap-[30px] ">
                  <input
                    type="checkbox"
                    onChange={() => setSaveAdmin(!saveAdmin)}
                    className="h-6 w-6 text-indigo-600"
                  />
                  <label className="text-[17px] ">
                    {" "}
                    Remember Me{" "}
                    <span className="text-[#D97706] font-bold">Terms</span>
                  </label>
                </div>
                <div className="flex gap-[4px] ">
                  <i className="fa-solid fa-lock  pt-1 pe-2 "></i>
                  <a href="/">Forget Password</a>
                </div>
              </div>
              <div className="flex justify-center ">
                <button
                  type="submit"
                  className="bg-[#FF6C6C] text-white font-semibold py-2 hover:bg-[#000] hover:transition-all  px-6 rounded"
                >
                  LOG IN
                </button>
              </div>
            </form>
            <div className="flex justify-center">
              <label className="text-[17px] ">
                Don't have an account?
                <Link
                  to="/signUp"
                  className="text-[#D97706] hover:text-[#FF6C6C] font-bold ms-1"
                >
                  Sign Up
                </Link>
              </label>
            </div>
          </div>
          <span className="block text-center pt-3 text-[#fff] text-[20px]">
            -sign with-
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
    </>
  );
};

export default Login;

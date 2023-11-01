import { Link } from "react-router-dom";
import Notification from "./reusableComponent/notification";
import { useState } from "react";
function Header(props) {
  const {
    role,
    seen,
    profileDropdown,
    setProfileDropdown,
    LogoutAdminHandler,
    notifications,
  } = props;
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  return (
    <div className="shadow px-[20px] flex justify-between items-center xl:px-[40px] py-[20px]  bg-white">
      <h3 className="text-[21px] font-semibold capitalize">{role}</h3>
      <div className="flex items-center gap-[30px]">
          <Notification
            notifications={notifications}
            profileDropdown={notificationDropDown}
            setNotificationDropDown={setNotificationDropDown}
            notificationDropDown={notificationDropDown}
            
          />
        <button
          onClick={() => {
            setProfileDropdown(!profileDropdown);
          }}
          className="relative min-w-[50px] bg-[#1F2937] p-2 rounded-[100%]"
        >
          <div className="flex items-center">
            <div className="w-[40px]">
              <img src="/assets/avatar-3.png" alt="AdminImage" />
            </div>
          </div>
          <div
            className="bg-white py-1 absolute shadow-lg w-[130px] left-[-50px] top-[60px] right-0 rounded-b-lg"
            style={profileDropdown ? { display: "block" } : { display: "none" }}
          >
            <ul>
              <Link
                to={"/admin-profile"}
                className="px-1 py-[5px] hover:text-[#660079] font-medium"
              >
                Profile
              </Link>
              <li className="border-t py-[5px] px-1 hover:text-[#660079] font-medium">
                Dashboard
              </li>
              <li
                className="border-t py-[5px] px-1 text-[#9b0202] font-medium"
                onClick={LogoutAdminHandler}
              >
                Logout
              </li>
            </ul>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Header;

import Sidebar from "../Sidebar";
import HeaderPage from "../../page/HeaderPage";

import UserProfilePage from "../../page/UserProfilePage";

function UserDashboard() {
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col md:pl-[240px]">
          <HeaderPage role={userRole} />
          <UserProfilePage />
        </div>
      </div>
    </>
  );
}

export default UserDashboard;

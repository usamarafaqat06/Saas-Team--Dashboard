import React, { useEffect, useState } from "react";
import { useGetAdminProfileQuery } from "../redux/apiCalls/apiSlice";
import Header from "../components/Header";
import { LogoutAdminHandler, AdminToken } from "../redux/utils/adminAuth";

function AdminHeader({ role }) {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const testToken = AdminToken();
  const { refetch: getAdminProfile } = useGetAdminProfileQuery(testToken);
  useEffect(() => {
    getAdminProfile();
  }, [getAdminProfile]);
  return (
    <>
      <Header
        testToken={testToken}
        role={role}
        setProfileDropdown={setProfileDropdown}
        profileDropdown={profileDropdown}
        LogoutAdminHandler={LogoutAdminHandler}
      />
    </>
  );
}

export default AdminHeader;

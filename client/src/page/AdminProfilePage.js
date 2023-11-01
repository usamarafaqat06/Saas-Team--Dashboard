import React, { useEffect } from "react";
import { useGetAdminProfileQuery } from "../redux/apiCalls/apiSlice";
import { AdminToken } from "../redux/utils/adminAuth";
import { AdminProfile } from "../components/user/AdminProfile";
function AdminProfilePage() {
  const testToken = AdminToken();
  const { data: adminProfile, refetch: getAdminProfile } = useGetAdminProfileQuery({ testToken });
  
  const getData = (item) => {
    const timestamp = item;
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  

  return (
    <AdminProfile
      profileData={adminProfile}
      getData={getData}
    />
  );
}

export default AdminProfilePage;

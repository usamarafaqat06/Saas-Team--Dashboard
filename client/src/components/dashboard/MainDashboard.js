import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import DashboardPage from "../../page/DashboardPage";
import { AdminToken } from "../../redux/utils/adminAuth";
import { useGetAdminProfileQuery } from "../../redux/apiCalls/apiSlice";
import Tabs from "./Tabs";
import AdminHeader from "../../page/AdminHeader";

function MainDashboard() {
  const testToken = AdminToken();
  const { data: adminProfile, refetch: getAdminProfile } =
    useGetAdminProfileQuery({ testToken });

  const adminRole = localStorage.getItem("adminRole");

  useEffect(() => {
    getAdminProfile({ testToken });
  }, [testToken]);

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col md:pl-[240px]">
          <AdminHeader role={adminRole} />
          <DashboardPage profile={adminProfile && adminProfile.name} />
          <div className="pb-[40px]">
            <Tabs />{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainDashboard;

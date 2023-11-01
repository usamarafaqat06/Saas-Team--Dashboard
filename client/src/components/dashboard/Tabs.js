import React, { useState } from "react";

import AllTaskPage from "../../page/AllTaskPage";
import UserTable from "../user/UserTable";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab-a");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className=" w-full">
      <ul
        className="w-[94.5%] 
    ] flex-row flex p-[40px] py-[20px] rounded  bg-[#f8f8f8] mx-[40px] gap-[20px]"
      >
        <li
          className={`cursor-pointer text-white tab-item h-[40px] bg-[#000] rounded font-semibold flex items-center px-[24px]`}
          style={
            activeTab === "tab-a"
              ? { background: "#70367c" }
              : { background: "#4A5568" }
          }
          onClick={() => handleTabClick("tab-a")}
        >
          Tasks
        </li>
        <li
          className={`cursor-pointer text-white tab-item h-[40px] bg-[#000] rounded font-semibold flex items-center px-[24px]`}
          style={
            activeTab === "tab-b"
              ? { background: "#70367c" }
              : { background: "#4A5568" }
          }
          onClick={() => handleTabClick("tab-b")}
        >
          Users
        </li>
      </ul>

      <div>
        {activeTab === "tab-a" && <AllTaskPage />}
        {activeTab === "tab-b" && <UserTable />}
      </div>
    </div>
  );
};

export default Tabs;

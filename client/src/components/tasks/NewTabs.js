import React, { useState } from 'react'
import SpecificTask from './SpecificTask';
import { SpecificUser } from './SpecificUser';

export const NewTabs = () => {
    const [activeTab, setActiveTab] = useState("tab-a");

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    }

    return (
        <div className=" w-full">
          <ul
            className="w-[94.5%] 
        ] flex-row flex p-[40px] py-[20px] rounded  bg-gray-800 mx-[40px] gap-[20px]"
          >
            <li
              className={`cursor-pointer text-white tab-item h-[40px] bg-[#000] rounded font-semibold flex items-center px-[24px]`}
              style={
                activeTab === "tab-a"
                  ? { background: "#274747" }
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
                  ? { background: "#274747" }
                  : { background: "#4A5568" }
              }
              onClick={() => handleTabClick("tab-b")}
            >
              Users
            </li>
          </ul>
    
          <div>
            {activeTab === "tab-a" && <SpecificTask />}
            {activeTab === "tab-b" && <SpecificUser />}
            {/* {activeTab === 'tab-c' && <ComponentC />} */}
          </div>
        </div>
      );
}

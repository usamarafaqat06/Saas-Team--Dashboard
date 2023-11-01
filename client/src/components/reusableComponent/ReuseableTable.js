import { faCircleXmark, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ToolTip } from "./Tooltip";

const ReuseableTable = () => {
  return (
    <>
      <div classNameName="mx-[40px] overflow-x-auto shadow-md sm:rounded-sm mt-[40px]">
        <table className="w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-gray-800 h-[55px] text-[15px] font-bold text-[#fff] text-center">
              return (<th scope="col" class="px-6 capitalize py-3"></th>
              );
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700  text-[18px] text-bold  hover:bg-[#edeaea]  text-center">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
              <td className="px-6 py-4">h</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                <span className="text-[12px] font-medium"></span>
              </td>

              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  flex gap-2 justify-center item-center text-center text-[20px]">
                <button>
                  {" "}
                  <ToolTip content="update">
                    {" "}
                    <FontAwesomeIcon
                      icon={faCog}
                      style={{ color: "#59b5f8" }}
                    />
                  </ToolTip>
                </button>
                <button>
                  {" "}
                  <ToolTip content="setting">
                    {" "}
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      style={{ color: "#972020" }}
                    />
                  </ToolTip>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReuseableTable;

import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserByRoleQuery,
} from "../../redux/apiCalls/apiSlice";
import { useParams } from "react-router-dom";
import { AdminToken } from "../../redux/utils/adminAuth";
import { faCircleXmark, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolTip } from "../reusableComponent/Tooltip";
import ConfirmationModal from "../reusableComponent/ComfirmationModel";
import Pagination from "../reusableComponent/Pagination";
import { io } from "socket.io-client";
import alertify from "alertifyjs";

export const SpecificUser = () => {
  const socket = io("http://localhost:8000");
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userid, setId] = useState("");
  const [deleteUser] = useDeleteUserMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const tableHeaderData = ["#", "Username", "Role", "Status", "createdAt", "Action"];
  const { roles } = useParams();
  const token = AdminToken();

  const { data: getUsers, refetch: getUserByRole } = useGetUserByRoleQuery({
    token,
    roles,
  });

  useEffect(() => {
    socket.on("fetch_user_status", (data) => {
      console.log("Renders Socket", data)
      if(data) {
        alertify.set("notifier", "position", "top-right");
        alertify.success(data.message);
      }
      getUserByRole();
    });
    return () => {
      socket.off(
        `fetch_user_status`
      );
    };
  }, [socket]);

  useEffect(() => {
    getUserByRole({ token, roles });
  }, [roles]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleDelete = async () => {
    const tokenTest = AdminToken();
    console.log(userid);
    try {
      await deleteUser({ _id: userid, tokenTest });
      getUserByRole();
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowModal(false);
  };

  const getData = (item) => {
    const timestamp = item;
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const getTime = (item) => {
    const timestamp = item;
    const dateObject = new Date(timestamp);

    const hours = String(dateObject.getUTCHours()).padStart(2, "0");
    const minutes = String(dateObject.getUTCMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  return (
    <div className="mx-[40px] overflow-x-auto shadow-md sm:rounded-sm mt-[40px]">
      <table className="w-full">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-gray-800 h-[55px] text-[15px] font-bold text-[#fff] text-center">
            {tableHeaderData.map((item) => {
              return (
                <th scope="col" class="px-6 capitalize py-3">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {getUsers &&
            getUsers.users.map((item, index) => (
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700  text-[18px] text-bold  hover:bg-[#edeaea]  text-center">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.userName}
                </td>
                <td class="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4">{item.is_online ? <div><img className="mx-auto" src="/assets/Online.png" alt="online" /></div> : <div><img className="mx-auto" src="/assets/offline.png" alt="offline" /></div>}</td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {getData(item.updatedAt)}{" "}
                  <span className="text-[12px] font-medium">
                    {getTime(item.updatedAt)}
                  </span>
                </td>

                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  flex gap-2 justify-center item-center text-center text-[20px]">
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
                  <button
                    onClick={(e) => {
                      setShowModal(true);
                      setId(item._id, index);
                    }}
                  >
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
            ))}
        </tbody>
      </table>
      {showModal && (
        <ConfirmationModal
          isOpen={showModal}
          onClose={handleCancelDelete}
          onDelete={handleDelete}
        />
      )}
      <div className="flex justify-end">
        <Pagination
          pageCount={totalCount}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

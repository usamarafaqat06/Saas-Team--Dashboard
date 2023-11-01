import React, { useEffect, useState } from "react";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/apiCalls/apiSlice";
import { AdminToken } from "../../redux/utils/adminAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationModal from "../reusableComponent/ComfirmationModel";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import Pagination from "../reusableComponent/Pagination";
import { ToolTip } from "../reusableComponent/Tooltip";
import UpdateModal from "../reusableComponent/UpdateModal";
import { io } from "socket.io-client";
import alertify from "alertifyjs";

const UserTable = () => {
  const socket = io("http://localhost:8000");
  // const [getAllUsers, { data }] = useGetAllUsersMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userid, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [editModal, setEditModal] = useState(false);

  const tokenTest = AdminToken();
  const { data, refetch: getAllUsersQuery } = useGetAllUsersQuery({
    currentPage,
    tokenTest,
  });
  const getAllUsersHandler = () => {
    if (data) {
      const count = Math.ceil(data.totalCount / 5);
      setTotalCount(count);
    }
  };

  const isUserQueryStarted = data !== undefined;

  useEffect(() => {
    socket.on("fetch_user_status", (data) => {
      if (isUserQueryStarted) {
        alertify.set("notifier", "position", "top-right");
        alertify.success(data.message);
        getAllUsersQuery();
      }
    });
    return () => {
      socket.off(
        `fetch_user_status`
      );
    };

  }, [socket]);

  useEffect(() => {
    getAllUsersQuery({ currentPage, tokenTest });
    getAllUsersHandler();
  }, [currentPage]);

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

  useEffect(() => {
    // getAllUsersHandler(currentPage);
  }, [currentPage]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleDelete = async () => {
    const tokenTest = AdminToken();
    try {
      await deleteUser({ _id: userid, tokenTest });
      setShowModal(false);
      // getAllUsersHandler(currentPage);
    } catch (err) {
      console.log(err);
    }
  };
  const closeEditModal = () => {
    setEditModal(false);
  };
  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowModal(false);
  };

  const [editTask, setEditTask] = useState({
    _id: "",
    userName: null,
    role: null,
  });
  const handleChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const tableHeaderData = ["#", "Username", "Role", "Status", "createdAt", "Action"];
  return (
    <>
      {data && data.users.length > 0 ? (
        <div className="mx-[40px] overflow-x-auto shadow-md sm:rounded-sm mt-[40px]">
          <table className="w-full">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-gray-800 h-[55px] text-[15px] font-bold text-[#fff] text-center">
                {tableHeaderData.map((item) => {
                  return (
                    <th scope="col" className="px-6 capitalize py-3">
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.users.map((item, index) => (
                  <tr className="bg-white border-b bg-white dark:border-gray-700  text-[18px] text-bold  hover:bg-[#edeaea]  text-center">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-gray">
                      {item.userName}
                    </td>
                    <td className="px-6 py-4">{item.role}</td>
                    <td className="px-6 py-4">{item.is_online ? <div><img className="mx-auto" src="/assets/Online.png" alt="online" /></div> : <div><img className="mx-auto" src="/assets/offline.png" alt="offline" /></div>}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {getData(item.updatedAt)}{" "}
                      <span className="text-[12px] font-medium">
                        {getTime(item.updatedAt)}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  flex gap-2 justify-center item-center text-center text-[20px]">
                      <button>
                        {" "}
                        <ToolTip content="Update">
                          {" "}
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "#59b5f8" }}
                            onClick={(e) => {
                              e.preventDefault();

                              setEditTask({
                                ...item,
                              });
                              setEditModal(true);
                            }}
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
                        <ToolTip content="Delete">
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
          {editModal && (
            <UpdateModal
              closeModal={closeEditModal}
              editTask={editTask}
              handleChange={handleChange}
              tokenTest={tokenTest}
              currentPage={currentPage}
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
      ) : (
        <div className="w-6/12 m-auto   mt-[80px]">
          <span className="text-[21px]">No Users Found</span>
        </div>
      )}
    </>
  );
};

export default UserTable;

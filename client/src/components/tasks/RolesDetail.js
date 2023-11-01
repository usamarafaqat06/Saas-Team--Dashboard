import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import {
  useDeleteUserMutation,
  useGetRolesQuery,
  useGetUserByRoleQuery,
} from "../../redux/apiCalls/apiSlice";
import { useParams } from "react-router-dom";
import { AdminToken } from "../../redux/utils/adminAuth";
import { ToolTip } from "../reusableComponent/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCog } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../reusableComponent/Pagination";
import ConfirmationModal from "../reusableComponent/ComfirmationModel";
import SpecificTask from "./SpecificTask";
import { SpecificUser } from "./SpecificUser";
import { NewTabs } from "./NewTabs";

const RolesDetail = () => {
  const [deleteUser] = useDeleteUserMutation();
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userid, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const tableHeaderData = ["#", "Username", "Role", "createdAt", "Action"];
  const { roles } = useParams();
  const token = AdminToken();
  const { data: getRoles, refetch: getTasksByRoles } = useGetRolesQuery({
    token,
    roles,
  });
  const { data: getUsers, refetch: getUserByRole } = useGetUserByRoleQuery({
    token,
    roles,
  });

  useEffect(() => {
    getTasksByRoles({ token, roles });
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
      // getAllUsersHandler(currentPage);
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
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col md:pl-[240px]">
          <Header />

          <div className="p-[20px]">
            <h3 className="text-[27px] pb-[14px] font-bold">
              Dashboard-project
              <br />
              {getRoles &&
                getRoles.getAllTasksByRole[0].assigned_to_role}
            </h3>
            <span className="inline-block text-[20px] font-bold">
              CreateAt : {getData(getRoles && getRoles.getAllTasksByRole[0].createdAt)}
            </span>
          </div>

          <div className=" flex p-[40px]  gap-[20px]">
            <div className="w-[179px] flex h-[130px] p-[10px] bg-[#F0F8FF] flex-col items-center justify-center rounded-[4px] text-center ">
              <div>
                <img
                  src="/assets/task.svg"
                  alt="AdminImage"
                  className="w-[55px] h-[80px] rounded-[80px]  mx-auto relative mt-[-50px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[20px] font-bold">
                  total task:
                </span>
                <span className="text-[20px] font-bold"> {getRoles && getRoles.getAllTasksByRole.length}</span>
              </div>
            </div>

            <div className="w-[100%] h-[130px] px-[20px] py-[15px] bg-[#F0F8FF] rounded-[4px] text-center ">
              <div >
                <div className=" w-[90px] h-[80%] rounded-[80px]  mx-auto relative mt-[-50px]">
                  <img
                    src="/assets/users.svg"
                    alt="AdminImage"
                    className="    w-[100%] "
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[20px] font-bold">
                    total user:
                  </span>
                  <span className="text-[20px] font-bold"> {getUsers && getUsers.users.length}</span>
                </div>
              </div>
            </div>
          </div>
          <NewTabs />
        </div>
      </div>
    </>
  );
};

export default RolesDetail;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CreateTaskPage from "../../page/CreateTaskPage";
import UserCreatePage from "../../page/UserCreatePage";

function Dashboard(props) {
  const {
    profile,
    formattedDateTime,
    openModal,
    formattedTime,
    openUserModal,
    taskRoles,
    toggleCard,
    deletetask,
    colors,
    deleteTaskHandler,
    isModalOpen,
    isUserModalOpen,
    closeModal,
    closeUserModal,
    testToken,
    percantageCountHandler,
    uniqueRolesWithTasks,
  } = props;

  return (
    <>
      <div className="w-full flex-row justify-between p-[40px]">
        <div className="flex justify-between wrap mb-[50px]">
          <div>
            <h2 className="text-[30px] font-bold text-[#3E1D47] capitalize">
              Hello, {profile}
            </h2>
            <span className="text-[#3E1D47] text-[20px]">
              Today is {formattedDateTime}
            </span>
            <span className="text-[#3E1D47] text-[20px] block">
              {formattedTime}
            </span>
          </div>

          {testToken && (
            <div className="flex items-start gap-[10px]">
              <button
                onClick={openModal}
                className="px-[40px] py-4 color bg-[#274747] hover:bg-[#4A5568] text-white rounded-md "
              >
                Add Task
              </button>
              <button
                onClick={openUserModal}
                className="px-[40px] py-4 color bg-[#4A5568] hover:bg-[#274747] text-white rounded-md "
              >
                Add User
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {uniqueRolesWithTasks &&
            uniqueRolesWithTasks.map((roleData, index) => (
              <div
                key={roleData.task._id}
                className={`w-1/3 ${
                  colors[index % colors.length]
                } rounded-lg p-[30px] ease-in-out duration-300 pb-[40px] hover:scale-[1.05] hover:shadow-[2px_3px_31px_4px_rgb(0,0,0,0.3)]`}
              >
                <Link to={`/rolesDetail/${roleData.task.assigned_to_role}`}>
                  <div className="flex items-center justify-between mb-1 ">
                    <div className=" bg-[#fff] mb-3 rounded-full">
                      <img
                        src="assets/avatar-4.png"
                        alt="not found"
                        className="w-[50px]"
                      />
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleCard(index);
                        }}
                      >
                        <FontAwesomeIcon
                          className=" text-[30px] text-[#fff] cursor-pointer "
                          icon={faEllipsisVertical}
                        />
                      </button>
                      <div
                        className={`${
                          deletetask[index]
                            ? "transition ease-in-out delay-150 block w-[80px] opacity-1  bg-white h-[30px] rounded-lg absolute top-[35px] right-0 flex"
                            : "height-[0px] transition ease-in-out delay-150 hidden"
                        }`}
                      >
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            deleteTaskHandler(roleData.task.assigned_to_role);
                          }}
                          className="flex  block  gap-2 w-full p-2 justify-center items-center
                cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-[11px]"
                          />
                          <span className="font-bold text-[15px]">Delete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-[30px] font-bold text-[#fff] mb-3 ">
                    {roleData.task.assigned_to_role}
                  </h3>
                  <div>
                    <span className="text-[#fff] mb-2 inline-block">
                      {taskRoles.getAllTasks.length} tasks -{" "}
                      {percantageCountHandler}% completed
                    </span>
                    <div className="w-full bg-[#9d9d9d] rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-[#fff] h-2.5 rounded-full"
                        style={{
                          width: `${percantageCountHandler}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      {isModalOpen && (
        <CreateTaskPage closeModal={closeModal} openModal={openModal} />
      )}

      {isUserModalOpen && (
        <UserCreatePage closeModal={closeUserModal} openModal={openUserModal} />
      )}
    </>
  );
}

export default Dashboard;

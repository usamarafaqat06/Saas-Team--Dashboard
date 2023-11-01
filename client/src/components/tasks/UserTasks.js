import React from "react";

function UserTasks({ taskRoles }) {
  return (
    <>
      <div className="flex flex-col w-[45%] ps-[40px] my-[40px] ">
        {taskRoles &&
          taskRoles.getAllTasks.map((item, index) => (
            <div
              className={`w-[100%] rounded-[10px] shadow-2xl border-l-[8px] hover:transition-all ${
                item.status ? "bg-[#000]" : "bg-[#FBFBFB]"
              } ${
                index % 2 === 0 ? "border-[#70367C]" : "border-[#000]"
              } flex justify-between items-center mb-[30px]`}
              key={index}
            >
              <div className="flex flex-col p-[30px]">
                <h3
                  className={`text-[30px] font-bold  ${
                    item.status ? "text-[#fff]" : "text-[#3E1D47]"
                  } capitalize `}
                >
                  {item.assigned_to_role}
                </h3>
                <span
                  className={`inline-block  mt-[20px]  capitalize font-bold  ${
                    item.status ? "text-[#fff]" : "text-[#70367C]"
                  } `}
                >
                  {item.task}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default UserTasks;

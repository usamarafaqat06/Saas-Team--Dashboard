import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import InputFields from "../login/InputFields";

import {
  faClipboardCheck,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import {
  useUpdateUserMutation,
  useGetAllUsersQuery,
} from "../../redux/apiCalls/apiSlice";

function UpdateModal(props) {
  const { closeModal, editTask, handleChange, tokenTest, currentPage } = props;
  const { _id, userName, role } = editTask;

  const [updateUser, { error: updateError }] = useUpdateUserMutation();
  const { refetch: getAllUsersQuery } = useGetAllUsersQuery({
    currentPage,
    tokenTest,
  });

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        _id: _id,
        userName: userName,
        role: role,
        tokenTest,
      });
      console.log(res, "res");
      if (res.data.status) {
        alertify.set("notifier", "position", "top-center");
        alertify.success(res.data.message);
      }
      if (!res.data.status) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(res.data.message);
      }
      getAllUsersQuery(currentPage, tokenTest);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (updateError) {
      alertify.set("notifier", "position", "top-center");
      alertify.error(updateError && updateError.data.message);
    }
  }, [updateError]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 ">
        <div className="bg-white p-6 rounded-lg shadow-md relative">
          <button
            className=" absolute right-[-10px] top-[-20px] text-dark uppercase font-semibold mt-4 py-2  hover:transition-all ms-3  px-6 rounded text-[30px]"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form
            className="className= md:w-[600px] p-[30px]   rounded  "
            onSubmit={updateHandler}
          >
            <InputFields
              iconname={faClipboardCheck}
              type="text"
              name="userName"
              value={editTask.userName}
              onChange={handleChange}
              placeholder={editTask.userName}
              className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none focus:border-0"
            />
            <InputFields
              iconname={faUserSecret}
              type="text"
              name="role"
              value={editTask.role}
              onChange={handleChange}
              placeholder={editTask.role}
              className="border  border-[#86a4c3]  w-[100%] p-3 border-l-0 rounded rounded-l-none outline-none  focus:border-0"
            />
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className=" hover:bg-gray-800 text-white uppercase font-semibold mt-4 py-2 bg-[#000] hover:transition-all  px-6 rounded"
              >
                Update Task
              </button>
              <button
                className="hover:bg-gray-800  text-white uppercase font-semibold mt-4  bg-teal-500 hover:transition-all ms-3  px-6 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateModal;

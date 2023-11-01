import React, { useState, useEffect } from "react";
import { AdminToken } from "../redux/utils/adminAuth";
import {
  useGetAllUsersQuery,
  useCreateTaskMutation,
} from "../redux/apiCalls/apiSlice";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import CreateTask from "../components/tasks/CreateTask";

function CreateTaskPage({ closeModal }) {
  const tokenTest = AdminToken();
  const currentPage = 1;
  const { data, refetch: getAllUsers } = useGetAllUsersQuery({
    currentPage,
    tokenTest,
  });
  const socket = io("http://localhost:8000");

  const [isCustomValue, setIsCustomValue] = useState(false);
  const navigate = useNavigate();
  const [task, setTask] = useState({
    task: "",
    assigned_to_role: "",
    assigned_to: " ",
  });

  // useEffect(() => {
  //   getAllUsers({ currentPage, tokenTest });
  // }, []);
  const [createTask] = useCreateTaskMutation();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value.toUpperCase() });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await createTask({ task, tokenTest });
      socket.emit("new_Task_Update", {
        message: "New Task available",
        task: task,
        status: true,
        assigned_to: task.assigned_to,
      });
      closeModal();
      if (response) {
        navigate("/mainDashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CreateTask
      submitHandler={submitHandler}
      closeModal={closeModal}
      handleChange={handleChange}
      isCustomValue={isCustomValue}
      setIsCustomValue={setIsCustomValue}
      task={task}
      setTask={setTask}
      data={data}
    />
  );
}

export default CreateTaskPage;

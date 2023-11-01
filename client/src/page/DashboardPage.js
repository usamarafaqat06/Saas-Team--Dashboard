import dateFormat from "dateformat";
import { useEffect, useState } from "react";

import {
  useDeleteProjectMutation,
  useGetAdminProfileQuery,
  useGetAllTasksQuery,
} from "../redux/apiCalls/apiSlice";
import { AdminToken } from "../redux/utils/adminAuth";
import Dashboard from "../components/dashboard/Dashboard";

function DashboardPage() {
  const testToken = AdminToken();
  const { data: profile } = useGetAdminProfileQuery({
    testToken,
  });
  const { data: taskRoles, refetch: getTaskRoles } =
    useGetAllTasksQuery(testToken);
  const [deleteTask] = useDeleteProjectMutation();

  const [dateTime, setDateTime] = useState();
  const [day] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [deletetask, setDeletetask] = useState(
    new Array(taskRoles && taskRoles.getAllTasks.length).fill(false)
  );

  const deleteTaskHandler = async (id) => {
    try {
      await deleteTask({ assigned_to_role: id, testToken });
      fetchRoles();
      await getTaskRoles();
      setDeletetask(!deleteTask);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoles = async () => {
    await getTaskRoles();
  };

  const toggleCard = (index) => {
    const updatedIndex = new Array(taskRoles.getAllTasks.length).fill(false);
    updatedIndex[index] = !deletetask[index];
    setDeletetask(updatedIndex);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetchRoles();
  }, []);

  const getUniqueRolesWithTasks = (tasks) => {
    return (
      tasks &&
      [...new Set(tasks.map((item) => item.assigned_to_role))].map((role) => {
        const taskWithRole = tasks.find(
          (item) => item.assigned_to_role === role
        );
        return { role, task: taskWithRole };
      })
    );
  };
  const uniqueRolesWithTasks = getUniqueRolesWithTasks(
    taskRoles && taskRoles.getAllTasks
  );

  const percantageCountHandler = (role) => {
    console.log(role, "role");
    const tasks = taskRoles && taskRoles.getAllTasks;
    const selectedTasks = tasks.filter((item) => {
      return item.assigned_to_role === role;
    });
    const Donetasks = selectedTasks.filter((item) => {
      return item.status === true;
    });
    const percantage = (selectedTasks.length / tasks.length) * 100;
    return Math.ceil(percantage);
  };

  const colors = ["bg-[#70367c]", "bg-[#95cfd5]", "bg-[#fd7e50]"];
  const formattedTime = dateFormat(day, "h:MM:ss TT");
  const formattedDateTime = dateFormat(dateTime, "dddd, mmmm dS, yyyy");
  return (
    <>
      <Dashboard
        profile={profile && profile.data.name}
        colors={colors}
        formattedTime={formattedTime}
        formattedDateTime={formattedDateTime}
        taskRoles={taskRoles}
        isModalOpen={isModalOpen}
        isUserModalOpen={isUserModalOpen}
        closeModal={closeModal}
        openModal={openModal}
        uniqueRolesWithTasks={uniqueRolesWithTasks}
        openUserModal={openUserModal}
        closeUserModal={closeUserModal}
        toggleCard={toggleCard}
        deleteTaskHandler={deleteTaskHandler}
        deletetask={deletetask}
        percantageCountHandler={percantageCountHandler}
        testToken={testToken}
      />
    </>
  );
}

export default DashboardPage;

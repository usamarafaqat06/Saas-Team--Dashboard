import React from "react";
import { AdminToken } from "../redux/utils/adminAuth";
import {
  useGetAllTasksQuery,
  useUpdateTaskMutation,
} from "../redux/apiCalls/apiSlice";
import AllTasks from "../components/tasks/AllTasks";
function AllTaskPage() {
  const testToken = AdminToken();
  const { data: taskRoles, refetch: getTaskRoles } =
    useGetAllTasksQuery(testToken);
  const [updateTask] = useUpdateTaskMutation();

  const updateTaskHandler = async (id) => {
    try {
      await updateTask({ task_id: id, testToken });
      getTaskRoles();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AllTasks updateTaskHandler={updateTaskHandler} taskRoles={taskRoles} />
  );
}

export default AllTaskPage;

import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { UserToken } from "../redux/utils/adminAuth";
import {
  useGetUserProfileQuery,
  useGetUserByTaskQuery,
  useUpdateUserTaskMutation,
} from "../redux/apiCalls/apiSlice";
import Dashboard from "../components/dashboard/Dashboard";
import AllTasks from "../components/tasks/AllTasks";
function UserProfilePage() {
  const [dateTime, setDateTime] = useState();
  const [day, setDay] = useState("");

  const testToken = UserToken();
  const { data: userProfile, refetch: getUserProfile } =
    useGetUserProfileQuery(testToken);

  const { data: myTasks } = useGetUserByTaskQuery(testToken);

  useEffect(() => {
    getUserProfile();
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [updateUserTask] = useUpdateUserTaskMutation();

  const updateTaskHandler = async (id) => {
    try {
      await updateUserTask({ task_id: id, testToken });
    } catch (error) {
      console.log(error);
    }
  };

  const formattedTime = dateFormat(day, "h:MM:ss TT");
  const formattedDateTime = dateFormat(dateTime, "dddd, mmmm dS, yyyy");
  return (
    <>
      <Dashboard
        profile={userProfile && userProfile.user.userName}
        formattedTime={formattedTime}
        formattedDateTime={formattedDateTime}
      />
      <AllTasks taskRoles={myTasks} updateTaskHandler={updateTaskHandler} />
    </>
  );
}

export default UserProfilePage;

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {  UserToken } from "../../redux/utils/adminAuth";

const UserProtectedRoute = () => {

const navigate = useNavigate();
  const userToken = UserToken();

  useEffect(() => {
    console.log(userToken, "userToken")
    if (userToken === null) {
      navigate("/", { replace: true });
    }
  }, [userToken]);

  return <Outlet />;
  
}

export default UserProtectedRoute

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminToken } from "../../redux/utils/adminAuth";

function AdminProtectedRoute() {
  const navigate = useNavigate();
  const adminToken = AdminToken();

  useEffect(() => {
    if (adminToken  === null) {
      navigate("/", { replace: true });
    }
  }, [adminToken]);

  return <Outlet />;
}

export default AdminProtectedRoute;

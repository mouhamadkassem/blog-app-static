import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectRoutes = ({ children }) => {
  const user = useSelector((state) => state?.users?.userAuth);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default AdminProtectRoutes;

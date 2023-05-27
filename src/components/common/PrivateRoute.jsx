import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import ApplicationProvider from "../../context/ApplicationProvider";

const PrivateRoute = () => {
  const auth = localStorage.getItem("token");
  return auth ? (
    <ApplicationProvider>
      <Outlet />
    </ApplicationProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

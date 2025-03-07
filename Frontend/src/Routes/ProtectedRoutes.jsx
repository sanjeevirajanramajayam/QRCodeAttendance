import React from "react";
import NotAuth from "../components/NotAuth/NotAuth";

function ProtectedRoutes({ children, allowedRole }) {
  const role = localStorage.getItem("role");
  if (role == allowedRole) {
    return children;
  } else {
    return <NotAuth />;
  }
}

export default ProtectedRoutes;

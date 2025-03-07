import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MainPage from "../components/MainPage/MainPage";
import StudentHome from "../components/Student/Pages/Home/StudentHome";
import AdminHome from "../components/Admin/Pages/Home/AdminHome";
import ProtectedRoutes from "./ProtectedRoutes";
function AppRoute() {
  return (
    <Routes>
      {/* <Route path="/student" element={<StudentHome />} /> */}
      <Route path="/" element={<Login />} />
      <Route
        path="/studenthome"
        element={
          <ProtectedRoutes allowedRole="user">
            <StudentHome />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoutes allowedRole="admin">
            <AdminHome />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default AppRoute;

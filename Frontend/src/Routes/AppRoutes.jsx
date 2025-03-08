import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MainPage from "../components/MainPage/MainPage";
import StudentHome from "../components/Student/Pages/Home/StudentHome";
import AdminHome from "../components/Admin/Pages/Home/AdminHome";
import ProtectedRoutes from "./ProtectedRoutes";
import StudentAttendence from "../components/Student/Pages/Attendence/StudentAttendence";
function AppRoute() {
  return (
    <Routes>
      {/* <Route path="/student" element={<StudentHome />} /> */}
      <Route path="/" element={<Login />} />
      <Route
        path="/student-home"
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
      <Route
        path="/student-attendence"
        element={
          <ProtectedRoutes allowedRole="user">
            <StudentAttendence />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default AppRoute;

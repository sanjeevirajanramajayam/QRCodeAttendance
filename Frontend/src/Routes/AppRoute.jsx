import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MainPage from "../components/MainPage/MainPage";
import StudentHome from "../components/Student/Pages/Home/StudentHome";
function AppRoute() {
  return (
    <Routes>
      {/* <Route path="/student" element={<StudentHome />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/studenthome" element={<StudentHome/>}/> 
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default AppRoute;

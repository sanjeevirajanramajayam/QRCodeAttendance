import React, { useState } from "react";
import AppRoute from "./Routes/AppRoute";
import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <AppRoute />
    </>
  );
}

export default App;

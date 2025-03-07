import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from '../pages/Login'
import MainPage from '../components/MainPage/MainPage'
function AppRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<MainPage/>} />
    </Routes>
  )
}

export default AppRoute
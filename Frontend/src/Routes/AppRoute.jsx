import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from '../pages/Login'
function AppRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
    </Routes>
  )
}

export default AppRoute
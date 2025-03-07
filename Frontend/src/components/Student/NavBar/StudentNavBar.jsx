import React from 'react'
import './StudentNavBar.css'
function StudentNavBar() {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="title">Student Portal</h1>
        <div className="nav-links">
          <a href="/home" className="nav-link">Home</a>
          <button className="logout-button">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default StudentNavBar
import React from 'react'
import { Link, Outlet } from "react-router-dom";
import "./LayoutComp.css"
const LayoutComp = () => {
  return (
    <div>

 
      <nav  className="navbar">
       <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/users" className="nav-link">Users</Link>
          <Link to="/add" className="nav-link">Add User</Link>
        </div>
      </nav>

   
      <main  className="content">
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutComp
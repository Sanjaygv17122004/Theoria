import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiHome, FiTarget, FiBarChart2, FiSettings, FiUser, FiMenu } from "react-icons/fi";
import "./Home.css";

const Home = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Top Navbar */}
      <header className="topbar">
        <h1 className="topbar-title" style={{ textAlign: 'center', width: '100%' }}>Theoria</h1>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Primary">
        <nav>
          <ul>
            <li>
              <Link to="dashboard" className={location.pathname.includes("dashboard") ? "active" : ""} onClick={() => setOpen(false)}>
                <FiHome />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="detection" className={location.pathname.includes("detection") ? "active" : ""} onClick={() => setOpen(false)}>
                <FiTarget />
                <span>Detection</span>
              </Link>
            </li>
            <li>
              <Link to="results" className={location.pathname.includes("results") ? "active" : ""} onClick={() => setOpen(false)}>
                <FiBarChart2 />
                <span>Results</span>
              </Link>
            </li>
            <li>
              <Link to="settings" className={location.pathname.includes("settings") ? "active" : ""} onClick={() => setOpen(false)}>
                <FiSettings />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="profile" className={location.pathname.includes("profile") ? "active" : ""} onClick={() => setOpen(false)}>
                <FiUser />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content" onClick={() => open && setOpen(false)}>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;

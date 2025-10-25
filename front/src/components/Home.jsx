import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const location = useLocation();

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">Theoria</h1>
        <nav>
          <ul>
            <li>
              <Link
                to="dashboard"
                className={location.pathname.includes("dashboard") ? "active" : ""}
              >
                 Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="detection"
                className={location.pathname.includes("detection") ? "active" : ""}
              >
                Detection
              </Link>
            </li>
            <li>
              <Link
                to="results"
                className={location.pathname.includes("results") ? "active" : ""}
              >
                Results
              </Link>
            </li>
            <li>
              <Link
                to="settings"
                className={location.pathname.includes("settings") ? "active" : ""}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="profile"
                className={location.pathname.includes("profile") ? "active" : ""}
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;

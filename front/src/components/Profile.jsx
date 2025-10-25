import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  // Dummy user info
  const [user, setUser] = useState({
    name: "Sanjay G V",
    email: "sanjaygv@example.com",
    totalSentences: 24,
    detectionAccuracy: "92%",
  });

  // Theme toggle state
  const [darkTheme, setDarkTheme] = useState(true);

  const handleThemeToggle = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className="profile-bg">
      <h2>Profile</h2>

      {/* Profile Picture & Name */}
      <div className="profile-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="profile-pic"
        />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>

      {/* Personal Info Card */}
      <div className="profile-card">
        <h3>Personal Info</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Activity Summary Card */}
      <div className="profile-card">
        <h3>Activity Summary</h3>
        <p><strong>Total Sentences Analyzed:</strong> {user.totalSentences}</p>
        <p><strong>Detection Accuracy:</strong> {user.detectionAccuracy}</p>
      </div>

      {/* Theme Toggle Card */}
      <div className="profile-card">
        <h3>Theme</h3>
        <button className="theme-btn" onClick={handleThemeToggle}>
          {darkTheme ? "Dark Theme" : "Light Theme"}
        </button>
      </div>
    </div>
  );
};

export default Profile;

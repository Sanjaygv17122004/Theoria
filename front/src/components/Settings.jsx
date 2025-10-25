import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
  });

  const handleThemeToggle = () => {
    setDarkTheme(!darkTheme);
  };

  const handleNotificationToggle = (type) => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
  };

  return (
    <div className="settings-bg">
      <h2>Settings</h2>

      {/* Change Password */}
      <div className="settings-card">
        <h3>Change Password</h3>
        <input type="password" placeholder="Old Password" />
        <input type="password" placeholder="New Password" />
        <input type="password" placeholder="Confirm New Password" />
        <button className="save-btn">Update Password</button>
      </div>

      {/* Notifications */}
      <div className="settings-card">
        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={() => handleNotificationToggle("email")}
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            checked={notifications.inApp}
            onChange={() => handleNotificationToggle("inApp")}
          />
          In-App Notifications
        </label>
      </div>

      {/* Theme */}
      <div className="settings-card">
        <h3>Theme</h3>
        <button className="theme-btn" onClick={handleThemeToggle}>
          {darkTheme ? "Dark Theme" : "Light Theme"}
        </button>
      </div>

      {/* Privacy / Account */}
      <div className="settings-card">
        <h3>Privacy & Account</h3>
        <button className="danger-btn">Deactivate Account</button>
      </div>
    </div>
  );
};

export default Settings;

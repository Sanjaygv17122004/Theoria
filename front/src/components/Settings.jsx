import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiUser, FiUpload, FiLock, FiBell, FiMoon, FiSun, FiAlertTriangle } from "react-icons/fi";
import "./Settings.css";

const STORAGE_KEYS = {
  profile: "theoria.profile",
  notifications: "theoria.settings.notifications",
  theme: "theoria.settings.theme",
};

const defaultProfile = {
  displayName: "Theoria User",
  email: "user@theoria.com",
  avatar: "",
};

const Settings = () => {
  // Profile
  const [profile, setProfile] = useState(defaultProfile);
  const fileInputRef = useRef(null);

  // Security
  const [currPwd, setCurrPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [secMessage, setSecMessage] = useState("");
  const [secError, setSecError] = useState("");

  // Notifications
  const [notifications, setNotifications] = useState({ email: true, inApp: true, weekly: false });
  const [notifMessage, setNotifMessage] = useState("");

  // Appearance
  const [theme, setTheme] = useState("dark"); // 'dark' | 'light'
  const [themeMessage, setThemeMessage] = useState("");

  // Load persisted settings
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || "null");
      if (p) setProfile(p);
      const n = JSON.parse(localStorage.getItem(STORAGE_KEYS.notifications) || "null");
      if (n) setNotifications({ email: !!n.email, inApp: !!n.inApp, weekly: !!n.weekly });
      const t = localStorage.getItem(STORAGE_KEYS.theme);
      if (t === "dark" || t === "light") setTheme(t);
    } catch {}
  }, []);

  // Password strength
  const pwdStrength = useMemo(() => {
    let score = 0;
    if (newPwd.length >= 8) score++;
    if (/[A-Z]/.test(newPwd)) score++;
    if (/[a-z]/.test(newPwd)) score++;
    if (/[0-9]/.test(newPwd)) score++;
    if (/[^A-Za-z0-9]/.test(newPwd)) score++;
    return score; // 0-5
  }, [newPwd]);

  // Handlers
  const handleAvatarClick = () => fileInputRef.current?.click();
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile(prev => ({ ...prev, avatar: url }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
  };

  const handleSecurityUpdate = (e) => {
    e.preventDefault();
    setSecMessage("");
    setSecError("");
    if (!currPwd || !newPwd || !confirmPwd) {
      setSecError("Please fill all fields.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setSecError("New passwords do not match.");
      return;
    }
    if (pwdStrength < 3) {
      setSecError("Password is too weak. Use at least 8 chars with upper/lower, number, and symbol.");
      return;
    }
    // Mock success
    setSecMessage("Password updated successfully.");
    setCurrPwd("");
    setNewPwd("");
    setConfirmPwd("");
  };

  const handleNotificationsSave = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications));
    setNotifMessage("Notification preferences saved.");
    setTimeout(() => setNotifMessage(""), 1800);
  };

  const toggleNotification = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  const handleThemeToggle = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));
  const handleThemeSave = () => {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    setThemeMessage("Theme preference saved.");
    setTimeout(() => setThemeMessage(""), 1800);
  };

  const handleDeactivate = () => {
    const ok = window.confirm("Are you sure you want to deactivate your account? This cannot be undone.");
    if (ok) alert("Deactivation requested (mock). Contact support to proceed.");
  };

  return (
    <section className="settings">
      <div className="set-header">
        <h2>Settings</h2>
        <p className="muted">Manage your profile, security, and app preferences</p>
      </div>

      <div className="set-grid">
        {/* Profile */}
        <form className="set-card" onSubmit={handleProfileSave}>
          <div className="card-head"><FiUser /> <h3>Profile</h3></div>
          <div className="avatar-row">
            <div className="avatar" onClick={handleAvatarClick} title="Change avatar">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" />
              ) : (
                <span>{profile.displayName?.[0] || "U"}</span>
              )}
            </div>
            <input ref={fileInputRef} onChange={handleAvatarChange} type="file" accept="image/*" hidden />
            <button type="button" className="btn ghost" onClick={handleAvatarClick}><FiUpload /> Upload</button>
          </div>
          <label className="field">
            <span>Display name</span>
            <input value={profile.displayName} onChange={e => setProfile({ ...profile, displayName: e.target.value })} />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
          </label>
          <div className="actions">
            <button type="submit" className="btn primary">Save Profile</button>
          </div>
        </form>

        {/* Security */}
        <form className="set-card" onSubmit={handleSecurityUpdate}>
          <div className="card-head"><FiLock /> <h3>Security</h3></div>
          {secError && <div className="alert error" role="alert">{secError}</div>}
          {secMessage && <div className="alert success" role="status">{secMessage}</div>}
          <label className="field"><span>Current password</span><input type="password" value={currPwd} onChange={e => setCurrPwd(e.target.value)} /></label>
          <label className="field"><span>New password</span><input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} /></label>

          <div className="strength">
            <div className={`bar ${pwdStrength >= 1 ? "on" : ""}`} />
            <div className={`bar ${pwdStrength >= 2 ? "on" : ""}`} />
            <div className={`bar ${pwdStrength >= 3 ? "on" : ""}`} />
            <div className={`bar ${pwdStrength >= 4 ? "on" : ""}`} />
            <div className={`bar ${pwdStrength >= 5 ? "on" : ""}`} />
          </div>

          <label className="field"><span>Confirm new password</span><input type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} /></label>
          <div className="actions">
            <button type="submit" className="btn primary">Update Password</button>
          </div>
        </form>

        {/* Notifications */}
        <form className="set-card" onSubmit={handleNotificationsSave}>
          <div className="card-head"><FiBell /> <h3>Notifications</h3></div>
          {notifMessage && <div className="alert success" role="status">{notifMessage}</div>}
          <label className="toggle">
            <input type="checkbox" checked={notifications.email} onChange={() => toggleNotification("email")} />
            <span className="track"><span className="thumb" /></span>
            <span className="label">Email notifications</span>
          </label>
          <label className="toggle">
            <input type="checkbox" checked={notifications.inApp} onChange={() => toggleNotification("inApp")} />
            <span className="track"><span className="thumb" /></span>
            <span className="label">In-app notifications</span>
          </label>
          <label className="toggle">
            <input type="checkbox" checked={notifications.weekly} onChange={() => toggleNotification("weekly")} />
            <span className="track"><span className="thumb" /></span>
            <span className="label">Weekly summary</span>
          </label>
          <div className="actions">
            <button type="submit" className="btn primary">Save Preferences</button>
          </div>
        </form>

        {/* Appearance */}
        <div className="set-card">
          <div className="card-head"><FiMoon /> <h3>Appearance</h3></div>
          {themeMessage && <div className="alert success" role="status">{themeMessage}</div>}
          <div className="theme-picker">
            <button className={`chip ${theme === "dark" ? "active" : ""}`} onClick={() => setTheme("dark")}><FiMoon /> Dark</button>
            <button className={`chip ${theme === "light" ? "active" : ""}`} onClick={() => setTheme("light")}><FiSun /> Light</button>
          </div>
          <div className="theme-preview">
            <div className={`swatch ${theme}`} />
            <p className="muted">Theme preference is saved for your account.</p>
          </div>
          <div className="actions">
            <button className="btn primary" onClick={handleThemeSave}>Save Theme</button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="set-card danger">
          <div className="card-head"><FiAlertTriangle /> <h3>Danger Zone</h3></div>
          <p className="muted">Deactivate your account. This will disable access until reactivated by support.</p>
          <div className="actions">
            <button className="btn danger" onClick={handleDeactivate}>Deactivate Account</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;

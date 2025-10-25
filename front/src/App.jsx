import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Home from "./components/Home";       // Sidebar + layout
import Dashboard from "./components/Dashboard";
import Detection from "./components/Detection";
import Results from "./components/Results";
import Profile from "./components/Profile"; 
import Settings from "./components/Settings";
import About from "./components/About"; // <-- import About page

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} /> {/* <-- About page route */}

        {/* Main app with sidebar */}
        <Route path="/home" element={<Home />}>
          {/* Redirect /home to /home/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="detection" element={<Detection />} />
          <Route path="results" element={<Results />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

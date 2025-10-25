import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Default user credentials
  const defaultUser = {
    email: "user@theoria.com",
    password: "123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === defaultUser.email && password === defaultUser.password) {
      // Successful login, redirect to home dashboard
      navigate("/home/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="landing-bg">
      {/* Navbar */}
      <nav className="landing-navbar">
        <Link to="/" className="navbar-logo">Theoria</Link>
        <div className="navbar-links">
          <Link to="/about">About</Link>
          <FaUserCircle 
            size={28} 
            style={{ marginLeft: '1.5rem', cursor: 'pointer' }} 
            title="Profile"
          />
        </div>
      </nav>

      {/* Content */}
      <div className="landing-content">
        {/* Left Section */}
        <div className="landing-left">
          <h1>Theoria</h1>
          <p>
            Theoria is a web app that detects bias in text, analyzes results, and
            provides insights and suggestions. Explore our dashboard to get started.
          </p>
        </div>

        {/* Right Section: Login Form */}
        <div className="landing-right">
          <form className="landing-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;

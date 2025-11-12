import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // Default user credentials
  const defaultUser = {
    email: "user@theoria.com",
    password: "123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // basic email format check
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      setError("Please enter a valid email address");
      return;
    }

    if (email === defaultUser.email && password === defaultUser.password) {
      // Successful login, redirect to home dashboard
      // Optionally persist a demo session for remember me
      if (remember) {
        try {
          localStorage.setItem("theoria-demo-email", email);
        } catch {}
      }
      navigate("/home/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="landing-bg" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Navbar */}
        <nav className="landing-navbar">
          <Link to="/" className="navbar-logo" style={{ fontSize: '32px', fontWeight: '600' }}>Theoria</Link>
          <div className="navbar-links">
           
           
          </div>
        </nav>

        {/* Content */}
      <div className="landing-content">
        <div className="auth-wrap">
          <div className="auth-card">
            {/* Left welcome / promo panel mimic design */}
            <div className="welcome-panel">
              <div className="welcome-inner">
                <div className="brand-dot" aria-hidden="true"></div>
                <h1 style={{margin:'0 0 .75rem', fontWeight: '600'}}>Hello, welcome!</h1>
                <p style={{maxWidth:'50ch', lineHeight:1.55}}>
                  Theoria detects bias in text, analyzes patterns, and suggests improvements.
                  Navigate insights with clarity.
                </p>
                <Link to="/about" className="welcome-cta">View more</Link>
              </div>
            </div>
            {/* Right form panel */}
            <div className="form-panel">
              <form className="landing-form" onSubmit={handleLogin} noValidate>
                <h2 style={{ fontWeight: '600' }}>Login</h2>

                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrap">
                    <input
                      id="email"
                      type="email"
                      placeholder="you@theoria.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      aria-describedby={error ? "form-error" : undefined}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrap">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      aria-describedby={error ? "form-error" : undefined}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-actions">
                  <label className="remember-wrap">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                </div>

                <button type="submit" disabled={!email || !password}>Login</button>

                {error && (
                  <p id="form-error" className="form-error" role="alert">{error}</p>
                )}

                <p className="signup-note">
                  Not a member yet? <Link to="/signup">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

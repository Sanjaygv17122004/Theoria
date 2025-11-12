import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordStrength = (() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0-5
  })();

  const strengthLabel = ["Weak", "Weak", "Fair", "Good", "Strong", "Strong"][passwordStrength];
  const strengthPercent = (passwordStrength / 5) * 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) {
      setError("Fill all fields");
      return;
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!agree) {
      setError("You must accept terms to continue");
      return;
    }
    // Mock signup success
    setSuccess(true);
    setTimeout(() => navigate("/"), 1800);
  };

  return (
    <div className="signup-bg">
      <nav className="signup-navbar">
        <button className="signup-back" onClick={() => navigate(-1)} aria-label="Go back">
          <FiArrowLeft size={18} /> <span>Back</span>
        </button>
        <Link to="/" className="signup-logo">Theoria</Link>
        <div className="signup-nav-spacer" />
      </nav>
      <div className="signup-content">
        <div className="signup-wrap">
          <div className="signup-card">
            <div className="signup-left-pane">
              <div className="signup-pane-inner">
                <h1>Create Account</h1>
                <p>Join Theoria and start analyzing text for bias with powerful insights and improvement suggestions.</p>
                <ul className="signup-bullets">
                  <li>Track detection history</li>
                  <li>View detailed bias reasons</li>
                  <li>Get improvement suggestions</li>
                </ul>
              </div>
            </div>
            <div className="signup-form-pane">
              {success ? (
                <div className="signup-success" role="alert">
                  <h2>Success!</h2>
                  <p>Account created. Redirecting to login…</p>
                </div>
              ) : (
                <form className="signup-form" onSubmit={handleSubmit} noValidate>
                  <h2>Sign up</h2>
                  <div className="signup-row">
                    <label htmlFor="su-name">Name</label>
                    <div className="signup-input-wrap">
                      <FiUser className="signup-icon" size={18} />
                      <input id="su-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
                    </div>
                  </div>
                  <div className="signup-row">
                    <label htmlFor="su-email">Email</label>
                    <div className="signup-input-wrap">
                      <FiMail className="signup-icon" size={18} />
                      <input id="su-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@theoria.com" autoComplete="email" />
                    </div>
                  </div>
                  <div className="signup-row">
                    <label htmlFor="su-pass">Password</label>
                    <div className="signup-input-wrap">
                      <FiLock className="signup-icon" size={18} />
                      <input id="su-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
                    </div>
                    {password && (
                      <div className="signup-strength" aria-live="polite">
                        <div className="signup-bar"><span style={{ width: strengthPercent + '%' }} /></div>
                        <small>{strengthLabel}</small>
                      </div>
                    )}
                  </div>
                  <div className="signup-row">
                    <label htmlFor="su-confirm">Confirm password</label>
                    <div className="signup-input-wrap">
                      <input id="su-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password" autoComplete="new-password" />
                    </div>
                  </div>
                  <label className="signup-terms">
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <span>I agree to the <Link to="#">Terms</Link> &amp; <Link to="#">Privacy Policy</Link></span>
                  </label>
                  {error && <p className="signup-error" role="alert">{error}</p>}
                  <button type="submit" disabled={!name || !email || !password || !confirm}>Create account</button>
                  <p className="signup-note">Already registered? <Link to="/">Login</Link></p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';
import './ForgotPassword.css';

/*
  ForgotPassword Flow (client-only mock):
  Step 1: User enters email -> we "send" a code (mock) and advance.
  Step 2: User enters code + new password + confirm -> validate and show success.
*/

const MOCK_CODE = '123456';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleRequest = (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email');
      return;
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      setError('Enter a valid email address');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep(2); // proceed to code entry
    }, 900); // simulate delay
  };

  const handleReset = (e) => {
    e.preventDefault();
    setError('');
    if (!code || !password || !confirm) {
      setError('Fill all fields');
      return;
    }
    if (code !== MOCK_CODE) {
      setError('Invalid code');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate('/'), 1500); // redirect after brief success
  };

  return (
    <div className="fp-bg">
      <nav className="fp-navbar">
        <button className="fp-back" onClick={() => navigate(-1)} aria-label="Go back">
          <FiArrowLeft size={18} />
          <span>Back</span>
        </button>
        <Link to="/" className="fp-logo">Theoria</Link>
        <div className="fp-nav-spacer" />
      </nav>

      <div className="fp-content">
        <div className="fp-wrap">
          <div className="fp-card">
            <div className="fp-left-pane">
              <div className="fp-pane-inner">
                <h1>Password Reset</h1>
                <p>
                  Forgot your password? No worries. Follow the steps to securely reset it and get back to analyzing text.
                </p>
                <ul className="fp-bullets" aria-label="Process overview">
                  <li>Enter your registered email</li>
                  <li>Use demo code <code>{MOCK_CODE}</code> to verify</li>
                  <li>Set a new password</li>
                </ul>
              </div>
            </div>
            <div className="fp-form-pane">
              {success ? (
                <div className="fp-success" role="alert">
                  <h2>Success!</h2>
                  <p>Your password has been reset. Redirecting...</p>
                </div>
              ) : (
                <form className="fp-form" onSubmit={step === 1 ? handleRequest : handleReset} noValidate>
                  <h2>{step === 1 ? 'Request reset' : 'Confirm reset'}</h2>

                  {step === 1 && (
                    <div className="fp-row">
                      <label htmlFor="fp-email">Email</label>
                      <div className="fp-input-wrap">
                        <FiMail className="fp-icon" size={18} />
                        <input
                          id="fp-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@theoria.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <>
                      <div className="fp-row">
                        <label htmlFor="fp-code">Verification code</label>
                        <div className="fp-input-wrap">
                          <input
                            id="fp-code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter code"
                            autoComplete="one-time-code"
                          />
                        </div>
                      </div>
                      <div className="fp-row">
                        <label htmlFor="fp-pass">New password</label>
                        <div className="fp-input-wrap">
                          <FiLock className="fp-icon" size={18} />
                          <input
                            id="fp-pass"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="new-password"
                          />
                        </div>
                      </div>
                      <div className="fp-row">
                        <label htmlFor="fp-confirm">Confirm password</label>
                        <div className="fp-input-wrap">
                          <input
                            id="fp-confirm"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="Repeat password"
                            autoComplete="new-password"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {error && <p className="fp-error" role="alert">{error}</p>}

                  <button type="submit" disabled={sending}>
                    {step === 1 ? (sending ? 'Sending...' : 'Send code') : 'Reset password'}
                  </button>

                  <p className="fp-note">
                    Remembered password? <Link to="/">Return to login</Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
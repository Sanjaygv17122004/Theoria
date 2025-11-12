// About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // go back if possible, otherwise go home
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="about-bg">
      {/* Header */}
      <header className="about-header">
        <button className="back-btn" onClick={handleBack} aria-label="Go back">
          <FiArrowLeft size={18} />
          <span>Back</span>
        </button>
        <h1 className="about-title">About Theoria</h1>
        <div className="header-spacer" />
      </header>

      <main className="about-container">
        <p className="about-description">
          Theoria is a web application designed to detect bias in text. It analyzes sentences,
          calculates bias percentage, provides reasons for bias, and suggests ways to improve neutrality.
          It’s useful for researchers, students, and anyone interested in analyzing written content.
        </p>

        <section className="about-grid" aria-label="Key sections">
          <article className="about-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Dashboard icon" />
            <h3>Dashboard</h3>
            <p>View overall bias detection history and statistics in one place.</p>
          </article>

          <article className="about-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1082/1082603.png" alt="Detection icon" />
            <h3>Detection</h3>
            <p>Enter sentences to detect bias in real-time with analysis and suggestions.</p>
          </article>

          <article className="about-card">
            <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Results icon" />
            <h3>Results</h3>
            <p>Check detailed results including bias percentage, reasons, and suggestions.</p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default About;


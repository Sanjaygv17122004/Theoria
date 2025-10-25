// About.jsx
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-bg">
      {/* Header with Undo Button */}
      <div className="about-header">
        <h1 className="about-title">About Theoria</h1>
        <button 
          className="undo-btn" 
          onClick={() => window.location.href = "/"} // Navigate to landing page
        >
          &#8630; {/* Undo symbol */}
        </button>
      </div>

      <p className="about-description">
        Theoria is a web application designed to detect bias in text. 
        It analyzes sentences, calculates bias percentage, provides reasons for bias, 
        and suggests ways to improve neutrality. It’s useful for researchers, students, and anyone interested in analyzing written content.
      </p>

      <div className="about-images">
        <div className="about-card">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Dashboard" />
          <h3>Dashboard</h3>
          <p>View overall bias detection history and statistics in one place.</p>
        </div>

        <div className="about-card">
          <img src="https://cdn-icons-png.flaticon.com/512/1082/1082603.png" alt="Detection" />
          <h3>Detection</h3>
          <p>Enter sentences to detect bias in real-time with analysis and suggestions.</p>
        </div>

        <div className="about-card">
          <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Results" />
          <h3>Results</h3>
          <p>Check detailed results including bias percentage, reasons, and suggestions.</p>
        </div>
      </div>
    </div>
  );
};

export default About;


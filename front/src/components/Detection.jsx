import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Detection.css";

const Detection = () => {
  const [sentence, setSentence] = useState("");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sentence.trim()) return;

    try {
      // Call backend API
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sentence }),
      });

      const data = await response.json();

      const newEntry = {
        sentence: data.input,
        bias: data.bias_detected,
        suggestions: data.suggestions,
        date: new Date().toLocaleString(),
      };

      // store in local state
      setHistory([newEntry, ...history]);
      setSentence("");

      // navigate to results page and pass the backend response
      navigate("/home/results", { state: { latestEntry: newEntry } });
    } catch (err) {
      console.error("Error analyzing text:", err);
      alert("Failed to analyze text. Please try again.");
    }
  };

  return (
    <div className="detection-bg">
      <h2>Bias Detection</h2>

      <div className="detection-history">
        {history.length === 0 && <p>No detections yet.</p>}
        {history.map((item, idx) => (
          <div key={idx} className="detection-card">
            <p><strong>Sentence:</strong> {item.sentence}</p>
            <p><strong>Bias:</strong> {item.bias}</p>
            {item.suggestions && (
              <p><strong>Suggestions:</strong> {item.suggestions.join(", ")}</p>
            )}
            <p className="detection-date">{item.date}</p>
          </div>
        ))}
      </div>

      <form className="detection-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter sentence for bias detection..."
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          rows={3}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Detection;

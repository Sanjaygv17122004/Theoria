import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Results.css";

const Results = () => {
  const navigate = useNavigate();
  const entry = useLocation().state?.latestEntry;

  if (!entry) {
    return (
      <div className="results-bg">
        <h2>No data to display</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Bias Detection Result", 14, 20);
    doc.setFontSize(12);
    doc.text(`Sentence: ${entry.sentence}`, 14, 30);
    doc.text(`Bias: ${entry.bias}`, 14, 40);
    doc.text(`Date: ${entry.date}`, 14, 50);

    if (entry.percentage) doc.text(`Bias Percentage: ${entry.percentage}%`, 14, 60);
    if (entry.reason) doc.text(`Reason: ${entry.reason}`, 14, 70);

    if (entry.suggestions && entry.suggestions.length > 0) {
      doc.text("Suggestions:", 14, 80);
      entry.suggestions.forEach((s, i) => {
        doc.text(`  ${i + 1}. ${s}`, 14, 90 + i * 10);
      });
    }

    if (entry.agree) doc.text(`Agree/Disagree: ${entry.agree}`, 14, 100 + (entry.suggestions?.length || 0) * 10);

    doc.save("Bias_Result.pdf");
  };

  return (
    <div className="results-bg">
      <h2>Bias Detection Result</h2>

      <div className="results-card">
        <p><strong>Sentence:</strong> {entry.sentence}</p>
        <p><strong>Bias:</strong> <span style={{ color: "red", fontWeight: "bold" }}>{entry.bias}</span></p>
        <p><strong>Date:</strong> {entry.date}</p>

        {entry.percentage && <p><strong>Bias Percentage:</strong> {entry.percentage}%</p>}

        <div className="pie-chart-placeholder">
          {/* Optional: render a pie chart later */}
          [Pie Chart Placeholder]
        </div>

        {entry.reason && <p><strong>Reason for Bias:</strong> {entry.reason}</p>}

        {entry.suggestions && entry.suggestions.length > 0 && (
          <>
            <p><strong>Suggestions:</strong></p>
            <ul>
              {entry.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {entry.agree && <p><strong>Agree/Disagree:</strong> {entry.agree}</p>}

        <button className="download-btn" onClick={handleDownloadPDF}>
          Download as PDF
        </button>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Analyze Another Text
        </button>
      </div>
    </div>
  );
};

export default Results;

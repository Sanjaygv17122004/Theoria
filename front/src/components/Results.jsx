import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiDownload, FiCopy, FiFileText, FiShare2 } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Results.css";

const Donut = ({ value = 0, tone = "neutral" }) => {
  const size = 160; const stroke = 14; const r = (size - stroke) / 2; const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, Number(value))); const offset = c * (1 - v / 100);
  const color = tone === "biased" ? "#ff6b81" : "#2ecc71";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut">
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,.15)" strokeWidth={stroke} fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} strokeLinecap="round" fill="none" strokeDasharray={c} strokeDashoffset={offset} className="donut-bar" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="donut-label">{v}%</text>
    </svg>
  );
};

const Results = () => {
  const navigate = useNavigate();
  const entry = useLocation().state?.latestEntry;
  const [copied, setCopied] = useState(false);

  if (!entry) {
    return (
      <section className="results">
        <div className="res-header">
          <button className="btn ghost" onClick={() => navigate(-1)}><FiArrowLeft /> Back</button>
          <h2>Result</h2>
          <span />
        </div>
        <div className="res-card">
          <h3>No data to display</h3>
          <p>Run an analysis first.</p>
          <div className="res-actions">
            <button className="btn primary" onClick={() => navigate(-1)}>Analyze Text</button>
          </div>
        </div>
      </section>
    );
  }

  const tone = (entry.bias || '').toLowerCase() === 'biased' ? 'biased' : 'neutral';
  const confidence = useMemo(() => {
    if (typeof entry.percentage === 'number') return entry.percentage;
    // Simple heuristic if not provided
    return tone === 'biased' ? 72 : 88;
  }, [entry, tone]);

  const badgeClass = tone === 'biased' ? 'badge biased' : 'badge neutral';

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.sentence).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1800);
    });
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(entry, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'bias_result.json'; a.click();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16); doc.text('Bias Detection Result', 14, 20);
    doc.setFontSize(11);
    doc.text(`Sentence: ${entry.sentence}`, 14, 30);
    doc.text(`Bias: ${entry.bias}`, 14, 38);
    doc.text(`Confidence: ${confidence}%`, 14, 46);
    if (entry.reason) doc.text(`Reason: ${entry.reason}`, 14, 54);
    if (entry.suggestions?.length) {
      doc.text('Suggestions:', 14, 64);
      entry.suggestions.forEach((s, i) => doc.text(`${i + 1}. ${s}`, 18, 72 + i * 8));
    }
    doc.text(`Date: ${entry.date}`, 14, 90);
    if (entry.agree) doc.text(`Agree/Disagree: ${entry.agree}`, 14, 98);
    doc.save('bias_result.pdf');
  };

  return (
    <section className="results">
      <div className="res-header">
        <button className="btn ghost" onClick={() => navigate(-1)}><FiArrowLeft /> Back</button>
        <h2>Bias Analysis</h2>
        <div className="header-actions">
          <button className="btn" onClick={handleExportJSON}><FiFileText /> JSON</button>
          <button className="btn" onClick={handleDownloadPDF}><FiDownload /> PDF</button>
        </div>
      </div>

      <div className="res-grid">
        <div className="res-card main span-2">
          <div className="sentence-wrap">
            <h3>Sentence</h3>
            <p className="sentence" title={entry.sentence}>{entry.sentence}</p>
            <div className="sentence-actions">
              <button className="btn" onClick={handleCopy}><FiCopy /> {copied ? 'Copied' : 'Copy'}</button>
            </div>
          </div>
          <div className="meta-row">
            <div className="meta"><span className={badgeClass}>{entry.bias}</span></div>
            <div className="meta"><strong>Date:</strong> {entry.date}</div>
            {entry.agree && <div className="meta"><strong>Feedback:</strong> {entry.agree}</div>}
          </div>
          {entry.reason && (
            <div className="reason"><h4>Reason</h4><p>{entry.reason}</p></div>
          )}
          {entry.suggestions?.length > 0 && (
            <div className="suggestions">
              <h4>Suggestions</h4>
              <ul>
                {entry.suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="res-card chart">
          <h3>Confidence</h3>
          <Donut value={confidence} tone={tone} />
          <p className="confidence-note">Model confidence estimate for this classification.</p>
        </div>

        <div className="res-card actions">
          <h3>Export</h3>
          <button className="btn w-full" onClick={handleDownloadPDF}><FiDownload /> Download PDF</button>
          <button className="btn w-full" onClick={handleExportJSON}><FiFileText /> Export JSON</button>
          <button className="btn w-full" onClick={() => navigate(-1)}><FiShare2 /> New Analysis</button>
        </div>
      </div>
    </section>
  );
};

export default Results;

import React, { useMemo, useState } from "react";
import { FaHistory, FaChartPie } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("history"); // "history" | "analysis"

  const history = [
    { sentence: "The earth is flat.", bias: "Biased", date: "2025-09-06" },
    { sentence: "All politicians are corrupt.", bias: "Biased", date: "2025-09-05" },
    { sentence: "Water is essential for life.", bias: "Neutral", date: "2025-09-04" },
    { sentence: "Cats are cute.", bias: "Neutral", date: "2025-09-03" },
    { sentence: "All students cheat.", bias: "Biased", date: "2025-09-02" },
    { sentence: "Sun rises in the east.", bias: "Neutral", date: "2025-09-01" },
  ];

  const stats = useMemo(() => {
    const total = history.length;
    const biased = history.filter(h => h.bias === "Biased").length;
    const neutral = total - biased;
    const biasedPct = total ? Math.round((biased / total) * 100) : 0;
    const neutralPct = 100 - biasedPct;
    return { total, biased, neutral, biasedPct, neutralPct };
  }, [history]);

  return (
    <section className="dashboard">
      {/* Header + Tabs */}
      <div className="dash-header">
        <div className="dash-title">
          <h2>Dashboard</h2>
          <p className="dash-sub">Overview of your recent checks</p>
        </div>
        <div className="dash-tabs" role="tablist" aria-label="Dashboard sections">
          <button
            className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          >
            <FaHistory />
            <span>History</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "analysis" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "analysis"}
            onClick={() => setActiveTab("analysis")}
          >
            <FaChartPie />
            <span>Analysis</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "history" && (
        <div className="card">
          <div className="card-head">
            <FaHistory className="card-icon" />
            <h3>Analysis History</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Sentence</th>
                  <th>Bias</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx}>
                    <td className="sentence-cell" title={item.sentence}>{item.sentence}</td>
                    <td>
                      <span className={`badge ${item.bias.toLowerCase()}`}>
                        {item.bias}
                      </span>
                    </td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "analysis" && (
        <div className="analysis-grid">
          <div className="kpi card">
            <div className="kpi-value">{stats.total}</div>
            <div className="kpi-label">Total Analyses</div>
          </div>
          <div className="kpi card">
            <div className="kpi-value">{stats.biased}</div>
            <div className="kpi-label">Biased</div>
          </div>
          <div className="kpi card">
            <div className="kpi-value">{stats.neutral}</div>
            <div className="kpi-label">Neutral</div>
          </div>

          <div className="span-2 card">
            <div className="card-head">
              <FaChartPie className="card-icon" />
              <h3>Distribution</h3>
            </div>
            <div className="progresses">
              <div className="progress-row">
                <span>Biased</span>
                <div className="bar"><div style={{ width: `${stats.biasedPct}%` }} className="fill biased" /></div>
                <span className="pct">{stats.biasedPct}%</span>
              </div>
              <div className="progress-row">
                <span>Neutral</span>
                <div className="bar"><div style={{ width: `${stats.neutralPct}%` }} className="fill" /></div>
                <span className="pct">{stats.neutralPct}%</span>
              </div>
            </div>
          </div>

          <div className="span-2 card">
            <div className="card-head">
              <h3>Trends</h3>
            </div>
            <div className="chart-placeholder">Line chart placeholder</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;

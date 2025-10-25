import React, { useState } from "react";
import { FaHistory, FaChartPie } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeFeature, setActiveFeature] = useState("history");

  const history = [
    { sentence: "The earth is flat.", bias: "Biased", date: "2025-09-06" },
    { sentence: "All politicians are corrupt.", bias: "Biased", date: "2025-09-05" },
    { sentence: "Water is essential for life.", bias: "Neutral", date: "2025-09-04" },
    { sentence: "Cats are cute.", bias: "Neutral", date: "2025-09-03" },
    { sentence: "All students cheat.", bias: "Biased", date: "2025-09-02" },
    { sentence: "Sun rises in the east.", bias: "Neutral", date: "2025-09-01" },
  ];

  return (
    <div className="dashboard-bg">
      {/* Navbar */}
      <div className="dashboard-navbar">
        <span className="navbar-title">Dashboard</span>
        <div className="feature-buttons">
          <button
            className={activeFeature === "history" ? "active" : ""}
            onClick={() => setActiveFeature("history")}
          >
            <FaHistory /> History
          </button>
          <button
            className={activeFeature === "statistics" ? "active" : ""}
            onClick={() => setActiveFeature("statistics")}
          >
            <FaChartPie /> Statistics
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="dashboard-main-content">
        <div className="feature-center">
          {activeFeature === "history" && (
            <div className="dashboard-card history-card">
              <FaHistory className="card-icon" />
              <h3>Analysis History</h3>
              <div className="history-scroll">
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
                        <td>{item.sentence}</td>
                        <td>{item.bias}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeFeature === "statistics" && (
            <div className="dashboard-card charts-card">
              <FaChartPie className="card-icon" />
              <h3>Statistics</h3>
              <div className="chart-placeholder">[Pie Chart]</div>
              <div className="chart-placeholder">[Line Chart]</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

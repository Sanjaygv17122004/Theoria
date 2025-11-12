import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiDownload, FiMail, FiUser, FiTrendingUp, FiCalendar } from "react-icons/fi";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./Profile.css";

const STORAGE_KEYS = {
  profile: "theoria.profile",
};

const fallbackAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ displayName: "Theoria User", email: "user@theoria.com", avatar: "" });

  // Mock recent activity
  const activity = [
    { sentence: "The earth is flat.", result: "Biased", date: "2025-09-06" },
    { sentence: "Water is essential for life.", result: "Neutral", date: "2025-09-04" },
    { sentence: "All students cheat.", result: "Biased", date: "2025-09-02" },
    { sentence: "Sun rises in the east.", result: "Neutral", date: "2025-09-01" },
  ];

  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || "null");
      if (p) setProfile(p);
    } catch {}
  }, []);

  const stats = useMemo(() => {
    const total = activity.length;
    const biased = activity.filter(a => a.result === "Biased").length;
    const neutral = total - biased;
    const neutralPct = total ? Math.round((neutral / total) * 100) : 0;
    const biasedPct = 100 - neutralPct;
    return { total, biased, neutral, neutralPct, biasedPct };
  }, [activity]);

  const exportSummary = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Theoria - Profile Summary", 14, 18);
    doc.setFontSize(11);
    doc.text(`Name: ${profile.displayName || "Theoria User"}`, 14, 28);
    doc.text(`Email: ${profile.email}`, 14, 35);
    doc.text(`Total Analyses: ${stats.total}`, 14, 42);
    doc.text(`Neutral Rate: ${stats.neutralPct}%`, 14, 49);
    doc.text("Recent Activity", 14, 60);
    const rows = activity.map(a => [a.sentence, a.result, a.date]);
    // @ts-ignore - autotable injects itself
    doc.autoTable({ head: [["Sentence", "Result", "Date"]], body: rows, startY: 64, styles: { fontSize: 9 } });
    doc.save("theoria-profile-summary.pdf");
  };

  return (
    <section className="profile">
      <div className="pro-header">
        <h2>Profile</h2>
        <p className="muted">Your account details and recent activity</p>
      </div>

      <div className="pro-grid">
        {/* Left column: Profile card */}
        <div className="pro-card">
          <div className="profile-row">
            <div className="avatar">
              <img src={profile.avatar || fallbackAvatar} alt="Avatar" />
            </div>
            <div className="info">
              <div className="name"><FiUser /> {profile.displayName}</div>
              <div className="email"><FiMail /> {profile.email}</div>
              <div className="since"><FiCalendar /> Member since 2025</div>
            </div>
          </div>
          <div className="actions">
            <button className="btn primary" onClick={() => navigate("/home/settings")}> <FiEdit /> Edit in Settings</button>
            <button className="btn" onClick={exportSummary}> <FiDownload /> Export Summary</button>
          </div>
        </div>

        {/* Right column: KPIs */}
        <div className="kpis">
          <div className="kpi pro-card">
            <div className="kpi-value">{stats.total}</div>
            <div className="kpi-label">Total Analyses</div>
          </div>
          <div className="kpi pro-card">
            <div className="kpi-value">{stats.neutralPct}%</div>
            <div className="kpi-label">Neutral Rate</div>
          </div>
          <div className="kpi pro-card">
            <div className="kpi-value">{stats.biasedPct}%</div>
            <div className="kpi-label">Biased Rate</div>
          </div>
        </div>

        {/* Activity list */}
        <div className="pro-card span-2">
          <div className="card-head"><FiTrendingUp /> <h3>Recent Activity</h3></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Sentence</th>
                  <th>Result</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((a, i) => (
                  <tr key={i}>
                    <td className="sentence-cell" title={a.sentence}>{a.sentence}</td>
                    <td>
                      <span className={`badge ${a.result.toLowerCase()}`}>{a.result}</span>
                    </td>
                    <td>{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

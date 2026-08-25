import React from 'react';
import { PIPELINE_STAGES, SOURCES } from '../data/initialData';
import { TrendingUp, PieChart, Users, Award, CheckCircle2 } from 'lucide-react';

export default function AnalyticsView({ candidates }) {
  const totalCount = candidates.length;

  // Funnel calculations
  const stageCounts = PIPELINE_STAGES.map((st) => {
    const count = candidates.filter((c) => c.stage === st.id).length;
    const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
    return {
      ...st,
      count,
      percentage
    };
  });

  // Source distribution
  const sourceStats = SOURCES.map((src) => {
    const count = candidates.filter((c) => c.source === src).length;
    const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
    return {
      source: src,
      count,
      percentage
    };
  });

  // Department distribution
  const deptCounts = candidates.reduce((acc, c) => {
    const dept = c.department || 'General';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const avgRating = totalCount > 0
    ? (candidates.reduce((sum, c) => sum + (c.rating || 0), 0) / totalCount).toFixed(1)
    : '0.0';

  const hiredCount = candidates.filter((c) => c.stage === 'hired').length;
  const conversionRate = totalCount > 0 ? Math.round((hiredCount / totalCount) * 100) : 0;

  return (
    <div className="analytics-view-container">
      <div className="analytics-kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon-box orange">
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="kpi-label">Conversion Rate</span>
            <h3 className="kpi-value">{conversionRate}%</h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box blue">
            <Award size={20} />
          </div>
          <div>
            <span className="kpi-label">Average Scorecard Rating</span>
            <h3 className="kpi-value">{avgRating} / 5.0</h3>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box green">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="kpi-label">Successfully Hired</span>
            <h3 className="kpi-value">{hiredCount} candidates</h3>
          </div>
        </div>
      </div>

      <div className="analytics-charts-grid">
        {/* Pipeline Funnel Breakdown */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <TrendingUp size={18} className="card-header-icon" />
            <h3 className="card-header-title">Recruitment Pipeline Funnel</h3>
          </div>
          <div className="funnel-bars-container">
            {stageCounts.map((s) => (
              <div key={s.id} className="funnel-row">
                <div className="funnel-label-group">
                  <span className="funnel-stage-name">{s.label}</span>
                  <span className="funnel-stage-meta">{s.count} ({s.percentage}%)</span>
                </div>
                <div className="funnel-track">
                  <div
                    className="funnel-fill"
                    style={{
                      width: `${Math.max(s.percentage, 4)}%`,
                      backgroundColor: s.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Sources Distribution */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <PieChart size={18} className="card-header-icon" />
            <h3 className="card-header-title">Applicant Source Distribution</h3>
          </div>
          <div className="sources-list-container">
            {sourceStats.map((src, idx) => (
              <div key={idx} className="source-stat-item">
                <div className="source-stat-info">
                  <span className="source-name">{src.source}</span>
                  <span className="source-count">{src.count} ({src.percentage}%)</span>
                </div>
                <div className="source-progress-track">
                  <div
                    className="source-progress-fill"
                    style={{ width: `${src.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Hiring breakdown */}
        <div className="analytics-card full-width">
          <div className="analytics-card-header">
            <Users size={18} className="card-header-icon" />
            <h3 className="card-header-title">Department Openings & Applicants</h3>
          </div>
          <div className="dept-grid">
            {Object.entries(deptCounts).map(([dept, count]) => (
              <div key={dept} className="dept-pill-card">
                <span className="dept-name">{dept}</span>
                <span className="dept-count-badge">{count} Candidates</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .analytics-view-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .analytics-kpi-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .kpi-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: var(--card-shadow);
        }

        .kpi-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kpi-icon-box.orange {
          background-color: var(--accent-orange-bg);
          color: var(--accent-orange);
        }

        .kpi-icon-box.blue {
          background-color: var(--accent-blue-bg);
          color: var(--accent-blue);
        }

        .kpi-icon-box.green {
          background-color: var(--accent-green-bg);
          color: var(--accent-green);
        }

        .kpi-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .kpi-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .analytics-charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .analytics-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--card-shadow);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .analytics-card.full-width {
          grid-column: 1 / -1;
        }

        .analytics-card-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .card-header-icon {
          color: var(--accent-orange);
        }

        .card-header-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .funnel-bars-container {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .funnel-row {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .funnel-label-group {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .funnel-stage-name {
          color: var(--text-primary);
        }

        .funnel-stage-meta {
          color: var(--text-secondary);
        }

        .funnel-track {
          height: 10px;
          background-color: var(--bg-surface-elevated);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .funnel-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.5s ease;
        }

        .sources-list-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .source-stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .source-stat-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .source-progress-track {
          height: 8px;
          background-color: var(--bg-surface-elevated);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .source-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-orange) 0%, #E65100 100%);
          border-radius: var(--radius-full);
        }

        .dept-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .dept-pill-card {
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .dept-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .dept-count-badge {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-orange);
        }

        @media (max-width: 900px) {
          .analytics-kpi-row {
            grid-template-columns: 1fr;
          }
          .analytics-charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

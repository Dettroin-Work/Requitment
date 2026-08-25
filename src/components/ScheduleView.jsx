import React, { useState } from 'react';
import { Calendar, Clock, Video, User, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PIPELINE_STAGES } from '../data/initialData';

export default function ScheduleView({ candidates, onSelectCandidate }) {
  const [filterPeriod, setFilterPeriod] = useState('all');

  const scheduledCandidates = candidates
    .filter((c) => c.interviewDate)
    .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));

  // Group by Date
  const groupedByDate = scheduledCandidates.reduce((acc, candidate) => {
    const dateStr = candidate.interviewDate;
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(candidate);
    return acc;
  }, {});

  return (
    <div className="schedule-view-container">
      <div className="schedule-header-row">
        <div>
          <h2 className="schedule-heading">Interview Calendar & Schedule</h2>
          <p className="schedule-subheading">Track upcoming interviews and interviewer availability</p>
        </div>

        <div className="schedule-filters">
          <button
            className={`period-btn ${filterPeriod === 'all' ? 'active' : ''}`}
            onClick={() => setFilterPeriod('all')}
          >
            All Scheduled ({scheduledCandidates.length})
          </button>
          <button
            className={`period-btn ${filterPeriod === 'today' ? 'active' : ''}`}
            onClick={() => setFilterPeriod('today')}
          >
            Today & Upcoming
          </button>
        </div>
      </div>

      <div className="schedule-timeline">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="empty-schedule-card">
            <Calendar size={48} className="empty-schedule-icon" />
            <h3>No Scheduled Interviews</h3>
            <p>Assign interview dates to candidates to view their schedule here.</p>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([dateStr, items]) => {
            const dateObj = new Date(dateStr);
            const formattedDate = isNaN(dateObj.getTime())
              ? dateStr
              : dateObj.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

            return (
              <div key={dateStr} className="date-group-card">
                <div className="date-group-header">
                  <Calendar size={18} className="date-icon" />
                  <span className="date-title-text">{formattedDate}</span>
                  <span className="date-count-pill">{items.length} Interview(s)</span>
                </div>

                <div className="interview-items-grid">
                  {items.map((cand) => {
                    const stageObj = PIPELINE_STAGES.find((s) => s.id === cand.stage);

                    return (
                      <div
                        key={cand.id}
                        className="schedule-item-card"
                        onClick={() => onSelectCandidate(cand)}
                      >
                        <div className="item-time-badge">
                          <Clock size={14} />
                          <span>{cand.interviewTime || '10:00 AM'}</span>
                        </div>

                        <div className="item-details">
                          <h4 className="item-cand-name">{cand.name}</h4>
                          <div className="item-role-text">
                            <Briefcase size={13} />
                            <span>{cand.role}</span>
                          </div>

                          <div className="item-meta-row">
                            <span className="interviewer-badge">
                              <User size={13} /> {cand.interviewer || 'Unassigned'}
                            </span>
                            <span
                              className="stage-badge-pill"
                              style={{
                                backgroundColor: stageObj?.color ? `${stageObj.color}20` : 'var(--bg-hover)',
                                color: stageObj?.color || 'var(--text-primary)',
                                border: `1px solid ${stageObj?.color || 'var(--border-color)'}`
                              }}
                            >
                              {stageObj?.label || cand.stage}
                            </span>
                          </div>
                        </div>

                        <div className="item-actions">
                          <button
                            className="meet-link-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Launching Google Meet session for ${cand.name}...`);
                            }}
                          >
                            <Video size={15} /> Join Meet
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      <style>{`
        .schedule-view-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .schedule-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.5rem;
          box-shadow: var(--card-shadow);
        }

        .schedule-heading {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .schedule-subheading {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .schedule-filters {
          display: flex;
          gap: 0.5rem;
          background-color: var(--bg-surface-elevated);
          padding: 0.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .period-btn {
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .period-btn.active {
          background-color: var(--bg-surface);
          color: var(--accent-orange);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .schedule-timeline {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .empty-schedule-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
        }

        .empty-schedule-icon {
          color: var(--text-muted);
        }

        .date-group-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.5rem;
          box-shadow: var(--card-shadow);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .date-group-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .date-icon {
          color: var(--accent-orange);
        }

        .date-title-text {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .date-count-pill {
          margin-left: auto;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          background-color: var(--bg-surface-elevated);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .interview-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1rem;
        }

        .schedule-item-card {
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .schedule-item-card:hover {
          border-color: var(--accent-orange);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }

        .item-time-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-orange);
        }

        .item-cand-name {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .item-role-text {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-top: 0.15rem;
        }

        .item-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }

        .interviewer-badge {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .stage-badge-pill {
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .meet-link-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          background-color: var(--accent-blue-bg);
          color: var(--accent-blue);
          font-size: 0.82rem;
          font-weight: 700;
          border: 1px solid rgba(96, 165, 250, 0.2);
          transition: all var(--transition-fast);
        }

        .meet-link-btn:hover {
          background-color: var(--accent-blue);
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}

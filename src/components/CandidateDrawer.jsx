import React, { useState } from 'react';
import { X, Mail, Phone, Calendar, User, Briefcase, Star, Award, Edit3, Trash2, CheckCircle2, MessageSquare } from 'lucide-react';
import { PIPELINE_STAGES } from '../data/initialData';

export default function CandidateDrawer({
  candidate,
  onClose,
  onMoveCandidate,
  onEditCandidate,
  onDeleteCandidate,
  onUpdateScorecard
}) {
  if (!candidate) return null;

  const currentStageObj = PIPELINE_STAGES.find((s) => s.id === candidate.stage);
  const scorecard = candidate.scorecard || {
    technical: candidate.rating || 4,
    communication: candidate.rating || 4,
    problemSolving: candidate.rating || 4,
    cultureFit: candidate.rating || 4
  };

  const [localScorecard, setLocalScorecard] = useState(scorecard);

  const handleScoreChange = (key, val) => {
    const updated = { ...localScorecard, [key]: val };
    setLocalScorecard(updated);
    onUpdateScorecard(candidate.id, updated);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-cand-title-group">
            <h2 className="drawer-cand-name">{candidate.name}</h2>
            <div className="drawer-cand-role-row">
              <Briefcase size={15} />
              <span>{candidate.role}</span>
              <span className="drawer-dept-tag">{candidate.department || 'Engineering'}</span>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Pipeline Stage Selector */}
          <div className="drawer-section">
            <h4 className="section-heading">Pipeline Stage</h4>
            <div className="stage-pills-row">
              {PIPELINE_STAGES.map((s) => {
                const isActive = candidate.stage === s.id;
                return (
                  <button
                    key={s.id}
                    className={`drawer-stage-pill ${isActive ? 'active' : ''}`}
                    onClick={() => onMoveCandidate(candidate.id, s.id)}
                    style={{
                      borderColor: s.color,
                      backgroundColor: isActive ? s.color : 'transparent',
                      color: isActive ? '#FFFFFF' : 'var(--text-primary)'
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="drawer-section">
            <h4 className="section-heading">Candidate Contact & Overview</h4>
            <div className="info-grid">
              <div className="info-item">
                <Mail size={15} className="info-icon" />
                <div>
                  <span className="info-label">Email</span>
                  <span className="info-val">{candidate.email || 'N/A'}</span>
                </div>
              </div>

              <div className="info-item">
                <Phone size={15} className="info-icon" />
                <div>
                  <span className="info-label">Phone</span>
                  <span className="info-val">{candidate.phone || 'N/A'}</span>
                </div>
              </div>

              <div className="info-item">
                <User size={15} className="info-icon" />
                <div>
                  <span className="info-label">Interviewer</span>
                  <span className="info-val highlight">{candidate.interviewer || 'Mr Tarun'}</span>
                </div>
              </div>

              <div className="info-item">
                <Calendar size={15} className="info-icon" />
                <div>
                  <span className="info-label">Interview Date & Time</span>
                  <span className="info-val">
                    {candidate.interviewDate || 'Not Scheduled'}
                    {candidate.interviewTime ? ` at ${candidate.interviewTime}` : ''}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <Award size={15} className="info-icon" />
                <div>
                  <span className="info-label">Source</span>
                  <span className="info-val">{candidate.source || 'Indeed'}</span>
                </div>
              </div>

              <div className="info-item">
                <CheckCircle2 size={15} className="info-icon" />
                <div>
                  <span className="info-label">Salary Expectation</span>
                  <span className="info-val">{candidate.salaryExpectation || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Scorecard */}
          <div className="drawer-section">
            <h4 className="section-heading">Interview Evaluation Scorecard</h4>
            <div className="scorecard-ratings">
              {[
                { key: 'technical', label: 'Technical Competency' },
                { key: 'communication', label: 'Communication & Clarity' },
                { key: 'problemSolving', label: 'Problem Solving' },
                { key: 'cultureFit', label: 'Cultural Alignment' }
              ].map((item) => (
                <div key={item.key} className="score-row">
                  <span className="score-label">{item.label}</span>
                  <div className="score-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="star-click-btn"
                        onClick={() => handleScoreChange(item.key, star)}
                      >
                        <Star
                          size={18}
                          fill={star <= (localScorecard[item.key] || 0) ? '#F59E0B' : 'transparent'}
                          color={star <= (localScorecard[item.key] || 0) ? '#F59E0B' : 'var(--text-muted)'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          {candidate.skills && candidate.skills.length > 0 && (
            <div className="drawer-section">
              <h4 className="section-heading">Candidate Skills</h4>
              <div className="drawer-skills-list">
                {candidate.skills.map((skill, idx) => (
                  <span key={idx} className="drawer-skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interview Notes */}
          <div className="drawer-section">
            <h4 className="section-heading">Interview Notes & History</h4>
            <div className="notes-box">
              <MessageSquare size={16} className="notes-icon" />
              <p className="notes-content">
                {candidate.notes || 'No detailed interview notes entered yet.'}
              </p>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <button
            className="drawer-action-btn edit"
            onClick={() => {
              onEditCandidate(candidate);
              onClose();
            }}
          >
            <Edit3 size={16} /> Edit Profile
          </button>
          <button
            className="drawer-action-btn delete"
            onClick={() => {
              if (window.confirm('Delete candidate profile?')) {
                onDeleteCandidate(candidate.id);
                onClose();
              }
            }}
          >
            <Trash2 size={16} /> Delete Candidate
          </button>
        </div>
      </div>

      <style>{`
        .drawer-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: flex-end;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .drawer-panel {
          background-color: var(--bg-surface);
          border-left: 1px solid var(--border-color);
          width: 100%;
          max-width: 520px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.4);
          animation: slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .drawer-cand-name {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .drawer-cand-role-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 0.2rem;
        }

        .drawer-dept-tag {
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          background-color: var(--bg-surface-elevated);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .drawer-close-btn {
          padding: 0.4rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }

        .drawer-close-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-hover);
        }

        .drawer-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .drawer-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .section-heading {
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .stage-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .drawer-stage-pill {
          padding: 0.35rem 0.7rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid;
          transition: all var(--transition-fast);
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .info-icon {
          color: var(--accent-orange);
        }

        .info-label {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .info-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .info-val.highlight {
          color: var(--accent-orange);
        }

        .scorecard-ratings {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .score-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .score-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .score-stars {
          display: flex;
          gap: 0.2rem;
        }

        .star-click-btn {
          padding: 0.1rem;
        }

        .drawer-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .drawer-skill-chip {
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          background-color: var(--accent-blue-bg);
          color: var(--accent-blue);
          border: 1px solid rgba(96, 165, 250, 0.25);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .notes-box {
          display: flex;
          gap: 0.75rem;
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .notes-icon {
          color: var(--accent-orange);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .notes-content {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .drawer-footer {
          display: flex;
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .drawer-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 700;
          transition: all var(--transition-fast);
        }

        .drawer-action-btn.edit {
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .drawer-action-btn.edit:hover {
          background-color: var(--bg-hover);
        }

        .drawer-action-btn.delete {
          background-color: var(--accent-red-bg);
          border: 1px solid rgba(248, 113, 113, 0.3);
          color: var(--accent-red);
        }

        .drawer-action-btn.delete:hover {
          background-color: var(--accent-red);
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import { Plus, Briefcase, Calendar, ChevronLeft, ChevronRight, Star, MoreVertical, Eye, Trash2, CheckCircle2, User } from 'lucide-react';
import { PIPELINE_STAGES } from '../data/initialData';
import confetti from 'canvas-confetti';

export default function PipelineView({
  candidates,
  onMoveCandidate,
  onOpenAddModal,
  onSelectCandidate,
  onDeleteCandidate
}) {
  const [draggedCandidateId, setDraggedCandidateId] = useState(null);

  const handleDragStart = (e, candidateId) => {
    e.dataTransfer.setData('text/plain', candidateId);
    setDraggedCandidateId(candidateId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStageId) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('text/plain') || draggedCandidateId;
    if (candidateId) {
      onMoveCandidate(candidateId, targetStageId);
      if (targetStageId === 'hired') {
        triggerConfetti();
      }
    }
    setDraggedCandidateId(null);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getNextStageId = (currentStageId) => {
    const idx = PIPELINE_STAGES.findIndex((s) => s.id === currentStageId);
    if (idx < PIPELINE_STAGES.length - 1) {
      return PIPELINE_STAGES[idx + 1].id;
    }
    return null;
  };

  const getPrevStageId = (currentStageId) => {
    const idx = PIPELINE_STAGES.findIndex((s) => s.id === currentStageId);
    if (idx > 0) {
      return PIPELINE_STAGES[idx - 1].id;
    }
    return null;
  };

  return (
    <div className="pipeline-board-container">
      {PIPELINE_STAGES.map((stage) => {
        const stageCandidates = candidates.filter((c) => c.stage === stage.id);
        const count = stageCandidates.length;

        return (
          <div
            key={stage.id}
            className="stage-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="stage-header">
              <div className="stage-title-group">
                <span className="stage-dot" style={{ backgroundColor: stage.color }}></span>
                <span className="stage-label">{stage.label}</span>
                <span className="stage-count">{count}</span>
              </div>

              <button
                className="column-add-btn"
                onClick={() => onOpenAddModal(stage.id)}
                title={`Add candidate to ${stage.label}`}
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="stage-cards-container">
              {count === 0 ? (
                <div className="empty-stage-placeholder">
                  <p className="empty-text">No candidates in this stage</p>
                  <button
                    className="empty-add-btn"
                    onClick={() => onOpenAddModal(stage.id)}
                  >
                    + Add candidate
                  </button>
                </div>
              ) : (
                stageCandidates.map((c) => {
                  const prevStage = getPrevStageId(c.stage);
                  const nextStage = getNextStageId(c.stage);

                  return (
                    <div
                      key={c.id}
                      className="candidate-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, c.id)}
                      onClick={() => onSelectCandidate(c)}
                    >
                      <div className="card-top-row">
                        <h4 className="candidate-name">{c.name}</h4>
                        <div className="card-quick-actions" onClick={(e) => e.stopPropagation()}>
                          <button
                            className="card-action-icon"
                            title="View candidate details"
                            onClick={() => onSelectCandidate(c)}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="card-action-icon delete"
                            title="Delete candidate"
                            onClick={() => onDeleteCandidate(c.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="card-role-row">
                        <Briefcase size={14} className="role-icon" />
                        <span>{c.role}</span>
                      </div>

                      <div className="card-tags-row">
                        <span className="tag-pill source">{c.source}</span>
                        {c.status && (
                          <span className={`tag-pill status ${c.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {c.status}
                          </span>
                        )}
                        {c.rating > 0 && (
                          <span className="tag-pill rating">
                            <Star size={12} fill="#F59E0B" color="#F59E0B" />
                            {c.rating}
                          </span>
                        )}
                      </div>

                      {(c.interviewDate || c.interviewTime) && (
                        <div className="card-schedule-row">
                          <div className="schedule-date">
                            <Calendar size={13} />
                            <span>
                              {c.interviewDate}
                              {c.interviewTime ? ` • ${c.interviewTime}` : ''}
                            </span>
                          </div>
                          {c.interviewer && (
                            <span className="interviewer-tag">
                              {c.interviewer}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="card-footer-controls" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="stage-nav-btn back"
                          disabled={!prevStage}
                          onClick={() => prevStage && onMoveCandidate(c.id, prevStage)}
                        >
                          <ChevronLeft size={14} /> Back
                        </button>
                        <button
                          className="stage-nav-btn next"
                          disabled={!nextStage}
                          onClick={() => {
                            if (nextStage) {
                              onMoveCandidate(c.id, nextStage);
                              if (nextStage === 'hired') triggerConfetti();
                            }
                          }}
                        >
                          Next <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}

      <style>{`
        .pipeline-board-container {
          display: flex;
          gap: 1.1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          min-height: 600px;
          align-items: flex-start;
        }

        .stage-column {
          flex: 0 0 310px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          max-height: 80vh;
          box-shadow: var(--card-shadow);
        }

        .stage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }

        .stage-title-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .stage-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .stage-label {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .stage-count {
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background-color: var(--bg-surface-elevated);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .column-add-btn {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .column-add-btn:hover {
          color: var(--accent-orange);
          background-color: var(--accent-orange-bg);
        }

        .stage-cards-container {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          overflow-y: auto;
          flex-grow: 1;
        }

        .empty-stage-placeholder {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          text-align: center;
          min-height: 180px;
        }

        .empty-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .empty-add-btn {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent-orange);
          transition: all var(--transition-fast);
        }

        .empty-add-btn:hover {
          text-decoration: underline;
        }

        .candidate-card {
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          cursor: grab;
          transition: all var(--transition-fast);
          position: relative;
        }

        .candidate-card:hover {
          border-color: var(--accent-orange);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        }

        .candidate-card:active {
          cursor: grabbing;
        }

        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .candidate-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .card-quick-actions {
          display: flex;
          gap: 0.3rem;
          opacity: 0.7;
          transition: opacity var(--transition-fast);
        }

        .candidate-card:hover .card-quick-actions {
          opacity: 1;
        }

        .card-action-icon {
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }

        .card-action-icon:hover {
          color: var(--text-primary);
          background-color: var(--bg-hover);
        }

        .card-action-icon.delete:hover {
          color: var(--accent-red);
          background-color: var(--accent-red-bg);
        }

        .card-role-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .role-icon {
          color: var(--text-muted);
        }

        .card-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .tag-pill {
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
        }

        .tag-pill.source {
          background-color: var(--bg-hover);
          color: var(--text-primary);
        }

        .tag-pill.status {
          background-color: rgba(255, 152, 0, 0.1);
          color: var(--accent-orange);
          border-color: rgba(255, 152, 0, 0.25);
        }

        .tag-pill.rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background-color: rgba(245, 158, 11, 0.1);
          color: #F59E0B;
        }

        .card-schedule-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.4rem;
          border-top: 1px dashed var(--border-color);
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .schedule-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .interviewer-tag {
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, rgba(255, 152, 0, 0.2) 0%, rgba(230, 81, 0, 0.2) 100%);
          color: var(--accent-orange);
          font-weight: 700;
          font-size: 0.75rem;
          border: 1px solid rgba(255, 152, 0, 0.3);
        }

        .card-footer-controls {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 0.2rem;
        }

        .stage-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .stage-nav-btn:hover:not(:disabled) {
          color: var(--accent-orange);
          background-color: var(--accent-orange-bg);
        }

        .stage-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

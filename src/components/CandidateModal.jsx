import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, Star } from 'lucide-react';
import { PIPELINE_STAGES, SOURCES } from '../data/initialData';

export default function CandidateModal({
  isOpen,
  onClose,
  onSave,
  candidateToEdit,
  initialStage
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Full Stack Developer',
    department: 'Engineering',
    stage: initialStage || '1st_interview',
    source: 'Indeed',
    status: 'Pending Feedback',
    interviewDate: '2026-08-26',
    interviewTime: '10:00 AM',
    interviewer: 'Mr Tarun',
    rating: 4,
    experience: '3+ Years',
    salaryExpectation: '$120,000 / yr',
    skills: 'React, Node.js, TypeScript',
    notes: ''
  });

  useEffect(() => {
    if (candidateToEdit) {
      setFormData({
        ...candidateToEdit,
        skills: Array.isArray(candidateToEdit.skills)
          ? candidateToEdit.skills.join(', ')
          : candidateToEdit.skills || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Full Stack Developer',
        department: 'Engineering',
        stage: initialStage || '1st_interview',
        source: 'Indeed',
        status: 'Pending Feedback',
        interviewDate: '2026-08-26',
        interviewTime: '10:00 AM',
        interviewer: 'Mr Tarun',
        rating: 4,
        experience: '3+ Years',
        salaryExpectation: '$120,000 / yr',
        skills: 'React, Node.js, TypeScript',
        notes: ''
      });
    }
  }, [candidateToEdit, initialStage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = typeof formData.skills === 'string'
      ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : formData.skills;

    onSave({
      ...formData,
      skills: skillsArray,
      rating: Number(formData.rating)
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <UserPlus size={20} className="modal-title-icon" />
            <h3>{candidateToEdit ? 'Edit Candidate Profile' : 'Add New Candidate'}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Unnamed Candidate or Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="candidate@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Target Role</label>
              <input
                type="text"
                required
                placeholder="e.g. Full Stack Developer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                placeholder="e.g. Engineering"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Pipeline Stage</label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              >
                {PIPELINE_STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Applicant Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              >
                {SOURCES.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Assigned Interviewer</label>
              <input
                type="text"
                placeholder="e.g. Mr Tarun"
                value={formData.interviewer}
                onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Interview Date</label>
              <input
                type="date"
                value={formData.interviewDate}
                onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Interview Time</label>
              <input
                type="time"
                value={formData.interviewTime}
                onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Scorecard Rating (1-5)</label>
              <div className="rating-input-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${star <= formData.rating ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, rating: star })}
                  >
                    <Star
                      size={20}
                      fill={star <= formData.rating ? '#F59E0B' : 'transparent'}
                      color={star <= formData.rating ? '#F59E0B' : 'var(--text-muted)'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Salary Expectation</label>
              <input
                type="text"
                placeholder="e.g. $120,000 / yr"
                value={formData.salaryExpectation}
                onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label>Key Skills (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, TypeScript, PostgreSQL"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label>Interview Notes & Feedback</label>
              <textarea
                rows="3"
                placeholder="Add initial notes or interview feedback..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              <Save size={16} /> Save Candidate
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease;
        }

        .modal-content-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .modal-title-icon {
          color: var(--accent-orange);
        }

        .modal-header h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .modal-close-btn {
          padding: 0.35rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-hover);
        }

        .modal-form {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: var(--input-bg);
          color: var(--text-primary);
          font-size: 0.88rem;
          outline: none;
          transition: all var(--transition-fast);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--accent-orange);
          box-shadow: 0 0 0 3px var(--accent-orange-bg);
        }

        .rating-input-row {
          display: flex;
          gap: 0.4rem;
          padding: 0.3rem 0;
        }

        .star-btn {
          padding: 0.2rem;
          transition: transform var(--transition-fast);
        }

        .star-btn:hover {
          transform: scale(1.15);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-cancel {
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
        }

        .btn-cancel:hover {
          background-color: var(--bg-hover);
        }

        .btn-save {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.4rem;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFFFFF;
          background: linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-orange-hover) 100%);
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.35);
        }

        .btn-save:hover {
          transform: translateY(-1px);
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

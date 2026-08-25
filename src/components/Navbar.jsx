import React from 'react';
import { Users, Plus, Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, onOpenAddModal }) {
  return (
    <header className="navbar-container">
      <div className="navbar-brand">
        <div className="brand-logo-box">
          <Users className="brand-icon" size={24} />
        </div>
        <div className="brand-text">
          <div className="brand-title-row">
            <h1 className="brand-title">Recruitment & Interview Tracker</h1>
            <span className="live-badge">
              <span className="live-dot"></span>
              Live Pipeline
            </span>
          </div>
          <p className="brand-subtitle">
            Applicant Tracking System & Candidate Management
          </p>
        </div>
      </div>

      <div className="navbar-actions">
        <button 
          className="action-btn theme-toggle-btn" 
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={18} className="theme-icon sun" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} className="theme-icon moon" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        <button 
          className="add-candidate-btn" 
          onClick={() => onOpenAddModal()}
        >
          <Plus size={18} />
          <span>Add Candidate</span>
        </button>
      </div>

      <style>{`
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--card-shadow);
          transition: background-color var(--transition-normal), border-color var(--transition-normal);
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .brand-logo-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #FF9800 0%, #E65100 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .brand-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .brand-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          background-color: rgba(16, 185, 129, 0.12);
          color: #10B981;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }

        .brand-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .action-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-hover);
          border-color: var(--border-hover);
        }

        .theme-icon.sun {
          color: #F59E0B;
        }

        .theme-icon.moon {
          color: #8B5CF6;
        }

        .add-candidate-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFFFFF;
          background: linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-orange-hover) 100%);
          box-shadow: 0 4px 14px rgba(255, 152, 0, 0.4);
          transition: all var(--transition-fast);
        }

        .add-candidate-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(255, 152, 0, 0.5);
        }

        .add-candidate-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 900px) {
          .navbar-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .navbar-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </header>
  );
}

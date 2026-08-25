import React from 'react';
import { Columns3, Table, Calendar, BarChart3, Search, Filter } from 'lucide-react';
import { PIPELINE_STAGES, SOURCES } from '../data/initialData';

export default function FilterBar({
  activeView,
  onViewChange,
  searchQuery,
  onSearchChange,
  selectedStage,
  onStageChange,
  selectedSource,
  onSourceChange
}) {
  const views = [
    { id: 'pipeline', label: 'Pipeline', icon: Columns3 },
    { id: 'table', label: 'Table', icon: Table },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="filter-bar-container">
      <div className="view-switcher-group">
        {views.map((v) => {
          const Icon = v.icon;
          const isActive = activeView === v.id;
          return (
            <button
              key={v.id}
              className={`view-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onViewChange(v.id)}
            >
              <Icon size={16} />
              <span>{v.label}</span>
            </button>
          );
        })}
      </div>

      <div className="filters-search-group">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search candidates, roles, interviewers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="select-dropdown-wrapper">
          <select
            className="filter-select"
            value={selectedStage}
            onChange={(e) => onStageChange(e.target.value)}
          >
            <option value="all">All Stages</option>
            {PIPELINE_STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="select-dropdown-wrapper">
          <select
            className="filter-select"
            value={selectedSource}
            onChange={(e) => onSourceChange(e.target.value)}
          >
            <option value="all">All Sources</option>
            {SOURCES.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>
      </div>

      <style>{`
        .filter-bar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.25rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--card-shadow);
          flex-wrap: wrap;
        }

        .view-switcher-group {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background-color: var(--bg-surface-elevated);
          padding: 0.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .view-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 0.9rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .view-tab-btn:hover {
          color: var(--text-primary);
        }

        .view-tab-btn.active {
          background-color: var(--bg-surface);
          color: var(--accent-orange);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
        }

        .filters-search-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-grow: 1;
          justify-content: flex-end;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          position: relative;
          min-width: 280px;
          flex-grow: 1;
          max-width: 440px;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.55rem 0.85rem 0.55rem 2.4rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: var(--input-bg);
          color: var(--text-primary);
          font-size: 0.85rem;
          outline: none;
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          border-color: var(--accent-orange);
          box-shadow: 0 0 0 3px var(--accent-orange-bg);
        }

        .select-dropdown-wrapper {
          min-width: 140px;
        }

        .filter-select {
          width: 100%;
          padding: 0.55rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: var(--input-bg);
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 500;
          outline: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-select:hover {
          border-color: var(--border-hover);
        }

        .filter-select:focus {
          border-color: var(--accent-orange);
          box-shadow: 0 0 0 3px var(--accent-orange-bg);
        }

        @media (max-width: 900px) {
          .filter-bar-container {
            flex-direction: column;
            align-items: stretch;
          }
          .filters-search-group {
            justify-content: stretch;
          }
          .search-input-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

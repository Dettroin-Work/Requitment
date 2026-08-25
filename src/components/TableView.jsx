import React, { useState } from 'react';
import { PIPELINE_STAGES } from '../data/initialData';
import { Eye, Trash2, ArrowUpDown, Star, Mail, Phone, Calendar, UserCheck } from 'lucide-react';

export default function TableView({
  candidates,
  onMoveCandidate,
  onSelectCandidate,
  onDeleteCandidate
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortField, setSortField] = useState('appliedDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(candidates.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    let valA = a[sortField] || '';
    let valB = b[sortField] || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} candidate(s)?`)) {
      selectedIds.forEach((id) => onDeleteCandidate(id));
      setSelectedIds([]);
    }
  };

  return (
    <div className="table-view-container">
      {selectedIds.length > 0 && (
        <div className="bulk-actions-banner">
          <span>{selectedIds.length} candidate(s) selected</span>
          <button className="bulk-delete-btn" onClick={handleBulkDelete}>
            <Trash2 size={14} /> Delete Selected
          </button>
        </div>
      )}

      <div className="table-wrapper">
        <table className="candidate-table">
          <thead>
            <tr>
              <th className="checkbox-cell">
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === candidates.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th onClick={() => handleSort('name')} className="sortable-th">
                Candidate Name <ArrowUpDown size={13} />
              </th>
              <th onClick={() => handleSort('role')} className="sortable-th">
                Role / Dept <ArrowUpDown size={13} />
              </th>
              <th>Stage</th>
              <th onClick={() => handleSort('source')} className="sortable-th">
                Source <ArrowUpDown size={13} />
              </th>
              <th>Interviewer</th>
              <th>Interview Date</th>
              <th onClick={() => handleSort('rating')} className="sortable-th">
                Rating <ArrowUpDown size={13} />
              </th>
              <th className="actions-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-records-cell">
                  No candidate records found.
                </td>
              </tr>
            ) : (
              sortedCandidates.map((c) => {
                const currentStageObj = PIPELINE_STAGES.find((s) => s.id === c.stage);
                const isSelected = selectedIds.includes(c.id);

                return (
                  <tr
                    key={c.id}
                    className={`table-row ${isSelected ? 'row-selected' : ''}`}
                  >
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(c.id)}
                      />
                    </td>
                    <td className="candidate-cell" onClick={() => onSelectCandidate(c)}>
                      <div className="candidate-info">
                        <span className="candidate-name-text">{c.name}</span>
                        <span className="candidate-email-text">{c.email}</span>
                      </div>
                    </td>
                    <td>
                      <div className="role-dept-info">
                        <span className="role-title">{c.role}</span>
                        <span className="dept-tag">{c.department || 'General'}</span>
                      </div>
                    </td>
                    <td>
                      <select
                        className="stage-select-inline"
                        value={c.stage}
                        onChange={(e) => onMoveCandidate(c.id, e.target.value)}
                        style={{
                          borderColor: currentStageObj?.color || 'var(--border-color)',
                          color: currentStageObj?.color || 'var(--text-primary)'
                        }}
                      >
                        {PIPELINE_STAGES.map((st) => (
                          <option key={st.id} value={st.id}>
                            {st.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <span className="table-source-tag">{c.source}</span>
                    </td>
                    <td>
                      <span className="table-interviewer-tag">{c.interviewer || 'Unassigned'}</span>
                    </td>
                    <td>
                      <span className="table-date-text">
                        {c.interviewDate
                          ? `${c.interviewDate}${c.interviewTime ? ` (${c.interviewTime})` : ''}`
                          : 'Not set'}
                      </span>
                    </td>
                    <td>
                      <div className="rating-stars-inline">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <Star
                            key={starVal}
                            size={13}
                            fill={starVal <= (c.rating || 0) ? '#F59E0B' : 'transparent'}
                            color={starVal <= (c.rating || 0) ? '#F59E0B' : 'var(--text-muted)'}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="table-action-btns">
                        <button
                          className="table-icon-btn view"
                          title="View candidate details"
                          onClick={() => onSelectCandidate(c)}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          className="table-icon-btn delete"
                          title="Delete candidate"
                          onClick={() => onDeleteCandidate(c.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-view-container {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--card-shadow);
          overflow: hidden;
        }

        .bulk-actions-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          background-color: var(--accent-orange-bg);
          border-bottom: 1px solid var(--border-color);
          font-weight: 600;
          font-size: 0.88rem;
          color: var(--accent-orange);
        }

        .bulk-delete-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-sm);
          background-color: var(--accent-red);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .candidate-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
        }

        .candidate-table th {
          background-color: var(--bg-surface-elevated);
          padding: 0.85rem 1rem;
          font-weight: 700;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
          white-space: nowrap;
        }

        .sortable-th {
          cursor: pointer;
          user-select: none;
        }

        .sortable-th:hover {
          color: var(--text-primary);
        }

        .candidate-table td {
          padding: 0.9rem 1rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .table-row:hover {
          background-color: var(--bg-hover);
        }

        .row-selected {
          background-color: var(--accent-orange-bg) !important;
        }

        .checkbox-cell {
          width: 40px;
          text-align: center;
        }

        .candidate-cell {
          cursor: pointer;
        }

        .candidate-info {
          display: flex;
          flex-direction: column;
        }

        .candidate-name-text {
          font-weight: 700;
          color: var(--text-primary);
        }

        .candidate-email-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .role-dept-info {
          display: flex;
          flex-direction: column;
        }

        .role-title {
          font-weight: 600;
        }

        .dept-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .stage-select-inline {
          padding: 0.35rem 0.6rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-surface);
          font-size: 0.82rem;
          font-weight: 700;
          outline: none;
          cursor: pointer;
        }

        .table-source-tag {
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          font-size: 0.78rem;
          font-weight: 600;
        }

        .table-interviewer-tag {
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--accent-orange);
        }

        .table-date-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .rating-stars-inline {
          display: flex;
          gap: 0.15rem;
        }

        .actions-cell {
          width: 80px;
        }

        .table-action-btns {
          display: flex;
          gap: 0.4rem;
        }

        .table-icon-btn {
          padding: 0.35rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .table-icon-btn.view:hover {
          color: var(--accent-blue);
          background-color: var(--accent-blue-bg);
        }

        .table-icon-btn.delete:hover {
          color: var(--accent-red);
          background-color: var(--accent-red-bg);
        }

        .no-records-cell {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

import React from 'react';
import { Users, TrendingUp, Calendar, Award, UserCheck } from 'lucide-react';

export default function MetricsBar({ candidates }) {
  const totalApplicants = candidates.length;
  
  // Active pipeline are candidates not hired or rejected
  const activePipeline = candidates.filter(
    (c) => c.stage !== 'hired' && c.stage !== 'rejected'
  ).length;

  // Candidates currently in interview stages
  const interviewStagesCount = candidates.filter(
    (c) => ['1st_interview', 'technical', 'managerial'].includes(c.stage)
  ).length;

  const offersExtended = candidates.filter((c) => c.stage === 'offer').length;
  const totalHired = candidates.filter((c) => c.stage === 'hired').length;
  
  const hireRate = totalApplicants > 0 
    ? Math.round((totalHired / totalApplicants) * 100) 
    : 0;

  const metrics = [
    {
      title: 'Total Applicants',
      value: totalApplicants,
      sublabel: 'candidates',
      icon: Users,
      iconColor: '#94A3B8',
      bgGlow: 'rgba(148, 163, 184, 0.1)'
    },
    {
      title: 'Active Pipeline',
      value: activePipeline,
      sublabel: 'in progress',
      icon: TrendingUp,
      iconColor: '#FF9800',
      bgGlow: 'rgba(255, 152, 0, 0.15)',
      valueColor: '#FF9800'
    },
    {
      title: 'Interviews',
      value: interviewStagesCount,
      sublabel: 'active stages',
      icon: Calendar,
      iconColor: '#F59E0B',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      valueColor: '#F59E0B'
    },
    {
      title: 'Offers Extended',
      value: offersExtended,
      sublabel: 'pending response',
      icon: Award,
      iconColor: '#34D399',
      bgGlow: 'rgba(52, 211, 153, 0.15)',
      valueColor: '#34D399'
    },
    {
      title: 'Total Hired',
      value: totalHired,
      sublabel: `${hireRate}% conversion`,
      icon: UserCheck,
      iconColor: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      valueColor: '#10B981'
    }
  ];

  return (
    <div className="metrics-grid">
      {metrics.map((m, idx) => {
        const IconComponent = m.icon;
        return (
          <div className="metric-card" key={idx}>
            <div className="metric-header">
              <span className="metric-title">{m.title}</span>
              <div 
                className="metric-icon-wrapper" 
                style={{ backgroundColor: m.bgGlow, color: m.iconColor }}
              >
                <IconComponent size={18} />
              </div>
            </div>
            <div className="metric-body">
              <span className="metric-value" style={{ color: m.valueColor || 'var(--text-primary)' }}>
                {m.value}
              </span>
              <span className="metric-sublabel">{m.sublabel}</span>
            </div>
          </div>
        );
      })}

      <style>{`
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }

        .metric-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-shadow: var(--card-shadow);
          transition: all var(--transition-normal);
        }

        .metric-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
          box-shadow: var(--card-shadow-hover);
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .metric-icon-wrapper {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-body {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .metric-value {
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1;
        }

        .metric-sublabel {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 1200px) {
          .metrics-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

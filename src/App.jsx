import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MetricsBar from './components/MetricsBar';
import FilterBar from './components/FilterBar';
import PipelineView from './components/PipelineView';
import TableView from './components/TableView';
import ScheduleView from './components/ScheduleView';
import AnalyticsView from './components/AnalyticsView';
import CandidateModal from './components/CandidateModal';
import CandidateDrawer from './components/CandidateDrawer';
import { INITIAL_CANDIDATES } from './data/initialData';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ats_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ats_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Candidates State
  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem('ats_candidates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse candidates from localStorage', err);
      }
    }
    return INITIAL_CANDIDATES;
  });

  useEffect(() => {
    localStorage.setItem('ats_candidates', JSON.stringify(candidates));
  }, [candidates]);

  // Views & Filters State
  const [activeView, setActiveView] = useState('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');

  // Modal & Drawer State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateToEdit, setCandidateToEdit] = useState(null);
  const [modalInitialStage, setModalInitialStage] = useState('1st_interview');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Candidate Operations
  const handleMoveCandidate = (candidateId, newStage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate((prev) => (prev ? { ...prev, stage: newStage } : null));
    }
  };

  const handleSaveCandidate = (candidateData) => {
    if (candidateToEdit) {
      // Edit existing
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateToEdit.id ? { ...c, ...candidateData } : c))
      );
      if (selectedCandidate && selectedCandidate.id === candidateToEdit.id) {
        setSelectedCandidate((prev) => (prev ? { ...prev, ...candidateData } : null));
      }
    } else {
      // Add new
      const newCand = {
        id: `cand-${Date.now()}`,
        appliedDate: new Date().toISOString().split('T')[0],
        ...candidateData
      };
      setCandidates((prev) => [newCand, ...prev]);
    }
    setCandidateToEdit(null);
  };

  const handleDeleteCandidate = (candidateId) => {
    setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate(null);
    }
  };

  const handleUpdateScorecard = (candidateId, scorecardData) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, scorecard: scorecardData } : c))
    );
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate((prev) => (prev ? { ...prev, scorecard: scorecardData } : null));
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset candidate pipeline to default sample data?')) {
      setCandidates(INITIAL_CANDIDATES);
      localStorage.setItem('ats_candidates', JSON.stringify(INITIAL_CANDIDATES));
    }
  };

  const handleOpenAddModal = (stageId = '1st_interview') => {
    setCandidateToEdit(null);
    setModalInitialStage(stageId);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (candidate) => {
    setCandidateToEdit(candidate);
    setIsModalOpen(true);
  };

  // Filter Candidates
  const filteredCandidates = candidates.filter((c) => {
    // Stage Filter
    if (selectedStage !== 'all' && c.stage !== selectedStage) return false;
    // Source Filter
    if (selectedSource !== 'all' && c.source !== selectedSource) return false;
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (c.name || '').toLowerCase().includes(q);
      const matchRole = (c.role || '').toLowerCase().includes(q);
      const matchInterviewer = (c.interviewer || '').toLowerCase().includes(q);
      const matchEmail = (c.email || '').toLowerCase().includes(q);
      const matchSkills = Array.isArray(c.skills)
        ? c.skills.some((s) => s.toLowerCase().includes(q))
        : false;

      if (!matchName && !matchRole && !matchInterviewer && !matchEmail && !matchSkills) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAddModal={handleOpenAddModal}
        onResetData={handleResetData}
      />

      {/* Dynamic 5 Metric Cards */}
      <MetricsBar candidates={candidates} />

      {/* Filter & View Switching Bar */}
      <FilterBar
        activeView={activeView}
        onViewChange={setActiveView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStage={selectedStage}
        onStageChange={setSelectedStage}
        selectedSource={selectedSource}
        onSourceChange={setSelectedSource}
      />

      {/* Active View Container */}
      <main className="main-content-view animate-fade-in" key={activeView}>
        {activeView === 'pipeline' && (
          <PipelineView
            candidates={filteredCandidates}
            onMoveCandidate={handleMoveCandidate}
            onOpenAddModal={handleOpenAddModal}
            onSelectCandidate={setSelectedCandidate}
            onDeleteCandidate={handleDeleteCandidate}
          />
        )}

        {activeView === 'table' && (
          <TableView
            candidates={filteredCandidates}
            onMoveCandidate={handleMoveCandidate}
            onSelectCandidate={setSelectedCandidate}
            onDeleteCandidate={handleDeleteCandidate}
          />
        )}

        {activeView === 'schedule' && (
          <ScheduleView
            candidates={filteredCandidates}
            onSelectCandidate={setSelectedCandidate}
          />
        )}

        {activeView === 'analytics' && (
          <AnalyticsView candidates={candidates} />
        )}
      </main>

      {/* Candidate Add / Edit Modal */}
      <CandidateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCandidateToEdit(null);
        }}
        onSave={handleSaveCandidate}
        candidateToEdit={candidateToEdit}
        initialStage={modalInitialStage}
      />

      {/* Candidate Details & Evaluation Drawer */}
      <CandidateDrawer
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onMoveCandidate={handleMoveCandidate}
        onEditCandidate={handleOpenEditModal}
        onDeleteCandidate={handleDeleteCandidate}
        onUpdateScorecard={handleUpdateScorecard}
      />
    </div>
  );
}

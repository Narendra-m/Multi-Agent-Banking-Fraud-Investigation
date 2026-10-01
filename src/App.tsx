import React, { useState } from 'react';
import { MODULES_DATA } from './data/modulesData';
import { PhaseViewer } from './components/PhaseViewer';
import { PhaseNavigation } from './components/PhaseNavigation';
import { Navbar } from './components/Navbar';
import { CaseSimulatorModal } from './components/CaseSimulator/CaseSimulatorModal';
import { MockInterviewView } from './components/MockInterview/MockInterviewView';
import { CheatSheetModal } from './components/CheatSheetModal';
import { GlossaryModal } from './components/GlossaryModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'course' | 'simulator' | 'interview'>('course');
  const [activePhaseId, setActivePhaseId] = useState<string>('phase-1');
  const [completedPhaseIds, setCompletedPhaseIds] = useState<string[]>(['phase-1']);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [showGlossary, setShowGlossary] = useState<boolean>(false);

  const activePhase = MODULES_DATA.find((p) => p.id === activePhaseId) || MODULES_DATA[0];

  const handleSelectPhase = (phaseId: string) => {
    setActivePhaseId(phaseId);
    if (!completedPhaseIds.includes(phaseId)) {
      setCompletedPhaseIds([...completedPhaseIds, phaseId]);
    }
    setActiveTab('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Sticky Header */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCheatSheet={() => setShowCheatSheet(true)}
        onOpenGlossary={() => setShowGlossary(true)}
        currentPhaseNumber={activePhase.number}
        totalPhases={MODULES_DATA.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'course' && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <PhaseNavigation
              phases={MODULES_DATA}
              activePhaseId={activePhaseId}
              onSelectPhase={handleSelectPhase}
              completedPhaseIds={completedPhaseIds}
            />

            <div className="flex-1 min-w-0 w-full">
              <PhaseViewer
                phase={activePhase}
                onSelectPhase={handleSelectPhase}
                allPhases={MODULES_DATA}
                onOpenSimulator={() => setActiveTab('simulator')}
                onOpenMockInterview={() => setActiveTab('interview')}
              />
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="animate-fadeIn">
            <CaseSimulatorModal />
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="animate-fadeIn">
            <MockInterviewView />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-500 text-xs py-6 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Apex Bank Architectural Learning Sandbox • 100% Synthetic Read-Only Environment</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Regulatory Boundary: Human-in-the-Loop Enforced</span>
            <span>•</span>
            <button
              onClick={() => setShowCheatSheet(true)}
              className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
            >
              1-Page Blueprint
            </button>
            <span>•</span>
            <button
              onClick={() => setShowGlossary(true)}
              className="text-purple-400 hover:text-purple-300 underline cursor-pointer"
            >
              Glossary
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showCheatSheet && <CheatSheetModal onClose={() => setShowCheatSheet(false)} />}
      {showGlossary && <GlossaryModal onClose={() => setShowGlossary(false)} />}
    </div>
  );
}

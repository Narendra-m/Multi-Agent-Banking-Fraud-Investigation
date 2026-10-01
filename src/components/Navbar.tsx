import React from 'react';
import { Shield, Play, Award, FileText, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: 'course' | 'simulator' | 'interview';
  onSelectTab: (tab: 'course' | 'simulator' | 'interview') => void;
  onOpenCheatSheet: () => void;
  onOpenGlossary: () => void;
  currentPhaseNumber: number;
  totalPhases: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenCheatSheet,
  onOpenGlossary,
  currentPhaseNumber,
  totalPhases,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl shadow-md shadow-cyan-900/40">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-100">
                Multi-Agent Fraud Lab
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 rounded border border-cyan-800">
                STAFF ARCHITECT EDITION
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              Apex Bank Case #ALT-84920 • Regulated Multi-Agent Copilot Architecture
            </div>
          </div>
        </div>

        {/* Primary View Navigation */}
        <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => onSelectTab('course')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              currentTab === 'course'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Curriculum</span>
          </button>

          <button
            onClick={() => onSelectTab('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              currentTab === 'simulator'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-cyan-400" />
            <span>Case Simulator</span>
          </button>

          <button
            onClick={() => onSelectTab('interview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              currentTab === 'interview'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Mock Interview</span>
          </button>
        </nav>

        {/* Reference Quick Links */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCheatSheet}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-cyan-300 rounded-lg text-xs font-medium border border-slate-800 transition-all cursor-pointer"
            title="Download/Copy 1-Page Architect Blueprint"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">1-Page Blueprint</span>
          </button>

          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-cyan-300 rounded-lg text-xs font-medium border border-slate-800 transition-all cursor-pointer"
            title="Acronym Glossary"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Glossary</span>
          </button>
        </div>
      </div>
    </header>
  );
};

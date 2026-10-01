import React from 'react';
import { Phase } from '../types';
import { CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';

interface PhaseNavigationProps {
  phases: Phase[];
  activePhaseId: string;
  onSelectPhase: (phaseId: string) => void;
  completedPhaseIds: string[];
}

export const PhaseNavigation: React.FC<PhaseNavigationProps> = ({
  phases,
  activePhaseId,
  onSelectPhase,
  completedPhaseIds,
}) => {
  const categories = [
    'Fundamentals',
    'Architecture',
    'Agents & RAG',
    'Data & Reliability',
    'Enterprise Operations',
    'Interview Mastery',
  ] as const;

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-white">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <h2 className="font-bold text-xs uppercase tracking-wider text-slate-300">
            15 Learning Phases
          </h2>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
          {completedPhaseIds.length}/{phases.length} Read
        </span>
      </div>

      <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
        {categories.map((category) => {
          const categoryPhases = phases.filter(p => p.category === category);
          if (categoryPhases.length === 0) return null;

          return (
            <div key={category} className="space-y-1">
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2 py-0.5">
                {category}
              </div>

              {categoryPhases.map((phase) => {
                const isActive = phase.id === activePhaseId;
                const isCompleted = completedPhaseIds.includes(phase.id);

                return (
                  <button
                    key={phase.id}
                    onClick={() => onSelectPhase(phase.id)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-200 border border-cyan-500 font-semibold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/70 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] shrink-0 ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : isCompleted
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {phase.number}
                      </span>
                      <span className="truncate">{phase.shortTitle}</span>
                    </div>

                    {isCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { Phase } from '../types';
import { SystemContextDiagram } from './InteractiveDiagrams/SystemContextDiagram';
import { ComponentArchitectureDiagram } from './InteractiveDiagrams/ComponentArchitectureDiagram';
import { SequenceDiagramViewer } from './InteractiveDiagrams/SequenceDiagramViewer';
import { AgentResponsibilityMatrix } from './InteractiveDiagrams/AgentResponsibilityMatrix';
import { DataModelInspector } from './InteractiveDiagrams/DataModelInspector';
import {
  CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, HelpCircle,
  Shield, Lightbulb, Terminal, Clock, FileCode, Award, Play, ChevronRight,
  BookOpen
} from 'lucide-react';

interface PhaseViewerProps {
  phase: Phase;
  onSelectPhase: (phaseId: string) => void;
  allPhases: Phase[];
  onOpenSimulator: () => void;
  onOpenMockInterview: () => void;
}

export const PhaseViewer: React.FC<PhaseViewerProps> = ({
  phase,
  onSelectPhase,
  allPhases,
  onOpenSimulator,
  onOpenMockInterview,
}) => {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState<boolean>(false);
  const [showInterviewFollowups, setShowInterviewFollowups] = useState<boolean>(false);

  const currentIndex = allPhases.findIndex(p => p.id === phase.id);
  const prevPhase = currentIndex > 0 ? allPhases[currentIndex - 1] : null;
  const nextPhase = currentIndex < allPhases.length - 1 ? allPhases[currentIndex + 1] : null;

  // Render appropriate interactive diagram based on phase
  const renderDiagram = () => {
    switch (phase.architectureDiagramType) {
      case 'system-context':
        return <SystemContextDiagram />;
      case 'component':
        return <ComponentArchitectureDiagram />;
      case 'sequence-happy':
      case 'sequence-failure':
        return <SequenceDiagramViewer />;
      case 'agent-matrix':
        return <AgentResponsibilityMatrix />;
      case 'data-model':
      case 'eval-matrix':
      case 'deployment-cloud':
      default:
        return <DataModelInspector />;
    }
  };

  const handleQuizSelect = (idx: number) => {
    setSelectedQuizAnswer(idx);
    setHasSubmittedQuiz(true);
  };

  const handleResetQuiz = () => {
    setSelectedQuizAnswer(null);
    setHasSubmittedQuiz(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-16">
      {/* Module Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 font-bold">
              PHASE {phase.number} OF {allPhases.length}
            </span>
            <span>•</span>
            <span className="text-slate-400 font-semibold">{phase.category}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Estimated Study Time: {phase.timeEstimate}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
          {phase.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
          {phase.summary}
        </p>

        {/* Key Takeaways */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" /> Core Architectural Invariants:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            {phase.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distributed Systems Bridge (Java / Spring / Kafka / AWS) */}
      <div className="bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900 border border-cyan-800/60 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          The Distributed Systems Bridge (For Java, Spring Boot & Kafka Architects)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
          <div className="bg-slate-900/90 border border-slate-800 rounded p-3">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Familiar Distributed Systems Concept:</span>
            <div className="text-sm font-bold text-slate-100 mt-0.5">{phase.distributedSystemAnalogy.familiarConcept}</div>
          </div>
          <div className="bg-slate-900/90 border border-cyan-900/80 rounded p-3">
            <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">Enterprise AI Equivalent:</span>
            <div className="text-sm font-bold text-cyan-300 mt-0.5">{phase.distributedSystemAnalogy.aiConcept}</div>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded border border-slate-800/80">
          {phase.distributedSystemAnalogy.explanation}
        </p>
      </div>

      {/* Plain Language Detailed Explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-7 shadow-xl text-slate-200 text-sm leading-relaxed space-y-4">
        <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2 pb-2 border-b border-slate-800">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          System Architecture Deep Dive
        </h2>
        <div className="whitespace-pre-line text-slate-300 text-xs sm:text-sm leading-relaxed">
          {phase.plainLanguageExplanation}
        </div>
      </div>

      {/* Interactive Diagram Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-mono uppercase font-bold text-cyan-400">Interactive Architecture Diagram</span>
          <span>Click nodes & steps to inspect state transitions</span>
        </div>
        {renderDiagram()}
      </div>

      {/* Concrete Banking Copilot Example (Alert #ALT-84920) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-amber-950 text-amber-400 rounded border border-amber-800">
              <Shield className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-sm text-slate-100">
              Real-World Concrete Example: {phase.concreteExample.title}
            </h3>
          </div>
          <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
            Case #ALT-84920
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Alert Scenario:</span>
            <p className="text-slate-300 mt-0.5">{phase.concreteExample.alertContext}</p>
          </div>

          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Copilot Action Taken:</span>
            <p className="text-slate-300 mt-0.5">{phase.concreteExample.actionTaken}</p>
          </div>

          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Live Data Payload:</span>
            <pre className="font-mono text-[11px] text-cyan-200 bg-slate-950 p-3 rounded mt-1 overflow-x-auto max-h-[160px] border border-slate-800">
              {JSON.stringify(phase.concreteExample.samplePayload, null, 2)}
            </pre>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/80 p-2.5 rounded text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Governance Invariant Verification:</strong> {phase.concreteExample.governanceCheck}</span>
          </div>
        </div>
      </div>

      {/* Design Decisions & Trade-Offs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-slate-100 mb-3 pb-2 border-b border-slate-800 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          Architectural Decisions & Trade-Off Analysis
        </h3>

        <div className="space-y-3">
          {phase.designDecisions.map((dd, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <span className="font-bold text-slate-100 text-sm">{dd.decision}</span>
                <span className="text-cyan-300 font-mono bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 self-start sm:self-auto">
                  Selected: {dd.chosenOption}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-slate-300 pt-2 border-t border-slate-900">
                <div>
                  <span className="text-slate-400 font-semibold">Architectural Justification:</span>
                  <p className="mt-0.5">{dd.justification}</p>
                </div>
                <div>
                  <span className="text-amber-400 font-semibold">Explicit Engineering Trade-Off:</span>
                  <p className="mt-0.5">{dd.tradeoffs}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Failure Modes & Mitigations */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-slate-100 mb-3 pb-2 border-b border-slate-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Production Failure Modes & Circuit Breakers
        </h3>

        <div className="space-y-3">
          {phase.commonFailureModes.map((fm, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-xs">
              <div className="font-bold text-rose-300 text-sm mb-1">{fm.scenario}</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300 mt-2">
                <div>
                  <span className="text-slate-400 font-semibold">Root Cause:</span>
                  <p className="mt-0.5">{fm.cause}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">System Mitigation:</span>
                  <p className="mt-0.5 text-emerald-300">{fm.mitigation}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Investigator Experience:</span>
                  <p className="mt-0.5 text-cyan-200">{fm.investigatorExperience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Hands-On Quiz */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-cyan-950 text-cyan-400 rounded border border-cyan-800">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-sm text-slate-100">
              Phase {phase.number} Knowledge Check (Staff Architect Level)
            </h3>
          </div>
          {hasSubmittedQuiz && (
            <button
              onClick={handleResetQuiz}
              className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
            >
              Retry Quiz
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm font-semibold text-slate-200 mb-4">
          {phase.handsOnQuiz.question}
        </p>

        <div className="space-y-2 mb-4">
          {phase.handsOnQuiz.options.map((opt, idx) => {
            const isSelected = selectedQuizAnswer === idx;
            const isCorrect = idx === phase.handsOnQuiz.correctIndex;

            let buttonStyle = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700';

            if (hasSubmittedQuiz) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 line-through';
              } else {
                buttonStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200 font-semibold';
            }

            return (
              <button
                key={idx}
                onClick={() => !hasSubmittedQuiz && handleQuizSelect(idx)}
                disabled={hasSubmittedQuiz}
                className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${buttonStyle}`}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border border-slate-700">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="mt-0.5 leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {hasSubmittedQuiz && (
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2 text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              {selectedQuizAnswer === phase.handsOnQuiz.correctIndex ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Correct Architect Answer!
                </span>
              ) : (
                <span className="text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" /> Incorrect Choice.
                </span>
              )}
            </div>
            <p className="text-slate-300 leading-relaxed">{phase.handsOnQuiz.explanation}</p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-300 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span><strong>Staff Architect Interview Tip:</strong> {phase.handsOnQuiz.architectTip}</span>
            </div>
          </div>
        )}
      </div>

      {/* Senior / Staff Architect Interview Deep Dive */}
      <div className="bg-slate-900 border border-cyan-900/60 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-slate-100">
              Senior / Staff Architect Interview Question & Defense
            </h3>
          </div>
          <button
            onClick={onOpenMockInterview}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold cursor-pointer"
          >
            Launch Mock Interview Lab <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Candidate Question:</span>
            <h4 className="text-sm font-bold text-slate-100 mt-1">{phase.interviewDeepDive.primaryQuestion}</h4>
            <div className="text-[11px] text-cyan-400 mt-1.5 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span><strong>Interviewer is probing:</strong> {phase.interviewDeepDive.whatInterviewerIsTesting}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Structured Architect Answer:</span>
            <div className="whitespace-pre-line text-slate-300 bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 mt-1 font-sans text-xs leading-relaxed">
              {phase.interviewDeepDive.structuredAnswer}
            </div>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-800/60 p-3 rounded-lg">
            <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
              Concise 60-Second Senior Architect Elevator Pitch:
            </span>
            <p className="text-emerald-200 font-medium mt-1 italic">
              "{phase.interviewDeepDive.conciseSeniorAnswer}"
            </p>
          </div>

          {/* Follow-up probe toggle */}
          <div>
            <button
              onClick={() => setShowInterviewFollowups(!showInterviewFollowups)}
              className="text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer pt-1"
            >
              {showInterviewFollowups ? 'Hide Likely Follow-up Questions' : 'Show Likely Interviewer Follow-Up Questions (2)'}
            </button>

            {showInterviewFollowups && (
              <ul className="mt-2 space-y-1 bg-slate-950 p-3 rounded border border-slate-800 text-slate-300 text-xs animate-fadeIn">
                {phase.interviewDeepDive.likelyFollowUps.map((fu, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">Q{idx + 1}:</span>
                    <span>{fu}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
        {prevPhase ? (
          <button
            onClick={() => onSelectPhase(prevPhase.id)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-lg transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="text-left">
              <span className="text-[10px] text-slate-500 block font-mono">PREVIOUS</span>
              <span className="font-semibold">{prevPhase.shortTitle}</span>
            </div>
          </button>
        ) : <div />}

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-all cursor-pointer shadow-md"
          >
            <Play className="w-3.5 h-3.5" /> Launch Case Simulator
          </button>
        </div>

        {nextPhase ? (
          <button
            onClick={() => onSelectPhase(nextPhase.id)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-lg transition-all cursor-pointer text-right"
          >
            <div>
              <span className="text-[10px] text-slate-500 block font-mono">NEXT</span>
              <span className="font-semibold">{nextPhase.shortTitle}</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};

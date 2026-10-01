import React, { useState } from 'react';
import { AGENT_DEFINITIONS } from '../../data/syntheticCase';
import { AgentDefinition } from '../../types';
import { Shield, CheckCircle2, XCircle, AlertTriangle, Cpu, Terminal } from 'lucide-react';

export const AgentResponsibilityMatrix: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-coordinator');
  const [tierFilter, setTierFilter] = useState<string>('ALL');

  const filteredAgents = tierFilter === 'ALL'
    ? AGENT_DEFINITIONS
    : AGENT_DEFINITIONS.filter(a => a.tier === tierFilter);

  const selectedAgent: AgentDefinition = AGENT_DEFINITIONS.find(a => a.id === selectedAgentId) || AGENT_DEFINITIONS[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Agent Responsibility & Boundary Matrix (8 Specialized Roles)
          </h3>
          <p className="text-xs text-slate-400">
            Define purpose, permitted tools, strict output schemas, failure fallbacks, and prohibited mutations for every agent.
          </p>
        </div>

        {/* Tier filter */}
        <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          {['ALL', 'Coordinator', 'Specialist', 'Reviewer', 'Synthesizer', 'Governance'].map(tier => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-2 py-0.5 rounded font-medium transition-all ${
                tierFilter === tier
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left List of Agents */}
        <div className="lg:col-span-4 space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
          {filteredAgents.map(agent => {
            const isSelected = agent.id === selectedAgentId;
            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all text-xs ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                    : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    agent.isDeterministic ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {agent.isDeterministic ? 'DETERMINISTIC' : 'LLM REASONER'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{agent.tier}</span>
                </div>
                <div className="font-semibold text-slate-100">{agent.name}</div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">{agent.role}</div>
              </div>
            );
          })}
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-lg p-5 text-xs">
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-cyan-300">{selectedAgent.name}</span>
                <span className="text-[11px] font-mono text-slate-400">({selectedAgent.role})</span>
              </div>
              <p className="text-slate-300 text-xs mt-1.5">{selectedAgent.purpose}</p>
            </div>
            <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold shrink-0 ${
              selectedAgent.isDeterministic
                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                : 'bg-blue-950 text-blue-300 border border-blue-800'
            }`}>
              {selectedAgent.isDeterministic ? 'Deterministic Code' : 'LLM Model (Gemini)'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Permitted Inputs & Tools */}
            <div className="space-y-3">
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Permitted Inputs:</span>
                <ul className="mt-1 space-y-1">
                  {selectedAgent.permittedInputs.map((input, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-slate-200 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      {input}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Permitted Tools:</span>
                <ul className="mt-1 space-y-1">
                  {selectedAgent.permittedTools.map((tool, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-amber-300 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      <Terminal className="w-3 h-3 text-amber-400 shrink-0" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Deterministic Rationale:</span>
                <p className="text-slate-300 mt-1 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
                  {selectedAgent.deterministicRationale}
                </p>
              </div>
            </div>

            {/* Schemas, Prohibited Actions, Failure */}
            <div className="space-y-3">
              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Output Schema Contract:</span>
                <p className="text-cyan-300 font-mono mt-1 text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
                  {selectedAgent.outputSchemaDescription}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Failure & Degraded Behavior:</span>
                <p className="text-slate-300 mt-1 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  {selectedAgent.failureBehavior}
                </p>
              </div>

              <div>
                <span className="text-rose-400 font-semibold uppercase tracking-wider text-[10px]">Strictly Prohibited Actions:</span>
                <ul className="mt-1 space-y-1">
                  {selectedAgent.prohibitedActions.map((prohibited, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-rose-300 text-[11px] bg-rose-950/40 px-2 py-1 rounded border border-rose-900/60">
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      {prohibited}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

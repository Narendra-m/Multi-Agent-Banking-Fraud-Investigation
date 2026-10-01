import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { BookOpen, Search, X, Layers, Cpu, Shield, Database } from 'lucide-react';

interface GlossaryModalProps {
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Architecture', 'AI & LLM', 'Security', 'Banking', 'Reliability'];

  const filtered = GLOSSARY_TERMS.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      (term.acronym && term.acronym.toLowerCase().includes(search.toLowerCase())) ||
      term.definition.toLowerCase().includes(search.toLowerCase());

    const matchesCat = activeCategory === 'ALL' || term.category === activeCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-base text-slate-100">Enterprise AI & Distributed Systems Glossary</h3>
              <p className="text-xs text-slate-400">All acronyms and architectural concepts mapped to distributed systems parallels.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search acronym or term (e.g. HITL, RAG, DLQ, CDC)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-600 text-white font-semibold'
                    : 'bg-slate-850 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term Cards */}
        <div className="p-6 overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center text-slate-500 py-10 text-xs">No matching terms found.</div>
          ) : (
            filtered.map((item, idx) => (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-cyan-300">{item.term}</span>
                    {item.acronym && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {item.acronym}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {item.category}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed mb-2.5">{item.definition}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-semibold">Distributed Systems Parallel:</span>
                    <p className="text-amber-300/90 font-mono mt-0.5">{item.distributedSystemParallel || item.distributedSystemAnalogy}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">In Fraud Copilot:</span>
                    <p className="text-slate-300 mt-0.5">{item.usageInCopilot}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

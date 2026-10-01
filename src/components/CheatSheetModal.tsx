import React, { useState } from 'react';
import { ARCHITECT_ONE_PAGE_SUMMARY } from '../data/glossary';
import { FileText, Copy, Check, X, Download } from 'lucide-react';

interface CheatSheetModalProps {
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ARCHITECT_ONE_PAGE_SUMMARY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-base text-slate-100">Architect's One-Page Executive Blueprint</h3>
              <p className="text-xs text-slate-400">Complete architectural reference guide for Staff/Principal interviews and design reviews.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied to Clipboard' : 'Copy Markdown'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/60 select-text">
          <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200">
            {ARCHITECT_ONE_PAGE_SUMMARY}
          </pre>
        </div>
      </div>
    </div>
  );
};

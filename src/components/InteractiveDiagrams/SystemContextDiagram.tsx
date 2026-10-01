import React, { useState } from 'react';
import { Shield, User, Database, Cpu, ArrowRight, CheckCircle2, Lock, Radio } from 'lucide-react';

export const SystemContextDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('copilot');

  const nodes: Record<string, { title: string; subtitle: string; role: string; protocols: string; dataOwned: string; boundary: string }> = {
    investigator: {
      title: 'Human Fraud Investigator',
      subtitle: 'Accredited Bank Operator',
      role: 'Sole authoritative actor possessing legal mandate to execute adverse actions (card block, account freeze, customer contact).',
      protocols: 'HTTPS / WSS via Mutual TLS, Role-Based Access Control (RBAC).',
      dataOwned: 'Adjudication decisions, manual investigation notes, compliance sign-offs.',
      boundary: 'External Human Actor (Human-in-the-Loop Governance Boundary).',
    },
    copilot: {
      title: 'Fraud Investigation Copilot',
      subtitle: 'Multi-Agent Advisory System',
      role: 'Orchestrates specialist agents, queries read-only core services, searches policy vectors, cross-checks evidence, flags contradictions.',
      protocols: 'gRPC internal, REST, Kafka consumer, OTel tracing.',
      dataOwned: 'Investigation state machine, agent scratchpads, evidence correlation graph.',
      boundary: 'Advisory Boundary (Strictly Zero Mutating Capabilities).',
    },
    kafka: {
      title: 'Enterprise Event Bus (Kafka)',
      subtitle: 'Asynchronous Ingestion Backbone',
      role: 'Buffers real-time transaction anomaly alerts from detection engines. Partitioned by customerId for sequential consistency.',
      protocols: 'Kafka Protocol (TCP / SASL_SSL), Dead-Letter Queue (DLQ).',
      dataOwned: 'Alert payloads, schema registry contracts, audit event streams.',
      boundary: 'Enterprise Messaging Boundary.',
    },
    bankingCore: {
      title: 'Core Banking & Telemetry Services',
      subtitle: 'Read-Only Service Layer',
      role: 'Provides transactional ledgers, 90-day moving averages, travel notices, and cyber-telemetry via isolated read-replicas.',
      protocols: 'mTLS REST / gRPC with fine-grained read-only OAuth scopes.',
      dataOwned: 'Financial ledgers, customer CRM, travel notices, device fingerprints.',
      boundary: 'Core Ledger Protection Perimeter (Bulkhead Isolation).',
    },
    modelGateway: {
      title: 'Enterprise Model Gateway',
      subtitle: 'LLM Abstraction & Security Proxy',
      role: 'Enforces prompt token budgets, semantic context caching, circuit breakers (Resilience4j), and calls Gemini 3.8 Flash.',
      protocols: 'Private Service Connect / VPC Service Controls over HTTPS.',
      dataOwned: 'Cached prompt embeddings, token usage meters, model latency metrics.',
      boundary: 'AI Provider Isolation Perimeter.',
    },
    auditLog: {
      title: 'Immutable Audit Ledger (WORM)',
      subtitle: 'Compliance & Forensic Vault',
      role: 'Appends SHA-256 hash-chained event records for every agent step, tool call, and human decision. Enforces 7-year GLBA retention.',
      protocols: 'Append-only gRPC / WORM Object Storage.',
      dataOwned: 'Cryptographic non-repudiation audit trail, full tool input/output captures.',
      boundary: 'Regulatory Non-Repudiation Vault.',
    },
  };

  const current = nodes[selectedNode];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl text-white">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            System Context Diagram (C4 Level 1)
          </h3>
          <p className="text-xs text-slate-400">Click any system component to inspect its data ownership, boundary fences, and communication protocols.</p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" /> HITL Regulated Boundary
        </span>
      </div>

      {/* Interactive Map Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Left Column: Intake & Events */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => setSelectedNode('kafka')}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedNode === 'kafka'
                ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950'
                : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400">EVENT_INGESTION</span>
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div className="font-semibold text-sm mt-1">Kafka Alert Stream</div>
            <div className="text-xs text-slate-400 mt-1">Topic: fraud.alerts.v1 (Partitioned by customerId)</div>
          </div>

          <div
            onClick={() => setSelectedNode('bankingCore')}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedNode === 'bankingCore'
                ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950'
                : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400">READ_ONLY_CORE</span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-semibold text-sm mt-1">Core Banking & Telemetry</div>
            <div className="text-xs text-slate-400 mt-1">Read-Replicas (Transactions, CRM, Devices)</div>
          </div>
        </div>

        {/* Center Column: The Multi-Agent Copilot */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => setSelectedNode('copilot')}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden ${
              selectedNode === 'copilot'
                ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/80 border-cyan-400 shadow-xl shadow-cyan-900/40 ring-1 ring-cyan-400'
                : 'bg-slate-800/80 border-cyan-700/60 hover:border-cyan-500'
            }`}
          >
            <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-bl">
              CORE SYSTEM
            </div>
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-base">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Multi-Agent Fraud Copilot
            </div>
            <p className="text-xs text-slate-300 mt-2">
              DAG Orchestrator + 6 Specialist Agents + RAG Policy Engine. Strictly advisory; zero mutation authority.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-slate-300 rounded">Temporal DAG</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-slate-300 rounded">pgvector</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-slate-300 rounded">OTel Tracing</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedNode('auditLog')}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedNode === 'auditLog'
                ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950'
                : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400">COMPLIANCE_VAULT</span>
              <Lock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="font-semibold text-sm mt-1">Immutable Audit Ledger</div>
            <div className="text-xs text-slate-400 mt-1">WORM Append-Only Log (7-Year GLBA Retention)</div>
          </div>
        </div>

        {/* Right Column: Human Operator & Model Gateway */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => setSelectedNode('investigator')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedNode === 'investigator'
                ? 'bg-emerald-950/70 border-emerald-400 shadow-md shadow-emerald-950'
                : 'bg-slate-800/60 border-emerald-800/60 hover:border-emerald-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400">AUTHORITATIVE_ACTOR</span>
              <User className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-semibold text-sm mt-1">Human Fraud Investigator</div>
            <div className="text-xs text-slate-300 mt-1">Owns 100% of mutation decisions (Freeze / Clear / Escalate)</div>
          </div>

          <div
            onClick={() => setSelectedNode('modelGateway')}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedNode === 'modelGateway'
                ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950'
                : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400">FOUNDATION_AI</span>
              <Cpu className="w-4 h-4 text-blue-400" />
            </div>
            <div className="font-semibold text-sm mt-1">Model Gateway (Gemini API)</div>
            <div className="text-xs text-slate-400 mt-1">Rate limits, semantic caching, circuit breakers</div>
          </div>
        </div>
      </div>

      {/* Node Detail Drawer */}
      <div className="bg-slate-950/90 border border-slate-700 rounded-lg p-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="font-bold text-cyan-300 text-sm">{current.title}</span>
            <span className="text-xs text-slate-400">({current.subtitle})</span>
          </div>
          <span className="text-xs font-mono bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-slate-700">
            {current.boundary}
          </span>
        </div>
        <p className="text-xs text-slate-300 mb-3">{current.role}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
          <div>
            <span className="text-slate-400 font-semibold">Protocols & Security:</span>
            <p className="text-slate-200 font-mono mt-0.5">{current.protocols}</p>
          </div>
          <div>
            <span className="text-slate-400 font-semibold">Data & State Owned:</span>
            <p className="text-slate-200 mt-0.5">{current.dataOwned}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

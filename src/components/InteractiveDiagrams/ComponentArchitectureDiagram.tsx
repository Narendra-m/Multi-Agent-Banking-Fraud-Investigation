import React, { useState } from 'react';
import { Layers, Cpu, Database, Network, ShieldAlert, Sparkles, Activity, FileText } from 'lucide-react';

export const ComponentArchitectureDiagram: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'all' | 'orchestration' | 'agents' | 'data' | 'governance'>('all');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Component Architecture (C4 Level 2/3)
          </h3>
          <p className="text-xs text-slate-400">Detailed component breakdown of the orchestration engine, specialist agent workers, and storage tiers.</p>
        </div>

        {/* Tier Filters */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          {(['all', 'orchestration', 'agents', 'data', 'governance'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-2.5 py-1 rounded capitalize font-medium transition-all ${
                activeTier === tier
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Tier 1: Ingestion & API Layer */}
        {(activeTier === 'all' || activeTier === 'orchestration') && (
          <div className="border border-slate-800 bg-slate-950/60 rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <Network className="w-4 h-4" /> Tier 1: Ingestion & Ingress Gateway
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-900/90 border border-slate-800 rounded p-3 text-xs">
                <div className="font-semibold text-slate-200">Kafka Alert Consumer</div>
                <div className="text-slate-400 text-[11px] mt-1">Topic: `fraud.alerts.v1`. Idempotency deduplication via Redis SETNX.</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded p-3 text-xs">
                <div className="font-semibold text-slate-200">Investigator REST/WSS Gateway</div>
                <div className="text-slate-400 text-[11px] mt-1">Mutual TLS (mTLS), JWT Auth, W3C traceparent propagation.</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded p-3 text-xs">
                <div className="font-semibold text-rose-400">Dead-Letter Queue (DLQ)</div>
                <div className="text-slate-400 text-[11px] mt-1">Isolates schema-violating poison pill alerts after 3 retries.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tier 2: Orchestration & State Machine */}
        {(activeTier === 'all' || activeTier === 'orchestration') && (
          <div className="border border-cyan-900/50 bg-cyan-950/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-cyan-400" /> Tier 2: Orchestration Engine (Acyclic DAG)
              </div>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                Global SLA: 4.0s Deadline
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
              <div className="bg-slate-900 border border-cyan-900 rounded p-2.5">
                <div className="font-semibold text-cyan-300 text-[11px]">1. Fan-Out Dispatcher</div>
                <div className="text-slate-400 text-[10px] mt-0.5">Spawns 4 concurrent gRPC worker tasks with 2.5s deadlines.</div>
              </div>
              <div className="bg-slate-900 border border-cyan-900 rounded p-2.5">
                <div className="font-semibold text-cyan-300 text-[11px]">2. Synchronization Barrier</div>
                <div className="text-slate-400 text-[10px] mt-0.5">Joins specialist payloads or triggers graceful degradation.</div>
              </div>
              <div className="bg-slate-900 border border-cyan-900 rounded p-2.5">
                <div className="font-semibold text-cyan-300 text-[11px]">3. Reviewer Dispatch</div>
                <div className="text-slate-400 text-[10px] mt-0.5">Executes adversarial cross-checks and injection detection.</div>
              </div>
              <div className="bg-slate-900 border border-cyan-900 rounded p-2.5">
                <div className="font-semibold text-cyan-300 text-[11px]">4. Dossier Synthesizer</div>
                <div className="text-slate-400 text-[10px] mt-0.5">Generates executive briefing with verified evidence citations.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tier 3: Specialist Agent Workers & Tools */}
        {(activeTier === 'all' || activeTier === 'agents') && (
          <div className="border border-slate-800 bg-slate-950/60 rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> Tier 3: Specialist Agent Worker Cluster (Stateless Microservices)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900 border border-slate-800 rounded p-3">
                <div className="font-semibold text-slate-200">Transaction Specialist</div>
                <div className="text-slate-400 text-[11px] mt-1">Tools: getTransaction(), getAccountVelocity(). Math: 24.2x ratio.</div>
                <span className="inline-block mt-2 text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">p95: 1.4s</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded p-3">
                <div className="font-semibold text-slate-200">Customer & CRM Specialist</div>
                <div className="text-slate-400 text-[11px] mt-1">Tools: getCustomerProfile(), getTravelNotices(). Finds London note.</div>
                <span className="inline-block mt-2 text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">p95: 1.2s</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded p-3">
                <div className="font-semibold text-slate-200">Device Telemetry Specialist</div>
                <div className="text-slate-400 text-[11px] mt-1">Tools: getDeviceSignals(). Detects Tokyo IP & VPN datacenter exit.</div>
                <span className="inline-block mt-2 text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">p95: 1.8s</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded p-3">
                <div className="font-semibold text-slate-200">Policy RAG Specialist</div>
                <div className="text-slate-400 text-[11px] mt-1">Tools: searchPolicies(). Hybrid search (BM25+Dense) on Cross-Border v2025.1.</div>
                <span className="inline-block mt-2 text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">p95: 1.5s</span>
              </div>
            </div>
          </div>
        )}

        {/* Tier 4: Enterprise Model Gateway */}
        {(activeTier === 'all' || activeTier === 'agents' || activeTier === 'governance') && (
          <div className="border border-blue-900/50 bg-blue-950/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-300 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-blue-400" /> Tier 4: Enterprise Model Gateway (Gemini 3.8 Flash)
              </div>
              <span className="text-[10px] font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">
                Resilience4j Circuit Breaker
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900 border border-slate-800 rounded p-2.5">
                <div className="font-semibold text-slate-200 text-[11px]">Prompt Sanitizer & Token Bucket</div>
                <div className="text-slate-400 text-[10px] mt-0.5">Enforces strict XML tagging and rate limits per investigation.</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded p-2.5">
                <div className="font-semibold text-slate-200 text-[11px]">Semantic Context Caching</div>
                <div className="text-slate-400 text-[10px] mt-0.5">Caches static policy text, reducing token costs by up to 75%.</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded p-2.5">
                <div className="font-semibold text-slate-200 text-[11px]">Circuit Breaker & Fallback</div>
                <div className="text-slate-400 text-[10px] mt-0.5">Trips to OPEN at 50% errors; falls back to deterministic rule template.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tier 5: Persistence & Observability */}
        {(activeTier === 'all' || activeTier === 'data' || activeTier === 'governance') && (
          <div className="border border-slate-800 bg-slate-950/60 rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Database className="w-4 h-4" /> Tier 5: Persistence, Observability & Compliance
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900 border border-slate-800 rounded p-3">
                <div className="font-semibold text-slate-200">PostgreSQL Case DB</div>
                <div className="text-slate-400 text-[11px] mt-1">ACID case state, Transactional Outbox table, investigator notes.</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded p-3">
                <div className="font-semibold text-slate-200">pgvector / AlloyDB</div>
                <div className="text-slate-400 text-[11px] mt-1">Bi-temporal policy chunks, HNSW index + BM25 GIN inverted index.</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded p-3">
                <div className="font-semibold text-purple-400">Immutable Audit Store (WORM)</div>
                <div className="text-slate-400 text-[11px] mt-1">SHA-256 hash-chained event log with 7-year regulatory retention.</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded p-3">
                <div className="font-semibold text-amber-400">OpenTelemetry Collector</div>
                <div className="text-slate-400 text-[11px] mt-1">Distributed trace exporter (Jaeger/Datadog) + Prometheus metrics.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

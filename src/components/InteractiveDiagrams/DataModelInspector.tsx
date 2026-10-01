import React, { useState } from 'react';
import { Database, FileCode, Check, Copy, ArrowRight, ShieldCheck } from 'lucide-react';

export const DataModelInspector: React.FC = () => {
  const [activeSchema, setActiveSchema] = useState<'case' | 'evidence' | 'kafka' | 'audit'>('case');
  const [copied, setCopied] = useState<boolean>(false);

  const schemas = {
    case: {
      title: 'PostgreSQL Relational Case Schema (Mutable Entity)',
      table: 'cases',
      description: 'Stores current state machine status, customer linkage, and aggregate risk assessment for rapid investigator querying.',
      sql: `CREATE TABLE cases (
    case_id VARCHAR(64) PRIMARY KEY,
    alert_id VARCHAR(64) NOT NULL UNIQUE,
    customer_id VARCHAR(64) NOT NULL,
    account_number_masked VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'NEW', -- NEW, INVESTIGATING, READY_FOR_REVIEW, ADJUDICATED
    initial_risk_score INT NOT NULL,
    computed_risk_score INT,
    confidence_discount_pct INT DEFAULT 0,
    contradictions_count INT DEFAULT 0,
    prompt_injection_flagged BOOLEAN DEFAULT FALSE,
    assigned_investigator_id VARCHAR(64),
    investigator_decision VARCHAR(32), -- CONFIRMED_FRAUD, DISMISSED_FALSE_POSITIVE, MANUAL_ESCALATION
    decision_timestamp TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cases_customer ON cases(customer_id);
CREATE INDEX idx_cases_status ON cases(status);`,
    },
    evidence: {
      title: 'Evidence Ledger & Citation Graph Schema',
      table: 'case_evidence',
      description: 'Immutable record of every evidence artifact retrieved by specialist tools, referenced by citation tags [SRC-*].',
      sql: `CREATE TABLE case_evidence (
    evidence_id VARCHAR(64) PRIMARY KEY, -- e.g. 'SRC-TXN-01', 'SRC-TRV-02'
    case_id VARCHAR(64) NOT NULL REFERENCES cases(case_id),
    agent_id VARCHAR(64) NOT NULL,
    source_service VARCHAR(64) NOT NULL, -- 'core_ledger', 'device_telemetry', 'policy_rag'
    tool_invoked VARCHAR(64) NOT NULL,
    raw_payload_json JSONB NOT NULL,
    extracted_claim TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT TRUE,
    payload_hash_sha256 VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_evidence_case ON case_evidence(case_id);`,
    },
    kafka: {
      title: 'Kafka Alert Event Envelope (Topic: fraud.alerts.v1)',
      table: 'fraud.alerts.v1 (Avro / JSON Schema)',
      description: 'Partitioned strictly by customerId to ensure in-order delivery and sequential alert evaluation.',
      sql: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "FraudAlertEnvelope.v1",
  "type": "object",
  "required": ["eventId", "alertId", "customerId", "timestamp", "flaggedTransaction"],
  "properties": {
    "eventId": { "type": "string", "format": "uuid" },
    "alertId": { "type": "string" },
    "idempotencyKey": { "type": "string" },
    "customerId": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "detectionEngine": { "type": "string" },
    "initialRiskScore": { "type": "integer", "minimum": 0, "maximum": 100 },
    "flaggedTransaction": {
      "type": "object",
      "required": ["transactionId", "amount", "currency", "merchantName", "cardPresent"],
      "properties": {
        "transactionId": { "type": "string" },
        "amount": { "type": "number" },
        "currency": { "type": "string" },
        "merchantName": { "type": "string" },
        "cardPresent": { "type": "boolean" },
        "rawMemo": { "type": "string" }
      }
    }
  }
}`,
    },
    audit: {
      title: 'Immutable WORM Audit Event (Event Sourced)',
      table: 'audit_event_stream (WORM S3 / Archive Vault)',
      description: 'Cryptographically hash-chained event record providing tamper-evident forensic non-repudiation for bank regulators.',
      sql: `{
  "eventId": "EVT-20260930-991204",
  "parentEventHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "timestamp": "2026-09-30T10:14:48.120Z",
  "caseId": "CASE-2026-84920",
  "eventType": "INVESTIGATOR_DECISION_RECORDED",
  "actor": {
    "type": "HUMAN_OPERATOR",
    "operatorId": "INV-77412",
    "badgeNumber": "SEC-8891",
    "mfaSessionId": "MFA-SESSION-20260930-49"
  },
  "actionPayload": {
    "adjudication": "CONFIRMED_HIGH_SUSPICION",
    "cardActionRequested": "RESTRICT_AND_REPLACE",
    "customerContactMode": "URGENT_SMS_VERIFICATION",
    "rationale": "Severe discrepancy: registered London itinerary vs Tokyo physical transaction."
  },
  "sha256PayloadSignature": "b47c8f9024a...7719d"
}`,
    },
  };

  const current = schemas[activeSchema];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            Data & Event Architecture Contract Inspector
          </h3>
          <p className="text-xs text-slate-400">
            Compare mutable case entities, evidence citation graphs, Kafka event envelopes, and append-only audit logs.
          </p>
        </div>

        {/* Schema Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs gap-1">
          {(['case', 'evidence', 'kafka', 'audit'] as const).map(schema => (
            <button
              key={schema}
              onClick={() => setActiveSchema(schema)}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                activeSchema === schema
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {schema === 'case' ? 'Case Entity' : schema === 'evidence' ? 'Evidence Ledger' : schema === 'kafka' ? 'Kafka Envelope' : 'WORM Audit Event'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 rounded-lg border border-slate-800 p-4">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
          <div>
            <div className="text-sm font-bold text-cyan-300">{current.title}</div>
            <div className="text-xs text-slate-400 mt-0.5">{current.description}</div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Contract'}
          </button>
        </div>

        <pre className="font-mono text-xs text-cyan-200/90 bg-slate-900/80 p-4 rounded overflow-x-auto max-h-[300px] border border-slate-800/80">
          {current.sql}
        </pre>
      </div>
    </div>
  );
};

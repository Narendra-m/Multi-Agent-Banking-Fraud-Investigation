import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Human-in-the-Loop',
    acronym: 'HITL',
    category: 'Architecture',
    definition: 'An architectural governance pattern where an automated system generates recommendations, synthesizes evidence, and calculates risk scores, but an accredited human operator retains sole authority to execute mutations or legal decisions.',
    distributedSystemAnalogy: 'Two-Phase Commit (2PC) or Manual Approval Gate in a CI/CD deployment pipeline.',
    usageInCopilot: 'The Copilot compiles evidence for Case #ALT-84920; the human investigator clicks the final decision to freeze a card or clear an alert.',
  },
  {
    term: 'Retrieval-Augmented Generation',
    acronym: 'RAG',
    category: 'AI & LLM',
    definition: 'A technique for grounding language model outputs by dynamically retrieving relevant facts from an external indexed knowledge base and injecting them into the context window before generation.',
    distributedSystemAnalogy: 'Read-Through Cache / Secondary Index lookup before rendering a view.',
    usageInCopilot: 'Retrieves active Apex Bank fraud policies from a vector and keyword database to enforce compliance rules.',
  },
  {
    term: 'Directed Acyclic Graph',
    acronym: 'DAG',
    category: 'Architecture',
    definition: 'A mathematical graph of nodes and directed edges containing no closed loops, used to represent workflow execution order and dependencies.',
    distributedSystemAnalogy: 'Apache Airflow DAG or Gradle/Maven task dependency resolution graph.',
    usageInCopilot: 'Coordinates parallel execution of specialist agents followed by a synchronization barrier and reviewer node.',
  },
  {
    term: 'Card-Not-Present',
    acronym: 'CNP',
    category: 'Banking',
    definition: 'A payment card transaction where the cardholder does not physically present the card to the merchant at the point of sale (e.g. online, phone, e-commerce).',
    distributedSystemAnalogy: 'Asynchronous API invocation with untrusted client-provided authentication credentials.',
    usageInCopilot: 'Elena Vance’s $3,450 Tokyo transaction is a CNP transaction, triggering higher cross-border risk tiers.',
  },
  {
    term: 'Dead-Letter Queue',
    acronym: 'DLQ',
    category: 'Reliability',
    definition: 'A secondary queue or topic in a messaging system where unprocessable or malformed messages are routed after exhausting retry policies.',
    distributedSystemAnalogy: 'Kafka dead-letter topic or AWS SQS Dead Letter Queue.',
    usageInCopilot: 'Alerts with corrupted JSON payloads or missing required schemas are routed to `fraud.alerts.dlq` to prevent consumer lag.',
  },
  {
    term: 'Change Data Capture',
    acronym: 'CDC',
    category: 'Architecture',
    definition: 'A software pattern that monitors and captures changes in a database transaction log (WAL) and publishes them as an event stream.',
    distributedSystemAnalogy: 'Debezium tailing PostgreSQL WAL or AWS DynamoDB Streams.',
    usageInCopilot: 'Powers the Transactional Outbox pattern to reliably stream investigator decisions to downstream Kafka topics.',
  },
  {
    term: 'Personally Identifiable Information',
    acronym: 'PII',
    category: 'Security',
    definition: 'Information that can be used on its own or with other information to identify, contact, or locate a single person (e.g. SSN, credit card PAN, phone, address).',
    distributedSystemAnalogy: 'Field-level encryption (FLE) and database column masking.',
    usageInCopilot: 'Full 16-digit card numbers and SSNs are tokenized and masked before transmission to external model APIs.',
  },
  {
    term: 'OpenTelemetry',
    acronym: 'OTel',
    category: 'Reliability',
    definition: 'An open-source vendor-neutral observability framework providing standardized APIs, SDKs, and tooling to generate and export telemetry data (traces, metrics, logs).',
    distributedSystemAnalogy: 'Distributed tracing spans (W3C traceparent, Jaeger, Zipkin, Dapper).',
    usageInCopilot: 'Tracks end-to-end spans across the coordinator, specialist agents, banking tool REST calls, and Gemini model invocations.',
  },
  {
    term: 'Merchant Category Code',
    acronym: 'MCC',
    category: 'Banking',
    definition: 'A four-digit number classified by ISO 18245 used by payment card schemes to identify the primary business type of a merchant.',
    distributedSystemAnalogy: 'Service discovery metadata tag or resource classification label.',
    usageInCopilot: 'Identifies Ginza Electronics as MCC 5732 (Consumer Electronics Stores), a high-risk category for fenceable stolen goods.',
  },
  {
    term: 'Write Once, Read Many',
    acronym: 'WORM',
    category: 'Security',
    definition: 'A data storage technology that allows data to be written once and prevents it from being modified or erased for a compliance retention period.',
    distributedSystemAnalogy: 'Append-only immutable transaction log or Amazon S3 Object Lock.',
    usageInCopilot: 'Guarantees the 7-year regulatory retention of all agent actions and investigator decisions under GLBA and SEC rules.',
  },
  {
    term: 'Time-to-First-Token',
    acronym: 'TTFT',
    category: 'AI & LLM',
    definition: 'The duration from when an inference request is sent to a model until the client receives the very first output token chunk.',
    distributedSystemAnalogy: 'Time-to-First-Byte (TTFB) in HTTP web performance optimization.',
    usageInCopilot: 'Monitored via OpenTelemetry to ensure the Case Summary Agent begins streaming output to the investigator UI in under 1,000ms.',
  },
  {
    term: 'Reciprocal Rank Fusion',
    acronym: 'RRF',
    category: 'AI & LLM',
    definition: 'An algorithm that combines the ranked results of multiple independent search engines (e.g. BM25 keyword and dense vector similarity) without score normalization.',
    distributedSystemAnalogy: 'Consensus voting algorithm or weighted round-robin aggregator.',
    usageInCopilot: 'Merges sparse keyword and dense semantic vector search results for the Policy Retrieval Agent.',
  },
];

export const ARCHITECT_ONE_PAGE_SUMMARY = `
# Multi-Agent Banking Fraud Investigation Copilot
## Architect's One-Page Executive Blueprint (Staff / Principal Level)

---

### 1. MISSION & HARD GOVERNANCE BOUNDARY
- **Purpose**: Assist human fraud investigators by accelerating evidence gathering, policy cross-checking, timeline reconstruction, and contradiction detection.
- **The Absolute Invariant (HITL)**: The AI Copilot is strictly advisory. It NEVER freezes accounts, cancels cards, accuses customers, or mutates core financial ledgers. All adverse actions require licensed human investigator ownership.

---

### 2. CORE TOPOLOGY & DATA PLANES
- **Ingestion Plane**: Apache Kafka topic \`fraud.alerts.v1\` partitioned by \`customerId\` (guarantees in-order processing; DLQ handles poison pills).
- **Orchestration Plane**: Deterministic DAG State Machine (Temporal style). Dispatches parallel scatter-gather to specialists with a 2.5s hard timeout budget; joins at an explicit synchronization barrier.
- **Specialist Agent Cluster**:
  1. *Case Coordinator*: Deterministic state flow, execution deadlines, token budgets.
  2. *Transaction Agent*: Deviation ratio (24.2x), velocity checks (read-only tools).
  3. *Customer Context Agent*: CRM history, relationship tier, verified travel notices.
  4. *Device & Channel Agent*: IP reputation, VPN exit node, impossible geovelocity.
  5. *Policy Retrieval Agent*: Hybrid search (BM25 + Dense Vectors) with temporal metadata pre-filtering.
  6. *Evidence & Contradiction Reviewer*: Adversarial cross-checking, prompt injection quarantining.
  7. *Case Summary Agent*: Structured executive dossier with verified \`[SRC-*]\` citations.
  8. *Independent Evaluation Agent*: Automated continuous auditing of faithfulness and recall.
- **Model Gateway**: Reverse proxy providing centralized token budgeting, semantic context caching, and circuit breakers (Resilience4j).
- **Data & Storage Plane**:
  - PostgreSQL: Mutable case entities and relational views.
  - pgvector / AlloyDB: Hybrid policy embeddings and inverted indices.
  - Append-Only WORM Storage: Immutable event sourcing log with SHA-256 hash chains (7-year retention).

---

### 3. SECURITY & THREAT MITIGATION
- **Indirect Prompt Injection**: External transaction memos treated as untrusted data. Wrapped in strict XML delimiters (\`<untrusted_memo>\`), scanned by an adversarial classifier, and neutralized.
- **Least-Privilege Tool Scoping**: Agent runtime IAM roles have ZERO write/execute permissions on core banking APIs.
- **PII Minimization**: Full card PANs and SSNs tokenized and masked before LLM transit.

---

### 4. RELIABILITY & DEGRADED MODES
- **Partial Failure Handling**: If an agent times out (e.g. Device API 504), the coordinator transitions it to DEGRADED, applies a confidence discount, and renders an amber "Missing Evidence" warning banner. The system NEVER halts.
- **Circuit Breakers**: 50% slow-call/error rate over 20 calls trips breaker to OPEN, falling back to deterministic Java summary templates.

---

### 5. EVALUATION TRINITY & CI/CD GATES
- **Golden Dataset**: 100+ annotated synthetic cases executed on every pull request.
- **Metrics**: Faithfulness (>98%), Citation Precision (100%), Contradiction Recall (>95%), Injection Resilience (100%).
- **Critical Failure Rule**: Any hallucinated policy or executed prompt injection breaks the CI build (P0 blocker).

---

### 6. DISTRIBUTED OBSERVABILITY (OpenTelemetry)
- **Trace Context**: W3C \`traceparent\` propagated across Kafka, gRPC, and LLM calls.
- **Triaging Matrix**:
  - *Tool Failure*: \`tool.*\` span returns 5xx or empty payload.
  - *Retrieval Failure*: \`rag.retrieval\` span returns low cosine similarity chunks.
  - *Model Failure*: Tools & RAG valid, but LLM completion omits citations or hallucinates.

---

### 7. STAFF ARCHITECT INTERVIEW ELEVATOR PITCH (60 Seconds)
*"In this banking fraud copilot, we decouple non-deterministic AI reasoning from deterministic distributed systems. We enforce a strict Human-in-the-Loop boundary where agents advise but cannot mutate ledgers. We orchestrate specialists using an acyclic DAG with a 4-second SLA and parallel scatter-gather. Untrusted memos are quarantined against indirect prompt injection via XML delimiters and least-privilege tool scoping. We maintain dual storage: relational PostgreSQL for case state, and an append-only event-sourced audit log for 7-year regulatory non-repudiation. Every pull request is verified against a 100-case Golden Evaluation Dataset with zero tolerance for hallucinations."*
`;

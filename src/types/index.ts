export interface Phase {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  category: 'Fundamentals' | 'Architecture' | 'Agents & RAG' | 'Data & Reliability' | 'Enterprise Operations' | 'Interview Mastery';
  summary: string;
  timeEstimate: string;
  keyTakeaways: string[];
  distributedSystemAnalogy: {
    familiarConcept: string; // e.g. "Saga Pattern Orchestrator", "Read-Through Cache", "Outbox Pattern"
    aiConcept: string; // e.g. "Coordinator Agent with State Machine", "RAG with Vector Retrieval", "Audit Log Event Sourcing"
    explanation: string;
  };
  plainLanguageExplanation: string;
  architectureDiagramType: 'system-context' | 'component' | 'sequence-happy' | 'sequence-failure' | 'agent-matrix' | 'data-model' | 'eval-matrix' | 'deployment-cloud';
  concreteExample: {
    title: string;
    alertContext: string;
    actionTaken: string;
    samplePayload: Record<string, any>;
    governanceCheck: string;
  };
  designDecisions: Array<{
    decision: string;
    chosenOption: string;
    alternativeOptions: string[];
    justification: string;
    tradeoffs: string;
  }>;
  commonFailureModes: Array<{
    scenario: string;
    cause: string;
    systemBehavior: string;
    mitigation: string;
    investigatorExperience: string;
  }>;
  handsOnQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    architectTip: string;
  };
  interviewDeepDive: {
    primaryQuestion: string;
    whatInterviewerIsTesting: string;
    structuredAnswer: string;
    concreteCopilotExample: string;
    likelyFollowUps: string[];
    conciseSeniorAnswer: string;
  };
}

export interface SyntheticCase {
  alertId: string;
  caseCreatedTimestamp: string;
  customer: {
    customerId: string;
    name: string;
    homeLocation: string;
    tier: string;
    historicalAverageTransaction: number;
    riskScore: number;
    accountOpenDate: string;
  };
  account: {
    accountNumber: string;
    cardLast4: string;
    status: string;
    currentBalance: number;
    dailyLimit: number;
  };
  flaggedTransaction: {
    transactionId: string;
    timestamp: string;
    amount: number;
    currency: string;
    merchantName: string;
    merchantCity: string;
    merchantCountry: string;
    mccCode: string;
    mccCategory: string;
    cardPresent: boolean;
    channel: string;
    rawMemo: string;
    hasPromptInjection: boolean;
    injectedPrompt?: string;
  };
  deviceTelemetry: {
    deviceId: string;
    ipAddress: string;
    ipGeoLocation: string;
    ipIsp: string;
    vpnDetected: boolean;
    browserUserAgent: string;
    deviceFingerprintTrust: string;
  };
  travelNotice: {
    recordId: string;
    destination: string;
    dates: string;
    declaredAt: string;
    notes: string;
  };
  applicablePolicies: Array<{
    id: string;
    version: string;
    effectiveDate: string;
    title: string;
    summary: string;
    relevantClause: string;
  }>;
}

export interface AgentDefinition {
  id: string;
  name: string;
  role: string;
  tier: 'Coordinator' | 'Specialist' | 'Reviewer' | 'Synthesizer' | 'Governance';
  purpose: string;
  isDeterministic: boolean;
  deterministicRationale: string;
  permittedInputs: string[];
  permittedTools: string[];
  outputSchemaDescription: string;
  failureBehavior: string;
  prohibitedActions: string[];
}

export interface SimulationStep {
  stepId: string;
  agentId: string;
  agentName: string;
  status: 'idle' | 'running' | 'completed' | 'degraded' | 'failed' | 'flagged';
  durationMs: number;
  description: string;
  inputSummary: string;
  toolsInvoked: string[];
  outputJson: Record<string, any>;
  citations: string[];
  contradictionsFound?: string[];
  securityEvents?: string[];
  warnings?: string[];
  investigatorNote?: string;
}

export interface SimulationState {
  caseData: SyntheticCase;
  config: {
    missingEvidence: boolean;
    toolTimeout: boolean;
    conflictingRecords: boolean;
    stalePolicy: boolean;
    duplicateKafkaEvent: boolean;
    promptInjection: boolean;
  };
  currentStepIndex: number;
  isRunning: boolean;
  steps: SimulationStep[];
  finalReport?: {
    caseSummary: string;
    riskAssessment: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    confidenceScore: number;
    keyFindings: Array<{ text: string; sourceId: string; verified: boolean }>;
    detectedContradictions: string[];
    missingDataNotices: string[];
    prohibitedActionsConfirmed: string[];
    recommendedHumanActions: string[];
  };
  humanDecision?: 'SUSPICIOUS_ESCALATE' | 'BENIGN_DISMISS' | 'REQUEST_ADDITIONAL_INFO' | null;
}

export interface InterviewQnA {
  id: string;
  category: string;
  difficulty: 'Senior' | 'Staff' | 'Principal';
  question: string;
  whatInterviewerIsTesting: string;
  structuredAnswer: {
    openingPrinciple: string;
    architecturalDesign: string[];
    tradeoffsAndConstraints: string[];
    productionSLA: string;
  };
  concreteExample: string;
  likelyFollowUps: string[];
  conciseSeniorAnswer: string;
  rubric: {
    mustMention: string[];
    redFlags: string[];
  };
}

export interface GlossaryTerm {
  term: string;
  acronym?: string;
  category: 'Architecture' | 'AI & LLM' | 'Security' | 'Banking' | 'Reliability';
  definition: string;
  distributedSystemParallel?: string;
  distributedSystemAnalogy?: string;
  usageInCopilot: string;
}

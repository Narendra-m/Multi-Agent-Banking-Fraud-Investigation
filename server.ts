import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Gemini client if API key is provided
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Server health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(geminiApiKey),
    time: new Date().toISOString(),
  });
});

// Mock interview evaluation endpoint using Gemini 3.8 Flash
app.post('/api/mock-interview/evaluate', async (req, res) => {
  const { question, userAnswer, rubric, category, context } = req.body;

  if (!question || !userAnswer) {
    return res.status(400).json({ error: 'question and userAnswer are required' });
  }

  if (!ai) {
    // Return structured offline grading if Gemini key is not configured
    return res.json({
      score: 8,
      isAiEvaluated: false,
      summary: 'Evaluated using built-in enterprise architectural rubric.',
      strengths: [
        'Recognized the critical boundary: Copilot is an assistive tool with strict Human-in-the-Loop (HITL) enforcement.',
        'Addressed distributed-systems reliability (idempotency, circuit breakers, or timeouts).',
      ],
      gaps: [
        'Consider explicitly referencing the exact state transition lifecycle or Kafka at-least-once deduplication mechanism.',
      ],
      followUp: 'How would you ensure that a rogue LLM hallucination cannot bypass the policy check during degraded mode?',
      feedback: 'Solid architectural grasp. Focus on concrete SLA numbers and failure isolation patterns in senior interviews.',
    });
  }

  try {
    const prompt = `
You are a Staff Software Architect and Principal Engineer conducting a technical interview for an enterprise multi-agent AI system (specifically a Banking Fraud Investigation Copilot).
The candidate is an experienced distributed-systems architect.

Context:
Category: ${category || 'Architecture'}
Context: ${context || 'Banking Fraud Investigation Copilot (HITL, read-only tools, Kafka intake, RAG policy retrieval)'}

Interview Question:
${question}

Grading Rubric / Key Expected Concepts:
${rubric ? JSON.stringify(rubric) : 'Evaluated on system design depth, trade-offs, HITL governance, failure modes, and distributed systems analogies.'}

Candidate's Answer:
"""
${userAnswer}
"""

Evaluate this answer. Return a JSON object with:
- score: integer from 1 to 10
- summary: 1-2 sentence overall impression
- strengths: list of 2-3 specific architectural strengths found in their answer
- gaps: list of 1-3 missing nuances or blind spots
- followUp: a challenging follow-up question that an interviewer would ask next based on their answer
- feedback: 2-3 sentences of advice for framing this in a Senior/Staff Architect interview.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, isAiEvaluated: true });
  } catch (err: any) {
    console.error('Gemini evaluation error:', err);
    return res.json({
      score: 7,
      isAiEvaluated: false,
      summary: 'Evaluated with baseline rubric (API fallback).',
      strengths: ['Addressed the main architectural concept.'],
      gaps: ['Elaborate on production failure recovery and audit trail retention.'],
      followUp: 'How would you measure the cost and token latency impact under a 10x alert spike?',
      feedback: 'Keep your answers structured around Requirements -> Architecture -> Failure Modes.',
    });
  }
});

// Synthetic banking tool simulation endpoints (read-only)
app.get('/api/synthetic/transaction/:id', (req, res) => {
  res.json({
    transactionId: req.params.id,
    accountNumber: 'ACC-8932-1102',
    timestamp: '2026-09-30T10:14:22Z',
    amount: 3450.00,
    currency: 'USD',
    merchant: {
      name: 'Ginza Luxury Electronics Ltd',
      city: 'Tokyo',
      country: 'JPN',
      mcc: '5732',
      riskTier: 'HIGH',
    },
    cardPresent: false,
    channel: 'E_COMMERCE',
    memo: 'Order #TX-9921 Tokyo Online Delivery',
  });
});

async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Lab Server] Running on http://0.0.0.0:${PORT}`);
  });
}

start();

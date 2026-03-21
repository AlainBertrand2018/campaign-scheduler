import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { defineMcpHost } from '@genkit-ai/mcp';
import path from 'path';

// 1. Initialize Genkit
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash', 
});

// 2. Register Persistent Python Backend (SSE)
export const mcpHost = defineMcpHost(ai, {
  name: 'enola-agency-swarm',
  mcpServers: {
    swarm: {
      url: 'http://localhost:8000/sse',
    },
  },
});

// 2026 Unified SDK Standards
export const STRATEGIST_MODEL = 'googleai/gemini-2.0-pro';
export const EXTRACTION_MODEL = 'googleai/gemini-2.0-flash';
export const DEFAULT_MODEL = EXTRACTION_MODEL;

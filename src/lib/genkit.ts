import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { createMcpHost } from '@genkit-ai/mcp';
import path from 'path';

// 1. Initialize MCP Host to talk to Python Backend
export const mcpHost = createMcpHost({
  name: 'campaign-scheduler-mcp',
  mcpServers: {
    brandDNA: {
      command: 'python',
      args: [path.join(process.cwd(), 'backend', 'dna_architect_mcp.py')],
    },
  },
});

// 2. Initialize Genkit
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.5-flash', 
});

// 2026 Unified SDK Standards
export const STRATEGIST_MODEL = 'googleai/gemini-2.5-pro';
export const EXTRACTION_MODEL = 'googleai/gemini-2.5-flash';
export const DEFAULT_MODEL = EXTRACTION_MODEL;

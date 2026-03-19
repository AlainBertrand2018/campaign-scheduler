'use server';

import { SwarmManager } from '@/lib/agents/SwarmManager';

/**
 * Server Action to trigger DNA & Strategy Synthesis
 */
export async function runInitialSynthesisAction(input: {
  url?: string;
  brand_notes?: string;
  product_desc: string;
  objective: string;
  duration: string;
}) {
  console.log('[DEBUG] API Key Check:', {
    has_gemini: !!process.env.GEMINI_API_KEY,
    has_google: !!process.env.GOOGLE_API_KEY,
  });
  try {
    const results = await SwarmManager.synthesizeStrategy(input);
    return { success: true, results };
  } catch (error: any) {
    console.error('[SERVER ACTION ERROR]', error);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to trigger Creative Swarm
 */
export async function runCreativeSwarmAction(input: {
  blueprint: any;
  brandDNA: any;
}) {
  try {
    const results = await SwarmManager.generateCreativeSwarm(input);
    return { success: true, results };
  } catch (error: any) {
    console.error('[SERVER ACTION ERROR]', error);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to trigger Phase 3: Execution Swarm
 */
export async function runExecutionSwarmAction(input: {
  creatives: any[];
  platforms: string[];
  campaign_duration_days: number;
  timezone: string;
}) {
  try {
    const results = await SwarmManager.executeCampaignSwarm(input);
    return { success: true, results };
  } catch (error: any) {
    console.error('[SERVER ACTION ERROR]', error);
    return { success: false, error: error.message };
  }
}

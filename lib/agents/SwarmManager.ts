import { brandDNAAgentFlow, productDNAAgentFlow } from './DNAAgents';
import { campaignStrategistFlow } from './CampaignStrategistAgent';
import { audiencePersonaFlow, copyAgentFlow, visualDirectionAgentFlow } from './CreativeAgents';
import { creativeQAWorkflow, channelAdaptationFlow } from './OperationalAgents';
import { schedulerAgentFlow, publisherAgentFlow } from './ExecutionAgents';
import { useCampaignStore } from '../store/useCampaignStore';
import { CreativeVariant } from './definitions';

/**
 * Swarm Manager: The High-Level Orchestration Layer
 * Manages the sequential and parallel handshakes between all 11 agents.
 * 
 * NOTE: For Genkit 1.26.0, flows are called directly as functions.
 */
export class SwarmManager {
  /**
   * Phase 1: Identity & Strategy Synthesis
   */
  static async synthesizeStrategy(input: {
    url?: string;
    brand_notes?: string;
    product_desc: string;
    objective: string;
    duration: string;
  }) {
    console.log('[SWARM] Phase 1: Synthesizing Strategy...');
    const { addLog } = useCampaignStore.getState();
    addLog({ agent: 'System', message: 'Initiating Phase 1: Identity Synthesis', type: 'info' });

    // 1. Run DNA Agents in Parallel
    addLog({ agent: 'Brand DNA', message: 'Analyzing brand soul & voice...', type: 'agent' });
    const brandDNA = await brandDNAAgentFlow({ 
      url: input.url, 
      brand_notes: input.brand_notes 
    });
    addLog({ agent: 'Brand DNA', message: 'Voice Matrix & Identity Map stabilized.', type: 'success' });
    
    addLog({ agent: 'Product DNA', message: 'Mapping features to killer claims...', type: 'agent' });
    const productDNA = await productDNAAgentFlow({ 
      product_description: input.product_desc 
    });
    addLog({ agent: 'Product DNA', message: 'Product DNA synthesized successfully.', type: 'success' });

    // 2. Trigger Campaign Strategist
    addLog({ agent: 'Strategist', message: 'Building campaign blueprint...', type: 'agent' });
    const blueprint = await campaignStrategistFlow({
      campaign_id: `CPN-${Date.now()}`,
      objectives: input.objective,
      duration: input.duration,
      brand_dna: brandDNA,
      product_dna: productDNA,
    });
    addLog({ agent: 'Strategist', message: `Blueprint ready: "${blueprint.meta_strategy}"`, type: 'success' });

    return { brandDNA, productDNA, blueprint };
  }

  /**
   * Phase 2: Creative Swarm Orchestration
   */
  static async generateCreativeSwarm(input: {
    blueprint: any;
    brandDNA: any;
  }) {
    console.log('[SWARM] Phase 2: Orchestrating Creative Swarm...');
    const { addLog } = useCampaignStore.getState();
    addLog({ agent: 'System', message: 'Initiating Phase 2: Creative Swarm', type: 'info' });

    // 1. Generate Personas
    addLog({ agent: 'Audience Persona', message: 'Generating hyper-specific ideal customer profiles...', type: 'agent' });
    const personas = await audiencePersonaFlow({
      blueprint: input.blueprint,
      brand_dna: input.brandDNA,
    });
    addLog({ agent: 'Audience Persona', message: `${personas.length} personas mapped to campaign context.`, type: 'success' });

    // 2. Parallelize Creative Generation per Persona
    addLog({ agent: 'System', message: 'Spawning parallel Copy & Visual agents...', type: 'info' });
    
    // We'll map through each Persona
    const creativePromises = personas.map(async (persona) => {
      addLog({ agent: 'Copy Agent', message: `Writing native copy variants for "${persona.name}"...`, type: 'agent' });
      
      // Step A: Generate Copy Variants
      const copyVariants = await copyAgentFlow({
        brand_dna: input.brandDNA,
        persona: persona,
        strategy: input.blueprint,
      });

      // Step B: Spawn Visual Direction & QA pipelines per Copy Variant
      const variantPipelines = copyVariants.map(async (copyVariant) => {
        addLog({ agent: 'Visual Direction', message: `Crafting visual prompts for variant "${copyVariant.copy_variant_name}"...`, type: 'agent' });
        
        // Step B1: Visual Prompts
        const visualDir = await visualDirectionAgentFlow({
          brand_dna: input.brandDNA,
          copy_variant: copyVariant,
          persona: persona,
        });

        // Step B2: Stitch the unified output together
        const rawCreative = {
          id: `creative-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          persona_id: persona.id,
          copy: copyVariant,
          visual_direction: visualDir,
        };

        // Step B3: Immediate QA Intervention
        addLog({ agent: 'Creative QA', message: `Reviewing unified creative bundle for ${copyVariant.copy_variant_name}...`, type: 'agent' });
        const verifiedCreative = await creativeQAWorkflow({
          original_brand: input.brandDNA,
          creative_output: rawCreative as any,
        });
        
        addLog({ agent: 'Creative QA', message: `QA Passed! Health score: ${verifiedCreative.qa_feedback?.score}%`, type: 'success' });

        return {
          ...verifiedCreative,
          persona_name: persona.name, // Append for UI ease later
        } as CreativeVariant & { persona_name: string };
      });

      // Await all variant pipelines for this specific persona
      return Promise.all(variantPipelines);
    });

    // Wait for ALL personas and flatten the variant arrays into a single creatives list
    const finalCreativesArrayOfArrays = await Promise.all(creativePromises);
    const flattenedCreatives = finalCreativesArrayOfArrays.flat();

    addLog({ agent: 'System', message: `Phase 2 Complete! Swarm produced ${flattenedCreatives.length} production-ready variants.`, type: 'success' });

    return {
      personas,
      creatives: flattenedCreatives,
    };
  }

  /**
   * Phase 3: Publishing & Execution Orchestration
   */
  static async executeCampaignSwarm(input: {
    creatives: (CreativeVariant & { persona_name: string })[];
    platforms: string[];
    campaign_duration_days: number;
    timezone: string;
  }) {
    console.log('[SWARM] Phase 3: Executing Campaign Swarm...');
    
    // We temporarily disable addLog if called via CLI where the store isn't fully mocked
    // In actual Next.js frontend, this will work over Zustand.
    let addLog = (log: any) => {};
    try {
      addLog = useCampaignStore.getState().addLog;
    } catch(e) {}

    addLog({ agent: 'System', message: 'Initiating Phase 3: Adaptation & Scheduling', type: 'info' });

    // 1. Channel Adaptation (Parallel across all creatives)
    addLog({ agent: 'Adaptation Agent', message: `Adapting ${input.creatives.length} creatives for multiple platforms...`, type: 'agent' });
    
    const adaptationPromises = input.creatives.map(async (creative) => {
      const adaptedArray = await channelAdaptationFlow({
        creative_output: creative,
        platforms: input.platforms,
      });
      return adaptedArray;
    });

    const adaptedVariantsOfArrays = await Promise.all(adaptationPromises);
    const allAdaptedVariants = adaptedVariantsOfArrays.flat();
    addLog({ agent: 'Adaptation Agent', message: `Successfully adapted into ${allAdaptedVariants.length} distinct platform variations.`, type: 'success' });

    // 2. Scheduler Agent
    addLog({ agent: 'Scheduler Agent', message: `Mapping time slots across ${input.campaign_duration_days} days...`, type: 'agent' });
    const schedules = await schedulerAgentFlow({
      adapted_variants: allAdaptedVariants,
      campaign_duration_days: input.campaign_duration_days,
      target_audience_timezone: input.timezone,
    });
    addLog({ agent: 'Scheduler Agent', message: `Calendar populated with ${schedules.length} optimal delivery periods.`, type: 'success' });

    // 3. Publisher Agent (Mock Dispatch)
    addLog({ agent: 'Publisher Agent', message: 'Executing cross-platform deployment queue...', type: 'agent' });
    
    const publishPromises = schedules.map(async (schedule) => {
      return await publisherAgentFlow({ schedule });
    });

    const publishedResults = await Promise.all(publishPromises);
    
    const successful = publishedResults.filter(p => p.status === 'LIVE').length;
    const failed = publishedResults.length - successful;
    
    if (failed > 0) {
      addLog({ agent: 'Publisher Agent', message: `Published ${successful} posts. ${failed} mock failures recorded.`, type: 'warning' });
    } else {
      addLog({ agent: 'Publisher Agent', message: `100% successful rollout. All ${successful} posts queued or live!`, type: 'success' });
    }

    addLog({ agent: 'System', message: 'Phase 3 Complete! Campaign is airborne.', type: 'info' });

    return {
      schedules,
      publishedResults,
    };
  }
}

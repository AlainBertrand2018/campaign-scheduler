import { brandDNAAgentFlow, productDNAAgentFlow } from './DNAAgents';
import { enolaSynthesisFlow, enolaReviewFlow } from './EnolaAgent';
import { campaignStrategistFlow } from './CampaignStrategistAgent';
import { audiencePersonaFlow, copyAgentFlow, visualDirectionAgentFlow } from './CreativeAgents';
import { creativeQAWorkflow, channelAdaptationFlow } from './OperationalAgents';
import { schedulerAgentFlow, publisherAgentFlow } from './ExecutionAgents';
import { useCampaignStore } from '../store/useCampaignStore';
import { CreativeVariant } from './definitions';

/**
 * Swarm Manager: The High-Level Orchestration Layer
 * Manages the sequential and parallel handshakes between all 12 agents.
 * 
 * NOTE: For Genkit 1.26.0, flows are called directly as functions.
 */
export class SwarmManager {
  /**
   * Phase 1: Identity & Strategy Synthesis (Enola-Led)
   */
  static async synthesizeStrategy(input: {
    url?: string;
    brand_notes?: string;
    product_desc: string;
    objective: string;
    duration: string;
  }) {
    console.log('[SWARM] Phase 1: Synthesizing Strategy with Enola...');
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

    // 2. Enola: Agency Director Gate 1 - Strategic Directive
    addLog({ agent: 'Enola', message: 'Directing strategy based on DNA extraction...', type: 'agent' });
    const directive = await enolaSynthesisFlow({
      brand_dna: brandDNA,
      product_dna: productDNA,
      user_objectives: input.objective,
    });
    addLog({ agent: 'Enola', message: `Directive Set: "${directive.meta_strategy}"`, type: 'success' });

    // 3. Trigger Campaign Strategist (Now guided by Enola)
    addLog({ agent: 'Strategist', message: 'Building campaign blueprint...', type: 'agent' });
    const blueprint = await campaignStrategistFlow({
      campaign_id: `CPN-${Date.now()}`,
      objectives: input.objective,
      duration: input.duration,
      brand_dna: brandDNA,
      product_dna: productDNA,
      enola_directive: directive, // Passage of high-level directive
    });
    addLog({ agent: 'Strategist', message: `Blueprint ready: "${blueprint.meta_strategy}"`, type: 'success' });

    return { brandDNA, productDNA, blueprint, directive };
  }

  /**
   * Phase 2: Creative Swarm Orchestration (Enola-Audit)
   */
  static async generateCreativeSwarm(input: {
    blueprint: any;
    brandDNA: any;
    productDNA: any;
    directive: any;
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
    
    const creativePromises = personas.map(async (persona) => {
      addLog({ agent: 'Copy Agent', message: `Writing native copy variants for "${persona.name}"...`, type: 'agent' });
      
      const copyVariants = await copyAgentFlow({
        brand_dna: input.brandDNA,
        persona: persona,
        strategy: input.blueprint,
      });

      const variantPipelines = copyVariants.map(async (copyVariant) => {
        addLog({ agent: 'Visual Direction', message: `Crafting visual prompts for variant "${copyVariant.copy_variant_name}"...`, type: 'agent' });
        
        const visualDir = await visualDirectionAgentFlow({
          brand_dna: input.brandDNA,
          copy_variant: copyVariant,
          persona: persona,
        });

        const rawCreative = {
          id: `creative-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          persona_id: persona.id,
          copy: copyVariant,
          visual_direction: visualDir,
        };

        addLog({ agent: 'Creative QA', message: `Quick validation of creative bundle for ${copyVariant.copy_variant_name}...`, type: 'agent' });
        const verifiedCreative = await creativeQAWorkflow({
          original_brand: input.brandDNA,
          creative_output: rawCreative as any,
        });
        
        return {
          ...verifiedCreative,
          persona_name: persona.name, 
        } as CreativeVariant & { persona_name: string };
      });

      return Promise.all(variantPipelines);
    });

    const finalCreativesArrayOfArrays = await Promise.all(creativePromises);
    const flattenedCreatives = finalCreativesArrayOfArrays.flat();

    // 3. Enola: Agency Director Gate 2 - Final Creative Audit
    addLog({ agent: 'Enola', message: 'Conducting final Director audit of all swarm output...', type: 'agent' });
    const reviewReport = await enolaReviewFlow({
      original_dna: {
        brand: input.brandDNA,
        product: input.productDNA,
      },
      directive: input.directive,
      creative_variants: flattenedCreatives,
    });

    if (reviewReport.approved_for_user_submission) {
      addLog({ agent: 'Enola', message: `Campaign Approved! Score: ${reviewReport.overall_score}/10. Submitting for User Review.`, type: 'success' });
    } else {
      addLog({ agent: 'Enola', message: `Review Failed: ${reviewReport.directors_notes}`, type: 'warning' });
      // In a production loop, we might re-trigger Phase 2 here. 
      // For now, we allow the UI to handle the next step with the report info.
    }

    addLog({ agent: 'System', message: `Phase 2 Complete! Swarm produced ${flattenedCreatives.length} production-ready variants.`, type: 'success' });

    return {
      personas,
      creatives: flattenedCreatives,
      reviewReport,
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

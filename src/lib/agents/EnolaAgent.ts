import { z } from 'genkit';
import { ai, EXTRACTION_MODEL } from '../genkit';
import { 
  BrandIdentitySchema, 
  ProductDNASchema, 
  EnolaDirectiveSchema, 
  EnolaReviewReportSchema,
  CreativeVariantSchema
} from './definitions';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Enola Agency Director Agent
 * 
 * Mandate: Deep strategic analysis based on her Playbook.
 * Gate 1: Analyzes DNA and submits Directives to Strategist.
 * Gate 2: Conducts Final Audit of Creative Swarm.
 */

const getEnolaPlaybook = () => {
  try {
    const playbookPath = path.resolve(process.cwd(), 'ENOLA_PLAYBOOK.md');
    return fs.readFileSync(playbookPath, 'utf-8');
  } catch (e) {
    return "Enola Playbook not found. Use standard world-class agency director logic.";
  }
};

/**
 * 1. Enola Strategic Synthesis Flow (Gate 1)
 */
export const enolaSynthesisFlow = ai.defineFlow(
  {
    name: 'enolaSynthesisFlow',
    inputSchema: z.object({
      brand_dna: BrandIdentitySchema,
      product_dna: ProductDNASchema,
      user_objectives: z.string(),
    }),
    outputSchema: EnolaDirectiveSchema,
  },
  async (input) => {
    const playbook = getEnolaPlaybook();

    const response = await ai.generate({
      model: EXTRACTION_MODEL,
      prompt: `
        You are **Enola**, the world-class Advertising Agency Director.
        
        PLAYBOOK CONTEXT:
        ${playbook}
        
        INPUTS:
        - Brand DNA: ${JSON.stringify(input.brand_dna)}
        - Product DNA: ${JSON.stringify(input.product_dna)}
        - User Objectives: "${input.user_objectives}"
        
        TASK (GATE 1):
        Analyze the raw DNA and user objectives. Synthesize a **Strategic Directive** for the Campaign Strategist.
        1. Identify the "Golden Thread" between brand and product.
        2. Set the High-Level Meta Strategy (Awareness, Conviction, or Conversion).
        3. Define the core Emotional Hook.
        4. Provide specific Visual DNA Directives.
        
        Synthesize into a structured EnolaDirective JSON.
      `,
      output: { format: 'json', schema: EnolaDirectiveSchema },
    });

    if (!response.output) throw new Error('Enola Strategic Synthesis failed');
    return response.output;
  }
);

/**
 * 2. Enola Final Review Flow (Gate 2)
 */
export const enolaReviewFlow = ai.defineFlow(
  {
    name: 'enolaReviewFlow',
    inputSchema: z.object({
      original_dna: z.object({
        brand: BrandIdentitySchema,
        product: ProductDNASchema,
      }),
      directive: EnolaDirectiveSchema,
      creative_variants: z.array(CreativeVariantSchema),
    }),
    outputSchema: EnolaReviewReportSchema,
  },
  async (input) => {
    const playbook = getEnolaPlaybook();

    const response = await ai.generate({
      model: EXTRACTION_MODEL,
      prompt: `
        You are **Enola**, the Agency Director. This is the **FINAL REVIEW (GATE 2)** before user submission.
        
        PLAYBOOK CONTEXT:
        ${playbook}
        
        STRATEGIC DIRECTIVE:
        ${JSON.stringify(input.directive)}
        
        CREATIVE OUTPUTS TO AUDIT:
        ${JSON.stringify(input.creative_variants)}
        
        TASK:
        Perform a 3-point audit: Brand Integrity, Contextual Resonance, and Channel Hygiene.
        Score the campaign overall (0-10).
        Identify any discrepancies per agent (Copy, Visual, Persona).
        If score < 8, mark as 'NOT APPROVED' and provide amendment notes.
        
        Synthesize into a structured EnolaReviewReport JSON.
      `,
      output: { format: 'json', schema: EnolaReviewReportSchema },
    });

    if (!response.output) throw new Error('Enola Final Review failed');
    return response.output;
  }
);

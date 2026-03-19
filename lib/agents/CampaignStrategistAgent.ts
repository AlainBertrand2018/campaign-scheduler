import { z } from 'genkit';
import { ai, STRATEGIST_MODEL } from '../genkit';
import { CampaignBlueprintSchema } from './definitions';

/**
 * 3. Campaign Strategist Agent (2026 Shift: Using Gemini 3 Pro Latest)
 */
export const campaignStrategistFlow = ai.defineFlow(
  {
    name: 'campaignStrategistFlow',
    inputSchema: z.object({
      campaign_id: z.string(),
      objectives: z.string(),
      duration: z.string(),
      brand_dna: z.any(), 
      product_dna: z.any(), 
    }),
    outputSchema: CampaignBlueprintSchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: STRATEGIST_MODEL,
      prompt: `
        You are the **Campaign Strategist Agent**.
        CAMPAIGN OBJECTIVES: "${input.objectives}"
        DURATION: "${input.duration}"
        BRAND DNA: ${JSON.stringify(input.brand_dna)}
        PRODUCT DNA: ${JSON.stringify(input.product_dna)}
        
        TASK:
        Generate a "Campaign Blueprint" JSON. 
        Identify Meta-Strategy, Personas (1-3), and tasks for: 
        Audience Persona, Copy, Visual Direction (Nano Banana Pro/VEO 3), Audio, QA, Adaptation, and Scheduler agents.
      `,
      output: { format: 'json', schema: CampaignBlueprintSchema },
    });

    if (!response.output) throw new Error('Strategist failed to generate blueprint');
    return response.output;
  }
);

import { z } from 'genkit';
import { ai, EXTRACTION_MODEL } from '../genkit';
import { CreativeVariantSchema, PlatformReadyVariantSchema } from './definitions';

/**
 * 7. Creative QA Agent (Final Editor)
 */
export const creativeQAWorkflow = ai.defineFlow(
  {
    name: 'creativeQAWorkflow',
    inputSchema: z.object({
      original_brand: z.any(),
      creative_output: CreativeVariantSchema,
    }),
    outputSchema: CreativeVariantSchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: EXTRACTION_MODEL,
      prompt: `
        You are the **Creative QA Agent**.
        BRAND DNA: ${JSON.stringify(input.original_brand)}
        CREATIVE OUTPUT: ${JSON.stringify(input.creative_output)}
        TASK:
        1. Final Editor review.
        2. Score Copy for compliance.
        3. Rate visual direction match.
        Return updated CreativeVariant with QA notes.
      `,
      output: { format: 'json', schema: CreativeVariantSchema },
    });

    if (!response.output) throw new Error('QA analysis failed');
    return response.output;
  }
);

/**
 * 8. Channel Adaptation Agent
 */
export const channelAdaptationFlow = ai.defineFlow(
  {
    name: 'channelAdaptationFlow',
    inputSchema: z.object({
      creative_output: CreativeVariantSchema,
      platforms: z.array(z.string()),
    }),
    outputSchema: z.array(PlatformReadyVariantSchema),
  },
  async (input) => {
    const response = await ai.generate({
      model: EXTRACTION_MODEL,
      prompt: `
        You are the **Channel Adaptation Agent**.
        ORIGINAL CREATIVE: ${JSON.stringify(input.creative_output)}
        TARGET PLATFORMS: ${input.platforms.join(', ')}
        
        TASK:
        1. Adapt the copy specifically for each target platform (e.g., character constraints for Twitter/X, professional tone for LinkedIn).
        2. Suggest relevant hashtags per platform.
        3. Determine the required visual specification (e.g., 1080x1080 for Instagram, 16:9 for YouTube/LinkedIn).
        
        Return an array of PlatformReadyVariant JSON objects.
      `,
      output: { format: 'json', schema: z.array(PlatformReadyVariantSchema) },
    });

    if (!response.output) throw new Error('Channel adaptation failed');

    // Attach original creative ID
    return response.output.map(variant => ({
      ...variant,
      creative_id: input.creative_output.id,
    }));
  }
);

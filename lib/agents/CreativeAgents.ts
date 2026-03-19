import { z } from 'genkit';
import { ai, EXTRACTION_MODEL, STRATEGIST_MODEL } from '../genkit';
import { PersonaSchema, CopyVariantSchema, VisualDirectionSchema } from './definitions';

/**
 * 4. Audience Persona Agent (2026 Shift)
 * Generates hyper-specific target personas for the campaign.
 */
export const audiencePersonaFlow = ai.defineFlow(
    {
      name: 'audiencePersonaFlow',
      inputSchema: z.object({
        blueprint: z.any(), 
        brand_dna: z.any(), 
      }),
      outputSchema: z.array(PersonaSchema),
    },
    async (input) => {
      const response = await ai.generate({
        model: STRATEGIST_MODEL, // Needs high-reasoning
        prompt: `
          You are the **Audience Persona Agent**. Generate 2-3 hyper-specific persona profiles for the upcoming campaign.
          
          CAMPAIGN STRATEGY:
          ${JSON.stringify(input.blueprint, null, 2)}
          
          BRAND IDENTITY:
          Voice: ${input.brand_dna.voice_traits?.join(', ')}
          
          TASK:
          1. Segment the target market based on specific psychological and circumstantial Triggers.
          2. Create detailed persona profiles mapping Demographics, Psychographics, Pain Points, Triggers, and Objections.
          3. Base this heavily on the supplied strategy & brand constraints.
          
          Return as JSON aligning with the PersonaSchema.
        `,
        output: { format: 'json', schema: z.array(PersonaSchema) },
      });
  
      if (!response.output) throw new Error('Persona generation failed');
      return response.output;
    }
);

/**
 * 5. Copy Agent (2026 Shift)
 * Writes platform-native copy in the brand's voice.
 */
export const copyAgentFlow = ai.defineFlow(
  {
    name: 'copyAgentFlow',
    inputSchema: z.object({
      brand_dna: z.any(), 
      persona: PersonaSchema,
      strategy: z.any(), 
    }),
    outputSchema: z.array(CopyVariantSchema), // Output multiple variants
  },
  async (input) => {
    const response = await ai.generate({
      model: EXTRACTION_MODEL, // Flash is great for high-volume rapid copy
      prompt: `
        You are the **Copy Agent**. Write high-impact, platform-native copy variants for this specific campaign.
        
        TARGET PERSONA: "${input.persona.name}" 
        Pain Points: ${input.persona.pain_points.join(', ')}
        Triggers: ${input.persona.triggers.join(', ')}
        
        BRAND VOICE: ${input.brand_dna.voice_traits?.join(', ')}
        
        TASK:
        Write 3 distinct variants of copy (e.g. "Pain-Focused", "Aspirational", "Action-Oriented") aimed at this persona.
        Each variant needs a short Headline, compelling Body Copy, and a strong CTA.
        Make sure the tone strictly adheres to the stated Brand Voice.
        
        Return an array of CopyVariants as JSON.
      `,
      output: { format: 'json', schema: z.array(CopyVariantSchema) },
    });

    if (!response.output) throw new Error('Copy generation failed');
    return response.output;
  }
);

/**
 * 6. Visual Direction Agent (2026 Shift)
 * Translates copy and strategy into descriptive visual prompts.
 */
export const visualDirectionAgentFlow = ai.defineFlow(
  {
    name: 'visualDirectionAgentFlow',
    inputSchema: z.object({
      brand_dna: z.any(),
      copy_variant: CopyVariantSchema,
      persona: PersonaSchema,
    }),
    outputSchema: VisualDirectionSchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: EXTRACTION_MODEL,
      prompt: `
        You are the **Visual Direction Agent**. Translate the provided copy and strategy into vivid prompts for image/video engines.
        
        COPY TO MATCH:
        Headline: "${input.copy_variant.headline}"
        Body: "${input.copy_variant.body_copy}"
        
        BRAND AESTHETIC:
        Colors: ${input.brand_dna.visual_style?.palette?.join(', ')}
        Aesthetic: ${input.brand_dna.visual_style?.aesthetic}
        
        PERSONA AUDIENCE: "${input.persona.name}"
        
        TASK:
        1. Write a descriptive, photorealistic "prompt_image" designed to be fed into image AI (like Imagen 3 or Midjourney).
        2. Write a cinematic motion "prompt_video" for a video generation model (like Veo 3 or Sora). Include camera movement and lighting.
        3. Note the composition rules ensuring the brand colors and aesthetic are respected.
        
        Return the VisualDirection JSON.
      `,
      output: { format: 'json', schema: VisualDirectionSchema },
    });

    if (!response.output) throw new Error('Visual direction generation failed');
    return response.output;
  }
);

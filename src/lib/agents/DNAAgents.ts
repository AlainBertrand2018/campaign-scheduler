import { z } from 'genkit';
import { ai, EXTRACTION_MODEL, mcpHost } from '../genkit';
import { BrandIdentitySchema, ProductDNASchema } from './definitions';

/**
 * 1. Brand DNA Agent (2026 Shift: Using MCP to talk to Python Backend)
 */
export const brandDNAAgentFlow = ai.defineFlow(
  {
    name: 'brandDNAAgentFlow',
    inputSchema: z.object({
      url: z.string().url().optional(),
      brand_notes: z.string().optional(),
      logo_desc: z.string().optional(),
    }),
    outputSchema: BrandIdentitySchema,
  },
  async (input) => {
    console.log('[MCP] Fetching MCP tools for Brand DNA analysis...');
    const mcpTools = await mcpHost.getActiveTools(ai);

    const response = await ai.generate({
      model: EXTRACTION_MODEL,
      tools: mcpTools,
      prompt: `
        You are the **Brand DNA Agent**. Analyze the brand footprint.
        INPUT: URL: ${input.url || 'Not provided'}, NOTES: ${input.brand_notes || 'Not provided'}
        
        TASK:
        1. Identify the Brand's "Soul"
        2. Define Voice Traits
        3. Establish Visual Aesthetic
        4. Suggest a Color Palette
        
        CRITICAL: If a URL is provided, YOU MUST first call the 'brandDNA/analyze_brand_url' tool to extract the structured DNA from the Python backend before synthesizing the final output!
        
        Synthesize all information into a structured BrandIdentity JSON.
      `,
      output: { format: 'json', schema: BrandIdentitySchema },
    });

    if (!response.output) throw new Error('Brand DNA synthesis failed');
    return response.output;
  }
);

/**
 * 2. Product DNA Agent (2026 Shift: Using Gemini 3 Flash Latest)
 */
export const productDNAAgentFlow = ai.defineFlow(
  {
    name: 'productDNAAgentFlow',
    inputSchema: z.object({
      product_description: z.string(),
      feature_list: z.array(z.string()).optional(),
    }),
    outputSchema: ProductDNASchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: EXTRACTION_MODEL,
      prompt: `
        You are the **Product DNA Agent**.
        PRODUCT: "${input.product_description}"
        FEATURES: ${input.feature_list?.join(', ') || 'Auto-extract'}
        TASK:
        1. Map features to benefits. 
        2. Synthesize 3 "Killer Claims."
        3. Identify price-justifying specs.
        Synthesize this into a structured ProductDNA JSON.
      `,
      output: { format: 'json', schema: ProductDNASchema },
    });

    if (!response.output) throw new Error('Product DNA synthesis failed');
    return response.output;
  }
);

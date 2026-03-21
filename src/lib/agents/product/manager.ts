import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Product Manager - Product DNA Flow
 * This flow maps raw features and specs into a benefit-first story.
 * It calls the Python backend (Agent 2) via MCP.
 */
export const productDNAFlow = ai.defineFlow(
  {
    name: "productDNAFlow",
    inputSchema: z.object({
      rawInput: z.string().describe("Raw product specifications or descriptions"),
    }),
    outputSchema: z.record(z.any()).describe("The structured ProductDNA object"),
  },
  async (input) => {
    // 1. Locate the tool in the discovered swarm from the MCP plugin
    const productMapper = await ai.registry.lookupAction("tool/swarm/product_dna_mapper");

    if (!productMapper) {
      throw new Error("Product Manager (Agent 2) is not responding in the swarm.");
    }

    // 2. Execute the mapping (Reasoning Chain)
    const result = await productMapper({
        raw_input: input.rawInput
    });

    // 3. Return the mapped Product DNA
    return result;
  }
);

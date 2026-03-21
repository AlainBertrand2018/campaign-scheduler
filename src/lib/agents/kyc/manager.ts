import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * KYC Manager - Brand DNA Flow
 * This flow orchestrates the extraction of a brand's soul from raw signals.
 * It calls the Python backend (Agent 1) via MCP.
 */
export const brandDNAFlow = ai.defineFlow(
  {
    name: "brandDNAFlow",
    inputSchema: z.object({
      rawInput: z.string().describe("Raw text or URL signals to analyze"),
    }),
    outputSchema: z.record(z.any()).describe("The structured BrandDNA object"),
  },
  async (input) => {
    // 1. Locate the tool in the discovered swarm from the MCP plugin
    const brandExtractor = await ai.registry.lookupAction("tool/swarm/brand_dna_extractor");

    if (!brandExtractor) {
      throw new Error("KYC Manager (Agent 1) is not responding in the swarm.");
    }

    // 2. Execute the extraction (Reasoning Chain)
    const result = await brandExtractor({
        raw_input: input.rawInput
    });

    // 3. Return the verified Brand DNA
    return result;
  }
);

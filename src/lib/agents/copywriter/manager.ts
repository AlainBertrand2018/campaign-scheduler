import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Copywriter - Copy Forge Flow
 * This flow generates ad copy based on persona and strategy.
 * Calls the Python backend (Agent 5) via MCP.
 */
export const copyForgeFlow = ai.defineFlow(
  {
    name: "copyForgeFlow",
    inputSchema: z.object({
      brandDNA: z.record(z.any()).describe("Structured Brand DNA"),
      productDNA: z.record(z.any()).describe("Structured Product DNA"),
      persona: z.record(z.any()).describe("The Audience Persona"),
      strategyBrief: z.string().optional().describe("Context from the Strategist"),
      platforms: z.array(z.string()).default(["LinkedIn"]),
    }),
    outputSchema: z.record(z.any()).describe("Platform-calibrated Ad Copy"),
  },
  async (input) => {
    // 1. Locate the tool
    const forge = await ai.registry.lookupAction("tool/swarm/copy_forge");

    if (!forge) {
      throw new Error("Copywriter (Agent 5) is not responding in the swarm.");
    }

    // 2. Draft the copy
    const result = await forge({
        brand_dna: input.brandDNA,
        product_dna: input.productDNA,
        persona: input.persona,
        strategy_brief: input.strategyBrief || "",
        platforms: input.platforms
    });

    // 3. Return the copy sets
    return result;
  }
);

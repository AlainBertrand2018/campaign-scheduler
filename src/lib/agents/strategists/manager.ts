import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Strategy Manager - Campaign Blueprint Flow
 * This flow synthesizes Brand and Product intelligence into an execution map.
 * Calls the Python backend (Agent 3) via MCP.
 */
export const strategyFlow = ai.defineFlow(
  {
    name: "strategyFlow",
    inputSchema: z.object({
      brandDNA: z.record(z.any()).describe("Structured Brand DNA from Agent 1"),
      productDNA: z.record(z.any()).describe("Structured Product DNA from Agent 2"),
      userBrief: z.string().optional().describe("Optional campaign-specific notes"),
    }),
    outputSchema: z.record(z.any()).describe("The Master Campaign Blueprint"),
  },
  async (input) => {
    // 1. Locate the tool in the discovered swarm from the MCP plugin
    const strategist = await ai.registry.lookupAction("tool/swarm/campaign_blueprint_engine");

    if (!strategist) {
      throw new Error("Strategist (Agent 3) is not responding in the swarm.");
    }

    // 2. Execute Strategy Generation (using elite intelligence)
    const result = await strategist({
        brand_dna: input.brandDNA,
        product_dna: input.productDNA,
        user_brief: input.userBrief || ""
    });

    // 3. Return the Blueprint
    return result;
  }
);

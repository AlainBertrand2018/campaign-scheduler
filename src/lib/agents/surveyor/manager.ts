import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Surveyor - Persona Forge Flow
 * This flow builds the audience personae based on the brand soul.
 * Calls the Python backend (Agent 4) via MCP.
 */
export const personaForgeFlow = ai.defineFlow(
  {
    name: "personaForgeFlow",
    inputSchema: z.object({
      brandDNA: z.record(z.any()).describe("Structured Brand DNA from Agent 1"),
      strategyBrief: z.string().optional().describe("Context from the Strategist"),
    }),
    outputSchema: z.record(z.any()).describe("The Audience Persona Map"),
  },
  async (input) => {
    // 1. Locate the tool
    const forge = await ai.registry.lookupAction("tool/swarm/persona_forge");

    if (!forge) {
      throw new Error("Surveyor (Agent 4) is not responding in the swarm.");
    }

    // 2. Forge the personas
    const result = await forge({
        brand_dna: input.brandDNA,
        strategy_brief: input.strategyBrief || ""
    });

    // 3. Return the personas
    return result;
  }
);

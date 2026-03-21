import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Art Director - Visual Prompt Flow
 * This flow generates the technical visual brief for AI image/video engines.
 * Calls the Python backend (Agent 6) via MCP.
 */
export const visualBriefFlow = ai.defineFlow(
  {
    name: "visualBriefFlow",
    inputSchema: z.object({
      brandDNA: z.record(z.any()).describe("Structured Brand DNA"),
      strategy: z.record(z.any()).describe("Campaign Strategy Blueprint"),
      copyBrief: z.record(z.any()).optional().describe("Ad copy context for visual matching"),
    }),
    outputSchema: z.record(z.any()).describe("The Visual Brief Package"),
  },
  async (input) => {
    // 1. Locate the tool
    const visualTools = await ai.registry.lookupAction("tool/swarm/visual_prompt_engine");

    if (!visualTools) {
      throw new Error("Art Director (Agent 6) is not responding in the swarm.");
    }

    // 2. Forge the visual direction
    const result = await visualTools({
        brand_dna: input.brandDNA,
        strategy: input.strategy,
        copy_brief: input.copyBrief || null
    });

    // 3. Return the brief
    return result;
  }
);

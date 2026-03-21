import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Statistician - Analytics Loop Flow
 * This flow retrieves and analyzes live performance data.
 * Calls the Python backend (Agent 10) via MCP.
 */
export const metricsLoopFlow = ai.defineFlow(
  {
    name: "metricsLoopFlow",
    inputSchema: z.object({
      campaignId: z.string().describe("Unique campaign ID"),
      liveData: z.record(z.any()).describe("Platform analytics data"),
      originalStrategy: z.record(z.any()).describe("The original strategy blueprint"),
    }),
    outputSchema: z.record(z.any()).describe("The Performance Audit Report"),
  },
  async (input) => {
    // 1. Locate the tool
    const feedback = await ai.registry.lookupAction("tool/swarm/metrics_loop");

    if (!feedback) {
      throw new Error("Statistician (Agent 10) is not responding in the swarm.");
    }

    // 2. Perform the analysis
    const result = await feedback({
        campaign_id: input.campaignId,
        live_data: input.liveData,
        strategy: input.originalStrategy
    });

    // 3. Return the audit
    return result;
  }
);

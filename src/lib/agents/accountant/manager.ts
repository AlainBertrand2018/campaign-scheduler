import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Accountant - Cost Intelligence Flow
 * This flow audits the financial and token costs of a campaign run.
 * Calls the Python backend (Agent 11) via MCP.
 */
export const costIntelligenceFlow = ai.defineFlow(
  {
    name: "costIntelligenceFlow",
    inputSchema: z.object({
      campaignId: z.string().describe("Unique campaign ID"),
      usageData: z.record(z.any()).describe("Token and API usage data"),
      budget: z.number().describe("Total campaign budget allocated"),
    }),
    outputSchema: z.record(z.any()).describe("The Financial Audit Report"),
  },
  async (input) => {
    // 1. Locate the tool
    const costTools = await ai.registry.lookupAction("tool/swarm/cost_intelligence");

    if (!costTools) {
      throw new Error("Accountant (Agent 11) is not responding in the swarm.");
    }

    // 2. Perform the audit
    const result = await costTools({
        campaign_id: input.campaignId,
        usage_data: input.usageData,
        budget: input.budget
    });

    // 3. Return the audit result
    return result;
  }
);

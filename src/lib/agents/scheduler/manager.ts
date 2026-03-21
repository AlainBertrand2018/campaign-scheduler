import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Scheduler - Temporal Optimization Flow
 * This flow builds the posting calendar for campaign assets.
 * Calls the Python backend (Agent 8) via MCP.
 */
export const temporalOptimizerFlow = ai.defineFlow(
  {
    name: "temporalOptimizerFlow",
    inputSchema: z.object({
      strategy: z.record(z.any()).describe("Campaign Strategic Blueprint"),
      assets: z.array(z.record(z.any())).describe("List of approved creative assets"),
      startDate: z.string().describe("ISO start date"),
      endDate: z.string().describe("ISO end date"),
    }),
    outputSchema: z.record(z.any()).describe("The Campaign Schedule"),
  },
  async (input) => {
    // 1. Locate the tool
    const scheduler = await ai.registry.lookupAction("tool/swarm/temporal_optimizer");

    if (!scheduler) {
      throw new Error("Scheduler (Agent 8) is not responding in the swarm.");
    }

    // 2. Build the schedule
    const result = await scheduler({
        strategy: input.strategy,
        assets: input.assets,
        start_date: input.startDate,
        end_date: input.endDate
    });

    // 3. Return the schedule
    return result;
  }
);

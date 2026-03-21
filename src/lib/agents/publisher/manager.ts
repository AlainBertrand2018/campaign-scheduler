import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Publisher - Platform Handshake Flow
 * This flow executes the actual technical interaction with platform APIs.
 * Calls the Python backend (Agent 9) via MCP.
 */
export const platformHandshakeFlow = ai.defineFlow(
  {
    name: "platformHandshakeFlow",
    inputSchema: z.object({
      assets: z.array(z.record(z.any())).describe("Approved creative assets"),
      schedule: z.record(z.any()).describe("The final Campaign Schedule"),
      tokens: z.record(z.string()).describe("Platform OAuth/API tokens"),
    }),
    outputSchema: z.record(z.any()).describe("Publishing Execution Log"),
  },
  async (input) => {
    // 1. Locate the tool
    const publisher = await ai.registry.lookupAction("tool/swarm/platform_handshake");

    if (!publisher) {
      throw new Error("Publisher (Agent 9) is not responding in the swarm.");
    }

    // 2. Perform the execution
    const result = await publisher({
        assets: input.assets,
        schedule: input.schedule,
        tokens: input.tokens
    });

    // 3. Return the execution result
    return result;
  }
);

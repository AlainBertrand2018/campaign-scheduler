import { ai } from "../../genkit";
import { z } from "genkit";

/**
 * Creative QC - Auditor Flow
 * This flow performs a quality audit on generated copy or visual briefs.
 * Calls the Python backend (Agent 7) via MCP.
 */
export const qcAuditorFlow = ai.defineFlow(
  {
    name: "qcAuditorFlow",
    inputSchema: z.object({
      brandDNA: z.record(z.any()).describe("Structured Brand DNA"),
      productDNA: z.record(z.any()).describe("Structured Product DNA"),
      asset: z.record(z.any()).describe("The generated copy or visual brief asset"),
      originalBrief: z.record(z.any()).optional().describe("Prompt or brief context"),
    }),
    outputSchema: z.record(z.any()).describe("The Creative QC Audit Report"),
  },
  async (input) => {
    // 1. Locate the tool
    const auditor = await ai.registry.lookupAction("tool/swarm/qc_auditor");

    if (!auditor) {
      throw new Error("Quality Controller (Agent 7) is not responding in the swarm.");
    }

    // 2. Perform the audit
    const result = await auditor({
        brand_dna: input.brandDNA,
        product_dna: input.productDNA,
        asset: input.asset,
        original_brief: input.originalBrief || null
    });

    // 3. Return the audit result
    return result;
  }
);

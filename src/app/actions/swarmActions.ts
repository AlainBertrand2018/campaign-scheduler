'use server';

import { ai } from '@/lib/genkit';
import { kycManagerFlow } from '@/lib/agents/kyc/manager';
import { productManagerFlow } from '@/lib/agents/product/manager';

/**
 * INITIAL SYNTHESIS ACTION
 * This is the first gate (Gate 1) of the Enola Swarm.
 * It runs Agent 1 (KYC) and Agent 2 (Product) in parallel.
 */
export async function runInitialSynthesisAction(formData: any) {
    try {
        console.log("🚀 TRIGGERING SWARM GATE 1: Initial Synthesis...");
        
        // 1. Convert form data/input to a structured brief
        const brandName = formData.brandName;
        const target = formData.targetAudience;
        const voice = formData.brandVoice;
        
        // 2. Run KYC and Product Managers in parallel for speed
        const [brandDNA, productDNA] = await Promise.all([
            kycManagerFlow({ 
                brandName, 
                targetAudience: target, 
                brandVoice: voice 
            }),
            productManagerFlow({ 
                brandName, 
                productSpecs: formData.productSpecs || "Standard SaaS" 
            })
        ]);

        return {
            success: true,
            brandDNA,
            productDNA
        };
    } catch (error: any) {
        console.error("🚨 SWARM GATE 1 FAILED:", error);
        return { success: false, error: error.message };
    }
}

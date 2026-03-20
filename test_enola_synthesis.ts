// Must ensure API Keys are mapped correctly for Genkit synthesis
process.env.GOOGLE_GENAI_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

import { SwarmManager } from './src/lib/agents/SwarmManager';
import { useCampaignStore } from './src/lib/store/useCampaignStore';

async function testEnolaSynthesis() {
  console.log("=== ENOLA SYNTHESIS TEST RUN ===");
  
  // Mock addLog to print to console
  useCampaignStore.setState({
    addLog: (log: any) => {
      console.log(`[LOG] ${log.agent.padEnd(15)} | ${log.message}`);
    }
  });

  const testInput = {
    brand_notes: "A premium eco-friendly skincare brand focused on minimalist beauty and sustainable packaging.",
    url: "https://minimal-beauty.example.com",
    product_desc: "The 'Rainforest Elixir' - A 100% organic facial oil that uses rare Amazonian botanicals to restore radiance.",
    objective: "Create an awareness campaign for luxury-oriented eco-conscious millennials to launch the new Elixir.",
    duration: "14 days",
  };

  try {
    const result = await SwarmManager.synthesizeStrategy(testInput);
    
    console.log("\n=== ENOLA'S STRATEGIC DIRECTIVE ===");
    console.log(JSON.stringify(result.directive, null, 2));

    console.log("\n=== STRATEGIST'S BLUEPRINT (ENOLA-INFLUENCED) ===");
    console.log(JSON.stringify(result.blueprint, null, 2));

    console.log("\n=== TEST COMPLETE ===");
    process.exit(0);
  } catch (err) {
    console.error("!!! TEST FAILED !!!", err);
    process.exit(1);
  }
}

testEnolaSynthesis();

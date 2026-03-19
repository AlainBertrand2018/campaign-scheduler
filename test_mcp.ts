
import { SwarmManager } from './src/lib/agents/SwarmManager';
import { useCampaignStore } from './src/lib/store/useCampaignStore';

async function testSwarm() {
  console.log('Starting MCP Test...');
  try {
    const { brandDNA, productDNA, blueprint } = await SwarmManager.synthesizeStrategy({
      url: 'https://example.com',
      product_desc: 'An AI-powered campaign scheduler for marketing teams.',
      objective: 'Increase sign-ups for the beta program',
      duration: '30 Days',
    });

    console.log('\n[PHASE 1 SUCCESS] Extracted Blueprint:');
    console.log(JSON.stringify(blueprint, null, 2));

    console.log('\n[PHASE 2] Initiating Creative Generation Swarm...');
    const { personas, creatives } = await SwarmManager.generateCreativeSwarm({
      blueprint: blueprint,
      brandDNA: brandDNA,
    });

    console.log('\n[PHASE 2 SUCCESS] Generated Personas:');
    console.log(JSON.stringify(personas, null, 2));

    console.log('\n[PHASE 2 SUCCESS] Generated Creatives:');
    console.log(JSON.stringify(creatives, null, 2));

    console.log('\n[PHASE 3] Initiating Execution Swarm...');
    const { schedules, publishedResults } = await SwarmManager.executeCampaignSwarm({
      creatives: creatives,
      platforms: ['LinkedIn', 'Twitter_X'],
      campaign_duration_days: 14,
      timezone: 'America/New_York',
    });

    console.log('\n[PHASE 3 SUCCESS] Generated Schedules:');
    console.log(JSON.stringify(schedules, null, 2));

    console.log('\n[PHASE 3 SUCCESS] Publication Simulation:');
    console.log(JSON.stringify(publishedResults, null, 2));

  } catch (error) {
    console.error('MCP Execution Failed:', error);
  }
}

testSwarm();

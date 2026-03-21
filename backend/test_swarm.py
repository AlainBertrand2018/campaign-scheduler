import asyncio
from logic.kyc_chain import KYCChain
from logic.product_chain import ProductChain
from logic.strategist_chain import StrategistChain

async def test_full_swarm_synthesis():
    print("LOG: Starting Full Swarm Synthesis Test...")
    
    # 1. KYC Extraction
    print("LOG: [Agent 1] Analyzing Brand DNA...")
    kyc = KYCChain()
    brand_dna = await kyc.extract_brand_dna("Enola.ai: The Agency-Director AI that orchestrates a swarm of 12 agents for premium social advertising.")
    
    # 2. Product Mapping
    print("LOG: [Agent 2] Mapping Product DNA...")
    pm = ProductChain()
    product_dna = await pm.map_product_dna("Enola platform: Automated multi-agent workflow, Gemini 2.5 Pro architecture, instant ROI reporting.")
    
    # 3. Strategy Orchestration
    print("LOG: [Agent 3] Generating Campaign Blueprint...")
    cs = StrategistChain()
    blueprint = await cs.build_campaign_blueprint(brand_dna.model_dump(), product_dna.model_dump(), "Launch Campaign for Q2")
    
    print("\nSUCCESS: Full Swarm Strategy Synthesis Complete!")
    print(f"Campaign: {blueprint.campaign_name}")
    print(f"Creative Direction: {blueprint.creative_direction}")
    print("\nExecution DAG (Tasks):")
    for task in blueprint.execution_dag:
        deps = f"(depends on: {task.depends_on})" if task.depends_on else "(no dependencies)"
        print(f"- {task.id} by {task.agent_id} {deps}")

if __name__ == "__main__":
    asyncio.run(test_full_swarm_synthesis())

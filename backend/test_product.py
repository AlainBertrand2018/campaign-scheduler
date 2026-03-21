import asyncio
from logic.product_chain import ProductChain

async def test_product_mapping():
    print("LOG: Initializing Product Manager (Agent 2)...")
    pm = ProductChain()
    
    test_input = """
    Product: Enola AI Swarm
    Features: 
    - 12 Specialized Agent Personas (Strategist, Copywriter, Art Director, etc.)
    - Gemini 1.5 and 2.0 native integration.
    - MCP Federated architecture.
    - Genkit-powered orchestration.
    - Real-time automated publishing.
    """
    
    print("LOG: Mapping Product DNA...")
    try:
        dna = await pm.map_product_dna(test_input)
        print("\nSUCCESS: Product DNA Mapping Complete!")
        print(f"Name: {dna.name}")
        print(f"Main Value Prop: {dna.value_proposition}")
        print("\nKey Benefits:")
        for b in dna.benefits[:2]:
            print(f"- {b.benefit} (Solves: {b.pain_point})")
    except Exception as e:
        print(f"\nERROR: {e}")

if __name__ == "__main__":
    asyncio.run(test_product_mapping())

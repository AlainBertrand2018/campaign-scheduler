import asyncio
from logic.kyc_chain import KYCChain

async def test_extraction():
    print("LOG: Initializing KYC Manager (Agent 1)...")
    kyc = KYCChain()
    
    test_input = """
    Brand Name: Enola.ai
    Target: Social media managers and creative agencies.
    Voice: Professional yet cutting-edge. Bold and direct.
    Values: Efficiency, Creative Excellence, Transparency.
    USP: The only multi-agent swarm that automates the entire social media ad pipeline at premium agency standards.
    """
    
    print("LOG: Analyzing Brand Signals...")
    try:
        dna = await kyc.extract_brand_dna(test_input)
        print("\nSUCCESS: Extraction Successful!")
        print(f"Name: {dna.identity.name}")
        print(f"Archetype: {dna.identity.archetype}")
        print(f"Tone: {dna.voice.tone}")
        print(f"USP: {dna.positioning.usp}")
    except Exception as e:
        print(f"\nERROR: {e}")

if __name__ == "__main__":
    asyncio.run(test_extraction())

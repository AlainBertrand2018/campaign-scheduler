import asyncio
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from logic.kyc_chain import KYCChain

async def test():
    try:
        kyc = KYCChain()
        input_data = {"url": "https://16-travel.vercel.app/"}
        print("Starting KYC extraction with max_tokens=4000...")
        res = await kyc.extract_brand_dna(input_data)
        if res:
            print("Extraction successful!")
            print("IMAGES:", res.visual.extracted_app_images)
            print("COLORS:", res.visual.extracted_app_colors)
            print("FONTS:", res.visual.extracted_app_fonts)
            
            # Print parts that were failing
            print("IN DEPTH ANALYSIS:", getattr(res.foundation.strategic_dive, 'in_depth_analysis', None))
        else:
            print("Extraction returned None")
    except Exception as e:
        import traceback
        print(f"Extraction failed: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    asyncio.run(test())

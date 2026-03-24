import asyncio
import os
import sys
import json

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from utilities.web_scraper import deep_scan_url

async def test():
    try:
        url = "https://16-travel.vercel.app/"
        print(f"Scraping {url}...")
        res = await deep_scan_url(url)
        print("Scraping successful.")
        
        # Verify images, fonts, and colors
        print("Images found:", len(res.get('images', [])))
        if res.get('images'):
            print("First image:", dict(list(res['images'][0].items())[:3]))
        
        print("Colors found:", res.get('colors'))
        print("Fonts found:", res.get('fonts'))
        
    except Exception as e:
        import traceback
        print(f"Scraping failed: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    asyncio.run(test())

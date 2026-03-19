import os
import json
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv

from google import genai
from google.genai import types

# Load from multiple potential locations for robustness
load_dotenv() # local .env
load_dotenv(dotenv_path="../.env") # root .env
load_dotenv(dotenv_path="../.env.local") # root .env.local

# 1. Initialize the Unified Client
apiKey = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=apiKey)
EXTRACTION_MODEL = "gemini-2.5-flash"

# Initialize FastMCP
mcp = FastMCP("BrandDNA")

# 3. Handshake Schema
class BrandDNA(BaseModel):
    brand_name: str
    primary_colors: List[str]
    brand_voice: str
    target_audience: str
    key_value_propositions: List[str]
    restricted_keywords: List[str]

@mcp.tool()
async def analyze_brand_url(url: str, objective: str = "General Brand Analysis") -> str:
    """Analyzes a URL and extracts the visual and tonal DNA."""
    print(f"--- DNA Architect: Analyzing {url} ---")
    
    try:
        prompt = f"Analyze the brand at {url}. Extract the visual and tonal DNA."
        
        # Using structured output for the handshake
        response = client.models.generate_content(
            model=EXTRACTION_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=BrandDNA,
                system_instruction="You are a Brand Strategist. Extract structured DNA for campaign orchestration."
            )
        )
        
        dna = response.parsed
        
        # Prepare the Handshake Payload
        handshake = {
            "context": dna.model_dump(),
            "objective": objective,
            "metadata": {
                "source": "Python-DNA-Architect-v1",
                "timestamp": "2026-03-19T00:00:00Z"
            }
        }
        
        return json.dumps(handshake)
    except Exception as e:
        print(f"DNA Extraction Failed: {e}")
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    mcp.run()

import os
import json
from google import genai
from google.genai import types
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
import uvicorn

# Load from multiple potential locations for robustness
load_dotenv() # local .env
load_dotenv(dotenv_path="../.env") # root .env
load_dotenv(dotenv_path="../.env.local") # root .env.local

app = FastAPI(title="Gravity.ai Strategic Engine (2026 Shift)")

# 1. Initialize the Unified Client
apiKey = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=apiKey)

# 2. Models (2026 Standards)
STRATEGIST_MODEL = "gemini-2.5-pro"
EXTRACTION_MODEL = "gemini-2.5-flash"

# 3. Handshake Schema
class BrandDNA(BaseModel):
    brand_name: str
    primary_colors: List[str]
    brand_voice: str
    target_audience: str
    key_value_propositions: List[str]
    restricted_keywords: List[str]

class DNARequest(BaseModel):
    url: str
    objective: Optional[str] = "General Brand Analysis"

@app.get("/")
def read_root():
    return {"status": "Gravity.ai Strategic Engine ACTIVE (2026)", "model": EXTRACTION_MODEL}

@app.post("/extract-dna")
async def extract_dna(request: DNARequest):
    """
    ENDPOINT: DNA Architect (Python)
    Action: Scrapes and analyzes the website to create the 'Handshake' payload.
    """
    print(f"--- DNA Architect: Analyzing {request.url} ---")
    
    try:
        prompt = f"Analyze the brand at {request.url}. Extract the visual and tonal DNA."
        
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
            "objective": request.objective,
            "metadata": {
                "source": "Python-DNA-Architect-v1",
                "timestamp": "2026-03-19T00:00:00Z"
            }
        }
        
        return handshake
    except Exception as e:
        print(f"DNA Extraction Failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

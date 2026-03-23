import os
import sys
import json
import asyncio
from typing import Dict, Any, List
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from logic.enola_chain import generate_strategic_directive, audit_creative
from logic.kyc_chain import KYCChain
from logic.product_chain import ProductChain
from logic.strategist_chain import StrategistChain
from logic.surveyor_chain import SurveyorChain
from logic.copywriter_chain import CopywriterChain
from logic.art_director_chain import ArtDirectorChain
from logic.qc_chain import QCChain
from logic.scheduler_chain import SchedulerChain
from logic.publisher_chain import PublisherChain
from logic.statistician_chain import StatisticianChain
from logic.accountant_chain import AccountantChain
from logic.nanobanana_chain import BananaChain
from datetime import datetime
from dotenv import load_dotenv

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

load_dotenv()

# 1. Initialize FastAPI App Directly
app = FastAPI(title="ENOLA_AI_SWARM_SERVICE")

# 2. Add CORS Middleware for Vercel Frontend
# Allow dynamic frontend URL via ENV for Render/Vercel parity
# Allow dynamic frontend URL via ENV for Render/Vercel parity
allowed_origins = [
    "https://enola.launchableai.online",
    "https://enola.launchableai.online/",
    "https://enola-ai.vercel.app", 
    "https://enola-ai.vercel.app/",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]

if os.environ.get("FRONTEND_URL"):
    frontend_url = os.environ.get("FRONTEND_URL").rstrip('/')
    allowed_origins.append(frontend_url)
    allowed_origins.append(f"{frontend_url}/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -- CORE BRAND DNA EXTRACTION & PDF GENERATION --

@app.post("/api/extract-dna")
async def extract_dna_endpoint(request: Request):
    """
    Standard REST endpoint for the frontend to access the KYC Manager.
    """
    # Protocol detection for Proxy (Render/Vercel)
    proto = request.headers.get("x-forwarded-proto", "http")
    host = request.headers.get("host")
    base_url = f"{proto}://{host}"
    
    try:
        data = await request.json()
        # 1. Engage KYC Chain (Agent 1)
        kyc = KYCChain()
        dna_result = await kyc.extract_brand_dna(data)
        
        if dna_result is None:
            print("ERROR: KYCChain returned None")
            return JSONResponse({
                "ok": False,
                "error": "SILENT_AI_FAILURE",
                "message": "The AI failed to generate a structured Brand DNA. This can happen with very complex inputs or API timeouts."
            }, status_code=500)

        dna_dict = dna_result.model_dump()
        
        # 2. Return the payload to the frontend IMMEDIATELY
        # The frontend will now handle the rendering of the "Live Canvas" report.
        return JSONResponse({
            "ok": True,
            "status": "success", 
            "data": dna_dict
        })
    except ValueError as ve:
        return JSONResponse(
            status_code=400,
            content={
                "ok": False,
                "error": "VALIDATION_ERROR",
                "message": str(ve)
            }
        )
    except Exception as e:
        import traceback
        import sys
        
        err_trace = traceback.format_exc()
        print(f"FATAL_EXTRACTION_ERROR: {e}", file=sys.stderr)

        return JSONResponse({
            "ok": False,
            "error": "INTERNAL_EXTRACTION_ERROR",
            "message": "Unexpected backend failure during DNA extraction",
            "details": err_trace
        }, status_code=500)

# -- SWARM TOOL ENDPOINTS --

@app.post("/tools/strategic-synthesis")
async def tool_strategic_synthesis(data: dict):
    return await generate_strategic_directive(data.get("brand_dna"), data.get("product_dna"))

@app.post("/tools/director-audit")
async def tool_director_audit(data: dict):
    return await audit_creative(data.get("creative_brief"), data.get("brand_voice_specs"))

@app.post("/tools/brand-dna-extractor")
async def tool_brand_dna_extractor(data: dict):
    kyc = KYCChain()
    result = await kyc.extract_brand_dna(data.get("raw_input"))
    return result.model_dump()

@app.post("/tools/product-dna-mapper")
async def tool_product_dna_mapper(data: dict):
    pm = ProductChain()
    result = await pm.map_product_dna(data.get("raw_input"))
    return result.model_dump()

@app.post("/tools/campaign-blueprint-engine")
async def tool_campaign_blueprint_engine(data: dict):
    cs = StrategistChain()
    result = await cs.build_campaign_blueprint(data.get("brand_dna"), data.get("product_dna"), data.get("user_brief", ""))
    return result.model_dump()

@app.post("/tools/persona-forge")
async def tool_persona_forge(data: dict):
    sc = SurveyorChain()
    result = await sc.forge_persona(data.get("brand_dna"), data.get("strategy_brief", ""))
    return result.model_dump()

@app.post("/tools/copy-forge")
async def tool_copy_forge(data: dict):
    cc = CopywriterChain()
    result = await cc.write_campaign_copy(
        data.get("brand_dna"), 
        data.get("product_dna"), 
        data.get("persona"), 
        data.get("strategy_brief", ""), 
        data.get("platforms", ["LinkedIn"])
    )
    return result.model_dump()

@app.post("/tools/visual-prompt-engine")
async def tool_visual_prompt_engine(data: dict):
    ad = ArtDirectorChain()
    result = await ad.generate_visual_brief(data.get("brand_dna"), data.get("strategy"), data.get("copy_brief"))
    return result.model_dump()

@app.post("/tools/qc-auditor")
async def tool_qc_auditor(data: dict):
    qc = QCChain()
    result = await qc.audit_asset(data.get("brand_dna"), data.get("product_dna"), data.get("asset"), data.get("original_brief"))
    return result.model_dump()

@app.post("/tools/temporal-optimizer")
async def tool_temporal_optimizer(data: dict):
    sc = SchedulerChain()
    result = await sc.create_campaign_schedule(data.get("strategy"), data.get("assets"), data.get("start_date"), data.get("end_date"))
    return result.model_dump()

@app.post("/tools/platform-handshake")
async def tool_platform_handshake(data: dict):
    pc = PublisherChain()
    result = await pc.execute_publishing(data.get("assets"), data.get("schedule"), data.get("tokens"))
    return result.model_dump()

@app.post("/tools/metrics-loop")
async def tool_metrics_loop(data: dict):
    st = StatisticianChain()
    result = await st.analyze_performance(data.get("campaign_id"), data.get("live_data"), data.get("strategy"))
    return result.model_dump()

@app.post("/tools/cost-intelligence")
async def tool_cost_intelligence(data: dict):
    ac = AccountantChain()
    result = await ac.calculate_campaign_costs(data.get("campaign_id"), data.get("usage_data"), data.get("budget"))
    return result.model_dump()

@app.post("/tools/banana-forge")
async def tool_banana_forge(data: dict):
    from models.nanobanana import BananaInput
    nb = BananaChain()
    input_data = BananaInput(
        prompt=data.get("visual_prompt"),
        brand_context=data.get("brand_context", ""),
        style_preference=data.get("style_preference", "Premium SaaS")
    )
    result = await nb.generate_visual_variants(input_data)
    return result.model_dump()

# -- APP STARTUP --

@app.get("/")
async def root():
    return {"status": "Enola Swarm Service is Online", "version": "1.1.0"}

if __name__ == "__main__":
    import uvicorn
    # Local and production port handling
    port = int(os.environ.get("PORT", 8000))
    print(f"Server starting on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)

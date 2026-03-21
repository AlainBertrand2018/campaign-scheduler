import os
from mcp.server.fastmcp import FastMCP
from fastapi import Request
from fastapi.responses import JSONResponse, FileResponse
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
from utilities.pdf_manager import generate_dna_pdf
from dotenv import load_dotenv

load_dotenv()

# 1. Initialize Federated Agents App
mcp = FastMCP("ENOLA_AI_SWARM", host="0.0.0.0", port=8000)

# -- ENOLA DIRECTOR TOOLS --

@mcp.tool()
async def strategic_synthesis(brand_dna: dict, product_dna: dict):
    """Enola combines Brand and Product DNA into a definitive Strategic Directive.
    Returns a structured StrategicDirective object.
    """
    return await generate_strategic_directive(brand_dna, product_dna)

@mcp.tool()
async def director_audit(creative_brief: dict, brand_voice_specs: str):
    """Enola reviews creative output against the brand soul. 
    Returns a structured QAReport.
    """
    return await audit_creative(creative_brief, brand_voice_specs)

# -- KYC MANAGER TOOLS --

@mcp.tool()
async def brand_dna_extractor(raw_input: str):
    """
    The KYC Manager extracts the soul of the brand from raw signals.
    Returns a structured BrandDNA object.
    
    Args:
        raw_input: Raw text or scraped signals from the brand.
    """
    kyc = KYCChain()
    result = await kyc.extract_brand_dna(raw_input)
    # Using model_dump() ensures we return a serializable dict for the MCP bridge
    return result.model_dump()

# -- PRODUCT MANAGER TOOLS --

@mcp.tool()
async def product_dna_mapper(raw_input: str):
    """
    Agent 2: Product DNA Manager. 
    Maps features to user benefits, proof points, and emotional hooks.
    Returns a structured ProductDNA object.
    
    Args:
        raw_input: Raw features, specs, or website content.
    """
    pm = ProductChain()
    result = await pm.map_product_dna(raw_input)
    return result.model_dump()

# -- STRATEGIST TOOLS --

@mcp.tool()
async def campaign_blueprint_engine(brand_dna: dict, product_dna: dict, user_brief: str = ""):
    """
    Agent 3: Campaign Strategist. 
    Synthesizes brand and product information into a Master Execution Plan.
    Returns a structured CampaignBlueprint with a task DAG.
    
    Args:
        brand_dna: Structured brand information (Agent 1).
        product_dna: Structured product mapping (Agent 2).
        user_brief: Optional user-provided context or objectives.
    """
    cs = StrategistChain()
    result = await cs.build_campaign_blueprint(brand_dna, product_dna, user_brief)
    return result.model_dump()

# -- SURVEYOR TOOLS --

@mcp.tool()
async def persona_forge(brand_dna: dict, strategy_brief: str = ""):
    """
    Agent 4: Audience Surveyor. 
    Forges hyper-specific psychological personas for the target audience.
    Returns a SurveyorOutput object with the audience map.
    
    Args:
        brand_dna: Structured brand definition (Agent 1).
        strategy_brief: High-level campaign strategy or context.
    """
    sc = SurveyorChain()
    result = await sc.forge_persona(brand_dna, strategy_brief)
    return result.model_dump()

# -- COPYWRITER TOOLS --

@mcp.tool()
async def commercial_copy_deck(user_brief: str, platforms: list = ["LinkedIn", "Instagram"]):
    """
    Agent 5: Standalone Commercial Copy Service ($1.99).
    Forges 5 distinct psychological copy variants from a raw brief.
    Returns a CopyDeck object with strategic rationales.
    
    Args:
        user_brief: The raw objective or product description from the user.
        platforms: List of social media platforms to target.
    """
    cc = CopywriterChain()
    result = await cc.write_standalone_copy_deck(user_brief, platforms)
    return result.model_dump()

@mcp.tool()
async def copy_forge(brand_dna: dict, product_dna: dict, persona: dict, strategy_brief: str = "", platforms: list = ["LinkedIn"]):
    """
    Agent 5: Integrated Copy Agent. 
    Forges deep-aligned ad copy for a specific campaign context.
    Returns a CopyDeck object.
    
    Args:
        brand_dna: Structured brand definition (Agent 1).
        product_dna: Structured product mapping (Agent 2).
        persona: Target persona definition (Agent 4).
        strategy_brief: High-level campaign strategy context.
        platforms: List of social media platforms to target.
    """
    cc = CopywriterChain()
    result = await cc.write_campaign_copy(brand_dna, product_dna, persona, strategy_brief, platforms)
    return result.model_dump()

# -- ART DIRECTOR TOOLS --

@mcp.tool()
async def standalone_visual_brief(user_idea: str, style_preference: str = "Premium SaaS"):
    """
    Agent 6: Standalone Visual Brief Service ($1.99).
    Architects 3 high-end, technically precise 4K visual briefs from a raw idea.
    Returns a VisualBrief object.
    
    Args:
        user_idea: The raw visual concept or goal.
        style_preference: Desired aesthetic (Cyberpunk, Soft Luxe, etc).
    """
    ad = ArtDirectorChain()
    result = await ad.write_standalone_visual_brief(user_idea, style_preference)
    return result.model_dump()

@mcp.tool()
async def visual_prompt_engine(brand_dna: dict, strategy: dict, copy_brief: dict = None):
    """
    Agent 6: Integrated Visual Architect. 
    Forges brand-aligned visual direction for a specific campaign context.
    Returns a VisualBrief object.
    
    Args:
        brand_dna: Structured brand definition (Agent 1).
        strategy: Campaign strategy context (Agent 3).
        copy_brief: Ad copy context (Agent 5).
    """
    ad = ArtDirectorChain()
    result = await ad.generate_visual_brief(brand_dna, strategy, copy_brief)
    return result.model_dump()

# -- QUALITY CONTROL TOOLS --

@mcp.tool()
async def qc_auditor(brand_dna: dict, product_dna: dict, asset: dict, original_brief: dict = None):
    """
    Agent 7: Creative QC Auditor. 
    Performs a brand consistency and compliance audit on any generated asset.
    Returns a QCReport object.
    
    Args:
        brand_dna: Structured brand definition (Agent 1).
        product_dna: Structured product mapping (Agent 2).
        asset: The copy or visual asset to audit.
    """
    qc = QCChain()
    result = await qc.audit_asset(brand_dna, product_dna, asset, original_brief)
    return result.model_dump()

# -- SCHEDULER TOOLS --

@mcp.tool()
async def temporal_optimizer(strategy: dict, assets: list, start_date: str, end_date: str):
    """
    Agent 8: Scheduling Agent. 
    Determines optimal publishing windows for a range of campaign assets.
    Returns a CampaignSchedule object.
    
    Args:
        strategy: High-level campaign strategy or blueprint (Agent 3).
        assets: List of approved copy or visual assets (Post-QC).
        start_date: ISO date for campaign launch.
        end_date: ISO date for campaign completion.
    """
    sc = SchedulerChain()
    result = await sc.create_campaign_schedule(strategy, assets, start_date, end_date)
    return result.model_dump()

# -- PUBLISHER TOOLS --

@mcp.tool()
async def platform_handshake(assets: list, schedule: dict, tokens: dict):
    """
    Agent 9: Publishing Agent. 
    Executes actual technical publishing or scheduling to social platform APIs.
    Returns a PublishingExecution object.
    
    Args:
        assets: List of approved and scheduled creative assets.
        schedule: The complete CampaignSchedule.
        tokens: Dictionary of platform-specific OAuth or API tokens.
    """
    pc = PublisherChain()
    result = await pc.execute_publishing(assets, schedule, tokens)
    return result.model_dump()

# -- ANALYTICS TOOLS --

@mcp.tool()
async def metrics_loop(campaign_id: str, live_data: dict, strategy: dict):
    """
    Agent 10: Analytics Feedback Agent. 
    Ingests live platform performance data and outputs refinement signals.
    Returns a PerformanceAudit object.
    
    Args:
        campaign_id: Unique campaign identifier.
        live_data: Raw JSON metrics from social platforms.
        strategy: The original strategy context for comparison.
    """
    st = StatisticianChain()
    result = await st.analyze_performance(campaign_id, live_data, strategy)
    return result.model_dump()

# -- FINANCE TOOLS --

@mcp.tool()
async def cost_intelligence(campaign_id: str, usage_data: dict, budget: float):
    """
    Agent 11: Accounting Agent. 
    Maintains financial transparency and calculates token/API costs.
    Returns a FinanceReport object.
    
    Args:
        campaign_id: Unique campaign identifier.
        usage_data: Aggregated JSON usage (tokens, platform fees).
        budget: Maximum budget remaining for this campaign.
    """
    ac = AccountantChain()
    result = await ac.calculate_campaign_costs(campaign_id, usage_data, budget)
    return result.model_dump()

# -- NANO BANANA TOOLS --

@mcp.tool()
async def banana_forge(visual_prompt: str, brand_context: str = "", style_preference: str = "Premium SaaS"):
    """
    Agent 12: Nano Banana (Visual Executor). 
    Executes the physical generation of visuals based on prompts.
    Returns a BananaOutput with 4 visual variants and editable metadata.
    
    Args:
        visual_prompt: The technically precise prompt (Agent 6).
        brand_context: High-level brand soul context.
        style_preference: Desired aesthetic (Dark Mode, Minimalist, etc).
    """
    from models.nanobanana import BananaInput
    nb = BananaChain()
    input_data = BananaInput(
        prompt=visual_prompt,
        brand_context=brand_context,
        style_preference=style_preference
    )
    result = await nb.generate_visual_variants(input_data)
    return result.model_dump()

# -- ARTIFACT GENERATION TOOLS --

@mcp.tool()
async def generate_brand_report(brand_dna: dict):
    """
    Agent 01 Artifact Generator. 
    Generates a professional, industrial-grade PDF manifest of the Brand DNA.
    Returns the download URL for the generated PDF.
    """
    path, filename = generate_dna_pdf(brand_dna)
    # Provide a relative URL for the frontend to download
    return {"status": "success", "url": f"/exports/{filename}", "filename": filename}

@mcp.custom_route("/api/extract-dna", methods=["POST", "OPTIONS"])
async def extract_dna_endpoint(request: Request):
    """
    Standard REST endpoint for the frontend to access the KYC Manager.
    """
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*"
    }
    
    if request.method == "OPTIONS":
        return JSONResponse(status_code=200, content="OK", headers=cors_headers)
        
    # Build dynamic base URL (Render will be https://..., local will be http://localhost:...)
    protocol = "https" if "render.com" in str(request.base_url) else "http"
    base_url = f"{protocol}://{request.headers.get('host')}"
    
    data = await request.json()
    
    # 1. Engage KYC Chain
    kyc = KYCChain()
    dna_result = await kyc.extract_brand_dna(data)
    dna_dict = dna_result.model_dump()
    
    # 2. Immediately Generate the Agency-Grade PDF Reports
    p_path, p_name, m_path, m_name = generate_dna_pdf(dna_dict)
    
    # 3. Return the payload to the frontend for the grid and the PDF preview iframe
    return JSONResponse({
        "status": "success",
        "data": dna_dict,
        "preview_pdf_url": f"{base_url}/exports/{p_name}",
        "master_pdf_url": f"{base_url}/exports/{m_name}"
    }, headers=cors_headers)


@mcp.custom_route("/exports/{filename:str}", methods=["GET", "OPTIONS"])
async def serve_exports(request: Request):
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "*"
    }
    
    if request.method == "OPTIONS":
        return JSONResponse(status_code=200, content="OK", headers=cors_headers)
        
    filename = request.path_params.get("filename")
    file_path = os.path.join(os.getcwd(), "exports", filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, headers=cors_headers)
    return JSONResponse({"status": "not_found"}, status_code=404, headers=cors_headers)


if not os.path.exists("exports"):
    os.makedirs("exports")

if __name__ == "__main__":
    # FastMCP run handles SSE transport and uvicorn internally
    # In 2026, we use the port 8000 for our swarm
    mcp.run(transport="sse")

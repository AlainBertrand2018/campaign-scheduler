import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from pydantic import BaseModel, Field
from typing import List, Optional
from models.kyc import MasterBrandDNA, BrandFoundation, VisualSystem, VoiceProfile, MarketPositioning
from utilities.web_scraper import deep_scan_url

# Load environment variables
load_dotenv()

# Internal Sub-Agent Models
class VisualAuditResult(BaseModel):
    primary_colors: List[dict] = Field(..., description="List of {hex: str, psychology: str, analysis: str}")
    fonts: List[str] = Field(..., description="List of identified font families")
    imagery_style: str = Field(..., description="Description of photography/imagery style")
    logo_style: str = Field(..., description="Logo layout and style classification")

class KYCChain:
    """
    The reasoning logic for the KYC Manager (Brand DNA Manager).
    Orchestrates a multi-pass pipeline of sub-agents:
    1. Browser Sub-Agent (Playwright)
    2. Visual Sub-Agent (Vision LLM)
    3. Strategic Sub-Agent (Reasoning LLM)
    """
    def __init__(self):
        # Gemini 2.0 Flash for all reasoning passes
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.0,
            max_retries=3
        )

    async def _run_visual_audit(self, screenshot_b64: str, logo_base64: str = None) -> dict:
        """
        Sub-Agent: Visual Auditor.
        Analyzes screenshots and logos to extract high-fidelity aesthetic data.
        """
        system_msg = SystemMessage(content="""
        You are the 'Aesthetic Auditor' for Enola.ai.
        Your job is to look at the brand visuals (website screenshot and/or logo) and extract technical aesthetic data.
        
        CRITICAL: Provide actual HEX codes, identifying font family names, and a critical analysis of the 'Vibe'.
        Return ONLY valid JSON with keys: 
        'primary_colors' (list of {hex, psychology, analysis}), 
        'fonts' (list of strings), 
        'imagery_style' (str), 
        'logo_style' (str).
        """)
        
        content_parts = [{"type": "text", "text": "Analyze these brand visuals and provide a technical visual audit."}]
        if screenshot_b64:
            content_parts.append({"type": "image_url", "image_url": {"url": screenshot_b64}})
        if logo_base64:
            content_parts.append({"type": "image_url", "image_url": {"url": logo_base64}})
            
        human_msg = HumanMessage(content=content_parts)
        
        try:
            # Use structured output for the visual auditor
            llm_with_structure = self.model.with_structured_output(VisualAuditResult)
            response = await llm_with_structure.ainvoke([system_msg, human_msg])
            return response.dict() if response else {}
        except Exception as e:
            print(f"Visual Audit Sub-Agent Failed: {e}")
            return {}

    async def extract_brand_dna(self, input_data: dict) -> MasterBrandDNA:
        """
        Main Orchestrator for the KYC Manager Pipeline.
        """
        brand_name = input_data.get('name', 'Unknown Brand')
        website = input_data.get('website', '')
        logo_b64 = input_data.get('imageBase64', None)
        
        # 1. BROWSER SUB-AGENT: Signal Extraction
        scraping_result = {}
        if website and website.strip() and website.lower() != 'not provided':
            scraping_result = await deep_scan_url(website, max_images=3)
        
        screenshot_b64 = None
        if "images" in scraping_result and len(scraping_result["images"]) > 0:
            screenshot_b64 = scraping_result["images"][0].get("base64")

        # 2. VISUAL SUB-AGENT: Multimodal Aesthetic Audit
        visual_audit = await self._run_visual_audit(screenshot_b64, logo_b64)

        # 3. STRATEGIC SUB-AGENT: Synthesis & Mapping
        # Load Playbook
        playbook_path = os.path.join(os.getcwd(), "KYC_MANAGER_PLAYBOOK.md")
        playbook_content = ""
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                playbook_content = f.read()[:5000]

        system_prompt = f"""
You are Enola, the Agency Director. You are orchestrating the final synthesis of a Brand DNA Manifest.
You have the outputs from several Specialized Sub-Agents (Browser, Visual Auditor).

NON-NEGOTIABLE MISSIONS:
1. TRUTH OVER HALLUCINATION: Priority is User Intake -> Scraped Signals -> Inference.
2. COMPLETENESS: Every field in the schema MUST be filled with high-value professional content.
3. NO DEFAULT STRINGS: Never return placeholders from the schema like "Story under reconstruction.", "Analysis pending.", or "Standard behavior.". You MUST overwrite every single field with unique, brand-specific analysis.
4. ARCHETYPE MAPPING: You MUST assign a primary and secondary archetype (e.g. Hero, Sage, Explorer).
5. BRAND STORY: Write a compelling 2-3 paragraph brand story based on the Manifesto and Problem Solved.
6. DEPTH: If a field asks for a list, provide at least 3-5 items. If it asks for a description, provide at least 2 sentences.

PLAYBOOK DIRECTIVES:
{playbook_content}

VISUAL AUDITOR FEEDBACK (INTEGRATE THIS):
{json.dumps(visual_audit, indent=2)}

SCRAPED TEXT SIGNALS:
{scraping_result.get('raw_text', 'No signals found.')[:10000]}
"""

        user_context = f"""
USER PROVIDED DATA (THE FOUNDATION):
Brand Name: {brand_name}
Industry: {input_data.get('industry', 'N/A')}
Tagline: {input_data.get('tagline', 'N/A')}
Manifesto: {input_data.get('manifesto', 'N/A')}
Target Customer: {input_data.get('target_customer', 'N/A')}
Problem Solved: {input_data.get('problem_solved', 'N/A')}
Market: {input_data.get('market', 'Global')}

TASK: Produce the complete 9-section MasterBrandDNA JSON.
"""

        try:
            # Bind the schema for the final strategic pass
            llm_with_structure = self.model.with_structured_output(MasterBrandDNA)
            dna_result = await llm_with_structure.ainvoke([
                SystemMessage(content=system_prompt),
                HumanMessage(content=user_context)
            ])
            
            if dna_result:
                # Integrity Check: Ensure name and visual assets are correctly mapped
                dna_result.foundation.brand_name = brand_name
                
                # If the Visual Auditor found images or fonts, ensure they are in the 'extracted' lists
                if "images" in scraping_result:
                    dna_result.visual.extracted_app_images = [img["url"] for img in scraping_result["images"] if not img.get("base64") or len(img["base64"]) < 100000] # Don't store large b64 in the dna list
                
                # Safety: If fonts or colors were missing from the audit, use scraping results
                if not dna_result.visual.extracted_app_fonts and "fonts" in scraping_result:
                    dna_result.visual.extracted_app_fonts = scraping_result["fonts"]
                if not dna_result.visual.extracted_app_colors and "colors" in scraping_result:
                    dna_result.visual.extracted_app_colors = scraping_result["colors"]

                return dna_result
            
            raise ValueError("Strategic Sub-Agent failed to return result.")

        except Exception as e:
            print(f"CRITICAL_PIPELINE_FAILURE: {e}")
            # Minimum Viable Fallback
            fallback = MasterBrandDNA()
            fallback.foundation.brand_name = brand_name
            fallback.foundation.brand_story = input_data.get('manifesto', 'Brand manual recovery initiated.')
            return fallback

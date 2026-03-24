import os
import json
import sys
import re
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.output_parsers import PydanticOutputParser
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
        # 1. Vision Auditor (Gemini 2.0 Flash - Best for Multimodal Screenshots/Logos)
        self.vision_model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.0,
            max_retries=3
        )

        # 2. Strategic Orchestrator (DeepSeek V3 via OpenRouter - Best for JSON Reasoning)
        self.reasoning_model = ChatOpenAI(
            model="deepseek/deepseek-chat",
            api_key=os.getenv("OPENROUTER_API_KEY"),
            base_url="https://openrouter.ai/api/v1",
            temperature=0.0,
            max_tokens=3500,
            model_kwargs={"response_format": {"type": "json_object"}},
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
            # Use structured output for the visual auditor (Gemini)
            llm_with_structure = self.vision_model.with_structured_output(VisualAuditResult)
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

        parser = PydanticOutputParser(pydantic_object=MasterBrandDNA)

        system_prompt = f"""
You are Enola, an elite Agency Director at a globally recognized advertising firm. You are orchestrating the final synthesis of a Brand DNA Manifest.
You have the outputs from several Specialized Sub-Agents (Browser, Visual Auditor).
You are not a standard AI assistant. You speak with decisive, razor-sharp, executive authority. Do not praise the brand unnecessarily. Give actionable, high-level strategic intelligence.

NON-NEGOTIABLE MISSIONS:
1. TRUTH OVER HALLUCINATION: Priority is User Intake -> Scraped Signals -> Inference. If signals exist, use them. If they conflict with your "luxury" intuition, the technical signals WIN.
2. COMPLETENESS: Every field in the schema MUST be filled with high-value professional content.
3. THE STRATEGIC DIVE (A, B, C): Every major core section (Foundation, Visual, Voice, Positioning, Audience, Product, Campaign, Audit, Methodology) MUST include deep strategic narrative across 3 distinct fields:
    - in_depth_analysis: The raw mapping and breakdown of the section's data.
    - meaning_explained: Plain English translation of the business or market implication.
    - enolas_guidance: Highly prescriptive recommendation on how to apply this to an ad campaign.
4. ARCHETYPE MAPPING: You MUST assign a primary and secondary archetype.
5. BRAND STORY: Write a compelling 2-3 paragraph brand story based on the Manifesto and Problem Solved.
6. TONE: Be direct, highly professional, and slightly intimidating in your competence. No filler. No "based on the data provided" disclaimers.
7. EXECUTIVE SUMMARY: Complete the `executive_summary` section with a high-level synthesis of brand values and EXACTLY 5 bullet points for Spot Advertising and 5 for Campaign Strategy. This is the TL;DR for the Agency Director.
8. IMAGE ASSET INTEGRITY: Do not provide placeholders for 'extracted_app_images'. Use the verified URLs from the Browser Signals. You MUST include at least 1-3 URLs from the provided list if any are present.
9. COLOR PRECISION: In 'primary_colors' and 'secondary_colors', you MUST use the EXACT HEX codes from the 'SECONDARY BROWSER SIGNALS'. Each ColorDefinition object MUST have the hex_code field populated with one of those values. 

PLAYBOOK DIRECTIVES:
{playbook_content}

VISUAL AUDITOR FEEDBACK (PRIMARY VISUAL SIGNALS):
{json.dumps(visual_audit, indent=2)}

SECONDARY BROWSER SIGNALS (TECHNICAL TRUTH):
- Rendered Colors (USE THESE HEX CODES): {", ".join(scraping_result.get('colors', [])) if scraping_result.get('colors') else 'None detected'}
- Rendered Fonts (USE THESE NAMES): {", ".join(scraping_result.get('fonts', [])) if scraping_result.get('fonts') else 'None detected'}
- Image Assets Found: {json.dumps(scraping_result.get('images', []))}

SCRAPED TEXT SIGNALS:
{scraping_result.get('raw_text', 'No signals found.')[:12000]}

COMMAND: You MUST anchor 'SECTION 2: Visual Identity' in THESE exact technical signals. Do not invent luxury gold or generic navy if the CSS says otherwise.
COMMAND: In 'extracted_app_images', list the most relevant URLs from the 'Image Assets Found' list.
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



FORMATTING INSTRUCTIONS:
{parser.get_format_instructions()}
"""

        try:
            # Manually parse the schema rather than relying on underlying hardware API for OpenRouter reliability
            response = await self.reasoning_model.ainvoke([
                SystemMessage(content=system_prompt),
                HumanMessage(content=user_context)
            ])
            
            raw_text = response.content
            print("Received raw response from DeepSeek...")
            
            # Debug: Dump to file to monitor what the LLM actually generates
            try:
                with open("last_llm_response.log", "w", encoding="utf-8") as debug_file:
                    debug_file.write(raw_text)
            except Exception as e:
                print(f"Failed to write debug log: {e}")
            
            # 1. Brutally rip out any <think>...</think> blocks common in DeepSeek V3 or R1 outputs
            raw_text = re.sub(r'<think>.*?</think>', '', raw_text, flags=re.DOTALL)
            
            # 2. Extract strictly the JSON markdown block, or fallback to the lowest enclosing curly braces
            json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', raw_text, flags=re.DOTALL)
            if json_match:
                json_str = json_match.group(1)
            else:
                start = raw_text.find('{')
                end = raw_text.rfind('}')
                if start != -1 and end != -1:
                    json_str = raw_text[start:end+1]
                else:
                    json_str = raw_text
                    
            try:
                # Attempt strict schema parsing
                dna_result = parser.parse(json_str)
            except Exception as pe:
                print(f"WARNING: Strict Pydantic parsing failed ({pe}). Attempting surgical loose merge to save data.")
                try:
                    # Parse as raw dict
                    parsed_dict = json.loads(json_str)
                    
                    # Prevent DeepSeek from wrapping the entire object in a root namespace (e.g. {"MasterBrandDNA": {...}})
                    if len(parsed_dict) == 1 and isinstance(list(parsed_dict.values())[0], dict):
                        inner = list(parsed_dict.values())[0]
                        if "foundation" in inner or "visual" in inner or "voice" in inner:
                            parsed_dict = inner
                    
                    # Create the fallback canvas
                    dna_result = MasterBrandDNA()
                    
                    # Recursively walk the fallback Pydantic object and overwrite it with whatever the AI successfully generated
                    def _surgical_update(model_instance, data_dict):
                        for key, value in data_dict.items():
                            if hasattr(model_instance, key):
                                current_attr = getattr(model_instance, key)
                                # If it's a nested Pydantic model and value is a dict, recurse
                                if hasattr(current_attr, "model_dump") and isinstance(value, dict):
                                    _surgical_update(current_attr, value)
                                # Give up strict typing for lists and primitives if the AI provided them, it's safer than crashing the whole PDF
                                else:
                                    try:
                                        setattr(model_instance, key, value)
                                    except:
                                        pass
                                        
                    _surgical_update(dna_result, parsed_dict)
                    print("Surgical merge successful. Maximum data salvaged.")
                    
                except Exception as critical_e:
                    print(f"CRITICAL_JSON_RECOVERY_FAILURE: {critical_e}")
                    import traceback
                    print(f"--- PARSE FAIL ---\nException: {critical_e}\nTraceback: {traceback.format_exc()}\n\nRAW JSON_STR:\n{json_str}", file=sys.stderr)
                    raise critical_e
            
            
            if dna_result:
                # Integrity Check: Ensure name and visual assets are correctly mapped
                if not dna_result.foundation:
                    from models.kyc import BrandFoundation
                    dna_result.foundation = BrandFoundation()
                dna_result.foundation.brand_name = brand_name
                
                # Pre-populate the extracted_app_images with the User Logo first, then scraped images
                if logo_b64:
                    dna_result.visual.extracted_app_images.append(logo_b64)

                # If the Visual Auditor found images or fonts, ensure they are in the 'extracted' lists
                if "images" in scraping_result:
                    for img in scraping_result["images"]:
                        url = img.get("url")
                        b64 = img.get("base64")
                        if url and not url.startswith("data:"):
                            # Filter out tracking pixels / tiny icons
                            if any(ext in url.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                                if url not in dna_result.visual.extracted_app_images:
                                    dna_result.visual.extracted_app_images.append(url)
                        elif b64 and 1000 < len(b64) < 500000: # Filter out too small/too large base64
                            if b64 not in dna_result.visual.extracted_app_images:
                                dna_result.visual.extracted_app_images.append(b64)
                
                # Safety: If fonts or colors were missing from the audit, use scraping results
                if not dna_result.visual.extracted_app_fonts and "fonts" in scraping_result:
                    dna_result.visual.extracted_app_fonts = scraping_result["fonts"]
                if not dna_result.visual.extracted_app_colors and "colors" in scraping_result:
                    dna_result.visual.extracted_app_colors = scraping_result["colors"]

                # Force scraped colors into the Pydantic model if they are missing or hallucinated
                if "colors" in scraping_result and scraping_result["colors"]:
                    scraped_colors = scraping_result["colors"]
                    # 1. Fill extracted_app_colors (raw strings)
                    for c in scraped_colors:
                        if c not in dna_result.visual.extracted_app_colors:
                            dna_result.visual.extracted_app_colors.insert(0, c)
                    
                    # 2. If primary_colors objects are missing or Generic, force them
                    if not dna_result.visual.primary_colors or len(dna_result.visual.primary_colors) < 2:
                        from models.kyc import ColorDefinition
                        for i, hex_val in enumerate(scraped_colors[:3]):
                            # Ensure we extract just the HEX from "HEX (RGB)" format if scraper returns that
                            clean_hex = hex_val.split(' ')[0] if ' ' in hex_val else hex_val
                            if not clean_hex.startswith('#'): continue
                            
                            dna_result.visual.primary_colors.append(ColorDefinition(
                                hex_code=clean_hex,
                                psychology="Technical Signal: Extracted from Website CSS.",
                                color_critical_analysis="Direct browser signal anchor."
                            ))

                # Force scraped fonts if missing
                if "fonts" in scraping_result and scraping_result["fonts"]:
                    for f in scraping_result["fonts"]:
                        if f not in dna_result.visual.extracted_app_fonts:
                            dna_result.visual.extracted_app_fonts.append(f)
                    if not dna_result.visual.primary_typography or dna_result.visual.primary_typography == "Sans-serif":
                        dna_result.visual.primary_typography = scraping_result["fonts"][0]

                return dna_result
            
            raise ValueError("Strategic Sub-Agent failed to return result.")

        except Exception as e:
            print(f"CRITICAL_PIPELINE_FAILURE: {e}")
            # Minimum Viable Fallback
            fallback = MasterBrandDNA()
            fallback.foundation.brand_name = brand_name
            fallback.foundation.brand_story = input_data.get('manifesto', 'Brand manual recovery initiated.')
            return fallback

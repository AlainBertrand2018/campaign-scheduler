import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from models.kyc import MasterBrandDNA, BrandFoundation
from utilities.web_scraper import deep_scan_url


# Load environment variables
load_dotenv()

class KYCChain:
    """
    The reasoning logic for the KYC Manager (Brand DNA Manager).
    Processes raw brand signals into a structured MasterBrandDNA object.
    Now supports multimodal vision context for deeper aesthetic analysis.
    """
    def __init__(self):
        # Using Gemini 2.0 Flash for massive structured extraction tasks
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.2
        )

    async def extract_brand_dna(self, input_data: dict) -> MasterBrandDNA:
        """
        Ingests dictionary of signals and outputs a validated MasterBrandDNA object.
        """
        # Load the KYC Playbook for context
        playbook_path = os.path.join(os.getcwd(), "KYC_MANAGER_PLAYBOOK.md")
        playbook_content = ""
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                playbook_content = f.read()

        # Build prompt messages dynamically
        system_msg = SystemMessage(content=f"""
You are Enola, the Agency Director and Master Orchestrator. 
You are performing a highly critical "Strategic Consultation Brief" on a brand. 
You MUST return highly structured, accurate, and perceptive JSON matching the MasterBrandDNA schema.

IDENTITY GUARDRAIL (CRITICAL):
1. THE BRAND NAME: Strictly use the 'Brand Name' provided by the user in the "PRIMARY BRAND SOURCE OF TRUTH". 
2. The brand name IS exactly what the user provided, regardless of what the website URL or scraped data reveals.
3. If the scraped data reveals a different entity (e.g. if the user provides "AVA The Bureau" but the URL is about "Bias Auditors"), you must treat that scraped entity as a PARTNER, a PARENT COMPANY, or a COMPETITOR, but NOT the subject of this report. The report is exclusively about the User's Brand Name.
4. DO NOT HALLUCINATE: If the scraped data feels disconnected from the user's manual inputs, ALWAYS prioritize the user's manual inputs (Manifesto, Target Customer, etc.).

CRITICAL ANALYTICAL INSTRUCTIONS:
1. STOP BEING SYCOPHANTIC. Do not endlessly praise the brand. Give an uncompromising, boardroom-ready, objective analysis. 
2. For EVERY single new hinting/analysis/guidance field, you MUST provide actionable, professional directives on how to weaponize the data for advertising campaigns.
3. Your tone must be strictly professional, tech-forward, and decisive.
4. For Section 9, clearly list the actual marketing frameworks (e.g., Aaker Personality Dimensions, AIDA, SWOT, Value Proposition Canvas) you are utilizing.

PLAYBOOK CONTEXT:
{playbook_content}
""")
        
        brand_name = input_data.get('name', 'Not provided')
        website = input_data.get('website', 'Not provided')
        industry = input_data.get('industry', 'Not provided')
        market = input_data.get('market', 'Not provided')
        language = input_data.get('language', 'Not provided')
        tagline = input_data.get('tagline', 'Not provided')
        target_customer = input_data.get('target_customer', 'Not provided')
        problem_solved = input_data.get('problem_solved', 'Not provided')
        manifesto = input_data.get('manifesto', 'Not provided')
        competitors = input_data.get('competitors', [])
        social_urls = input_data.get('social_urls', [])
        image_base64 = input_data.get('imageBase64', None)

        # 1. Scrape the website if available
        scraped_text = "No relevant text extracted from URL."
        scraped_colors = []
        scraped_fonts = []
        scraped_images = []
        scraping_result = {}
        
        if website and website.lower() != 'not provided':
            try:
                scraping_result = await deep_scan_url(website, max_images=10)
                if "error" not in scraping_result:
                    scraped_text = scraping_result.get("raw_text", scraped_text)
                    scraped_colors = scraping_result.get("colors", [])
                    scraped_fonts = scraping_result.get("fonts", [])
                    scraped_images = scraping_result.get("images", [])
            except Exception as e:
                print(f"Scraping failed: {e}")

        # Ensure image urls extracted are properly populated
        explicit_images_urls = [img["url"] for img in scraped_images]

        text_content = f"""
PRIMARY BRAND SOURCE OF TRUTH (ABSOLUTE PRIORITY):
Brand Name: {brand_name}
Industry Sector: {industry}
Target Market: {market}
Language: {language}
Tagline/Slogan: {tagline}
Target Customer: {target_customer}
Problem Solved: {problem_solved}
Manifesto/Core Narrative: {manifesto}

SECONDARY SIGNALS (FOR CONTEXT ONLY):
Website URL: {website}
Social URLs: {', '.join(social_urls) if social_urls else 'None'}
Competitors: {', '.join(competitors) if competitors else 'None'}

        BROWSER AGENT RESULTS (WEBSITE COPY & AESTHETIC SIGNALS):
        Title: {scraping_result.get("title", 'Not extracted')}
        Meta Tags (Underlying Semantic Signals):
        {scraping_result.get("meta_tags", 'Not extracted')}
        
        Robot Info (sitemaps if found):
        {scraping_result.get("robots_txt", 'Not checked/blocked')}
        
        Extracted HTML Copy (Header to Footer): 
        {scraped_text}

Visual CSS Clues:
Found Colors: {scraped_colors}
Found Fonts: {scraped_fonts}

TASK: 
Deep-analyze the brand "{brand_name}" based ON THE PRIMARY BRAND SOURCE OF TRUTH. 
If the SECONDARY SIGNALS or BROWSER AGENT RESULTS (like the website URL) contain different branding (e.g. they point to a parent company, a platform, or a partner), you MUST STILL focus the entire report exclusively on "{brand_name}". Treat any conflicting scraped data as 'Market Context' or 'Platform Features', but the SUBJECT of your report must strictly be "{brand_name}".
When filling out VisualSystem, make sure to explicitly include `extracted_app_images: {explicit_images_urls}`, `extracted_app_fonts`: {scraped_fonts}, and `extracted_app_colors`: {scraped_colors}.
Produce the exhaustive 9-section MasterBrandDNA output.
"""
        
        content_parts = [{"type": "text", "text": text_content}]
        
        # If a logo or media was provided, inject it into the multimodal payload
        if image_base64:
            if image_base64.startswith("data:") and ";base64," in image_base64:
                prefix, b64_data = image_base64.split(";base64,")
                mime_type = prefix.replace("data:", "")
                
                if mime_type.startswith("image/"):
                    content_parts.append({
                        "type": "image_url",
                        "image_url": {"url": image_base64}
                    })
                else:
                    # Assume Audio or Video
                    # Try passing as media dict (supported by some LangChain versions for Google)
                    content_parts.append({
                        "type": "media",
                        "mime_type": mime_type,
                        "data": b64_data
                    })
            else:
                # Fallback to pure image_url
                content_parts.append({
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{image_base64}"}
                })

        # Inject up to 3 website images that the Browser Agent retrieved
        for sc_img in scraped_images[:3]:
            if sc_img.get("base64"):
                content_parts.append({
                    "type": "image_url",
                    "image_url": {"url": sc_img["base64"]}
                })

        human_msg = HumanMessage(content=content_parts)

        # Apply structural enforcement with error handling
        try:
            llm_with_structure = self.model.with_structured_output(MasterBrandDNA)
            dna_result = await llm_with_structure.ainvoke([system_msg, human_msg])
            
            if dna_result:
                return dna_result
            
            print("WARNING: LLM returned None for structured output. Returning default model.")
            return MasterBrandDNA(foundation=BrandFoundation(brand_name=brand_name))
            
        except Exception as e:
            print(f"ERROR: Structured extraction failed: {e}")
            # Return a model with at least the brand name so the PDF isn't entirely blank
            return MasterBrandDNA(foundation=BrandFoundation(brand_name=brand_name))

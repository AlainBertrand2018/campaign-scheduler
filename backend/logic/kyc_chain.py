import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from models.kyc import MasterBrandDNA

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
1. THE BRAND NAME: Strictly prioritize the 'Description' provided by the user to identify the brand name. 
2. If the user mentions a name in the description (e.g., "AVA The Bureau"), that IS the brand name, regardless of what the URL scraping reveals.
3. If the URL scraping reveals a different entity (e.g., "Bias Auditors"), you must treat that entity as a PARTNER, a SUB-MODULE, or a COMPETITOR, but NOT the subject of this report.
4. DO NOT HALLUCINATE: If the scraped data feels disconnected from the user's description, prioritize the user's description.

CRITICAL ANALYTICAL INSTRUCTIONS:
1. STOP BEING SYCOPHANTIC. Do not endlessly praise the brand. Give an uncompromising, boardroom-ready, objective analysis. 
2. For EVERY single new hinting/analysis/guidance field, you MUST provide actionable, professional directives on how to weaponize the data for advertising campaigns.
3. Your tone must be strictly professional, tech-forward, and decisive.
4. For Section 9, clearly list the actual marketing frameworks (e.g., Aaker Personality Dimensions, AIDA, SWOT, Value Proposition Canvas) you are utilizing.

PLAYBOOK CONTEXT:
{playbook_content}
""")
        
        url = input_data.get('url', 'Not provided')
        description = input_data.get('description', 'Not provided')
        manifesto = input_data.get('manifesto', 'Not provided')
        image_base64 = input_data.get('imageBase64', None)

        text_content = f"""
PRIMARY BRAND SOURCE OF TRUTH:
User-Provided Description: {description}
User-Provided Manifesto: {manifesto}

SECONDARY SIGNAL SOURCE:
URL to analyze: {url}

TASK: 
Deep-analyze the brand mentioned in the "PRIMARY BRAND SOURCE OF TRUTH". 
If the URL metadata contains different branding, explain it as a 'Market Context' or 'Platform Feature' within the report, but the SUBJECT of the report must be the brand from the description.
Produce the exhaustive 8-section MasterBrandDNA output.
"""
        
        content_parts = [{"type": "text", "text": text_content}]
        
        # If an image was provided, inject it into the vision payload
        if image_base64:
            # Ensure it's correctly formatted for langchain
            if not image_base64.startswith("data:"):
                # Guessing jpeg as default if prefix missing
                image_base64 = f"data:image/jpeg;base64,{image_base64}"
            content_parts.append({
                "type": "image_url",
                "image_url": {"url": image_base64}
            })

        human_msg = HumanMessage(content=content_parts)

        # Apply structural enforcement using generic invoke rather than chain if necessary,
        # but with_structured_output works well with ChatGoogleGenerativeAI messages
        llm_with_structure = self.model.with_structured_output(MasterBrandDNA)
        
        return await llm_with_structure.ainvoke([system_msg, human_msg])

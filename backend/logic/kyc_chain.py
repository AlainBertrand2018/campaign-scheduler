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

        # Build prompt messages dynamically based on whether image is present
        system_msg = SystemMessage(content=f"""
You are Enola, the Agency Director and Master Orchestrator. 
You are performing a highly critical "Strategic Consultation Brief" on a brand. 
You MUST return highly structured, accurate, and perceptive JSON matching the MasterBrandDNA schema.

CRITICAL INSTRUCTIONS:
1. STOP BEING SYCOPHANTIC. Do not endlessly praise the brand. Give an uncompromising, boardroom-ready, objective analysis. If a color choice is weak or generic, say it. If a USP is weak, say it.
2. For EVERY single new hinting/analysis/guidance field (e.g., campaign_integration_hints, color_critical_analysis, market_crunch_hints), you MUST provide actionable, professional directives on how to weaponize the data for advertising campaigns.
3. Your tone must be strictly professional, tech-forward, and decisive (No italics, no fluff, no generic compliments).
4. For Section 5, you MUST generate at least 3 to 5 realistic Ideal Customer Profiles (ICPs) and explain exactly how to communicate to them.
5. In Section 9, clearly list the actual marketing frameworks (e.g., Aaker Personality Dimensions, AIDA, SWOT, Value Proposition Canvas) you are utilizing right now to structure this specific analysis, and explain why they matter.
""")
        
        url = input_data.get('url', 'Not provided')
        description = input_data.get('description', 'Not provided')
        manifesto = input_data.get('manifesto', 'Not provided')
        image_base64 = input_data.get('imageBase64', None)

        text_content = f"""
Analyze the following brand inputs deeply.
URL: {url}
Description: {description}
Manifesto/Core Narrative: {manifesto}

Produce the exhaustive 8-section MasterBrandDNA output.
If an image is uploaded, use it to accurately derive colors, typography patterns, and visual personality.
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

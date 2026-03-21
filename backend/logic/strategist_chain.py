import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.strategy import CampaignBlueprint

# Load environment variables
load_dotenv()

class StrategistChain:
    """
    The reasoning logic for the Campaign Strategist (Agent 3).
    Synthesizes Brand DNA and Product DNA into a definitive Campaign Blueprint.
    """
    def __init__(self):
        # Using Gemini 2.5 Pro for elite strategic planning
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.5-pro",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.4
        )

    async def build_campaign_blueprint(self, brand_dna: dict, product_dna: dict, user_brief: str = "") -> CampaignBlueprint:
        """
        Ingests both DNAs and outputs a Master Execution Plan (Blueprint).
        """
        # Load the Strategist Playbook (UTF-8)
        playbook_path = os.path.join(os.getcwd(), "STRATEGIST_PLAYBOOK.md")
        playbook_content = ""
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                playbook_content = f.read()

        prompt = ChatPromptTemplate.from_messages([
            ("system", f"You are the ENOLA.AI Campaign Strategist. Playbook: \n\n{playbook_content}"),
            ("user", "Synthesize the provided Brand DNA and Product DNA into a 3-channel social media campaign strategy. "
                     "You must return a definitive CampaignBlueprint including a task DAG for the following downstream agents: "
                     "Copywriter, Art Director, and Surveyor. "
                     "\n\nBrand DNA: {brand_dna}\nProduct DNA: {product_dna}\nUser Brief: {user_brief}")
        ])

        # Chain with structured output
        chain = prompt | self.model.with_structured_output(CampaignBlueprint)
        
        return await chain.ainvoke({
            "brand_dna": json.dumps(brand_dna),
            "product_dna": json.dumps(product_dna),
            "user_brief": user_brief
        })

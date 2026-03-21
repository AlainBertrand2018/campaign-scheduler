import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.persona import SurveyorOutput

# Load environment variables
load_dotenv()

class SurveyorChain:
    """
    The reasoning logic for the Audience Surveyor (Agent 4).
    Processes brand and strategy data into rich consumer personae.
    """
    def __init__(self):
        # Using Gemini 2.0 Flash for agile persona modeling
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.3
        )

    async def forge_persona(self, brand_dna: dict, strategy_brief: str = "") -> SurveyorOutput:
        """
        Ingests brand signals and strategy to output a rich Audience Persona map.
        """
        # Load the Surveyor Playbook (UTF-8)
        playbook_path = os.path.join(os.getcwd(), "SURVEYOR_PLAYBOOK.md")
        playbook_content = ""
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                playbook_content = f.read()

        prompt = ChatPromptTemplate.from_messages([
            ("system", f"You are the ENOLA.AI Audience Surveyor. Playbook: \n\n{playbook_content}"),
            ("user", "Based on the provided Brand DNA and Campaign Strategy, forge the 2 most likely consumer personae. "
                     "Each persona must have a deep empathy map and psychological triggers.\n\n"
                     "Brand DNA: {brand_dna}\nStrategy Brief: {strategy_brief}")
        ])

        # Chain with structured output
        chain = prompt | self.model.with_structured_output(SurveyorOutput)
        
        return await chain.ainvoke({
            "brand_dna": json.dumps(brand_dna),
            "strategy_brief": strategy_brief
        })

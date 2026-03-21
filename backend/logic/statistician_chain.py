import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.metrics import PerformanceAudit

# Load environment variables
load_dotenv()

class StatisticianChain:
    """
    The reasoning logic for the Statistician (Agent 10).
    Ingests live platform performance data and produces an intelligent refinement audit.
    """
    def __init__(self):
        # Using Gemini 2.0 Flash for agile analytics processing
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.2
        )

    async def analyze_performance(self, campaign_id: str, live_data: dict, original_strategy: dict) -> PerformanceAudit:
        """
        Ingests performance context and outputs a definitive refinement audit and signals.
        """
        # Load the Statistician Playbook (UTF-8)
        playbook_path = os.path.join(os.getcwd(), "STATISTICIAN_PLAYBOOK.md")
        playbook_content = ""
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                playbook_content = f.read()

        prompt = ChatPromptTemplate.from_messages([
            ("system", f"You are the ENOLA.AI Statistician. Playbook: \n\n{playbook_content}"),
            ("user", "Analyze the live performance data for this campaign. Produce actionable "
                     "refinement signals for the next run.\n\n"
                     "Campaign ID: {cid}\nLive Data: {data}\nOriginal Strategy: {strategy}")
        ])

        # Chain with structured output
        chain = prompt | self.model.with_structured_output(PerformanceAudit)
        
        return await chain.ainvoke({
            "cid": campaign_id,
            "data": json.dumps(live_data),
            "strategy": json.dumps(original_strategy)
        })

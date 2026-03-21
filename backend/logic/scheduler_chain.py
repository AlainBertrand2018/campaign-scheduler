import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.schedule import CampaignSchedule

# Load environment variables
load_dotenv()

class SchedulerChain:
    """
    The reasoning logic for the Scheduler (Agent 8).
    Creates an optimal publishing calendar for campaign assets.
    """
    def __init__(self):
        # Using Gemini 2.0 Flash for agile logistics
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.2
        )

    async def create_campaign_schedule(self, strategy: dict, assets: list, start_date: str, end_date: str) -> CampaignSchedule:
        """
        Ingests strategy and assets to output a definitive publishing calendar.
        """
        # Load the Scheduler Playbook (UTF-8)
        playbook_path = os.path.join(os.getcwd(), "SCHEDULER_PLAYBOOK.md")
        playbook_content = ""
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                playbook_content = f.read()

        prompt = ChatPromptTemplate.from_messages([
            ("system", f"You are the ENOLA.AI Scheduler. Playbook: \n\n{playbook_content}"),
            ("user", "Build a high-impact publishing schedule for this campaign. Focus on peak engagement optimization "
                     "per platform. Flight: {start} to {end}\n\n"
                     "Strategy Blueprint: {strategy}\nApproved Assets: {assets}")
        ])

        # Chain with structured output
        chain = prompt | self.model.with_structured_output(CampaignSchedule)
        
        return await chain.ainvoke({
            "strategy": json.dumps(strategy),
            "assets": json.dumps(assets),
            "start": start_date,
            "end": end_date
        })

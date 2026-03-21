import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.publisher import PublishingExecution

# Load environment variables
load_dotenv()

class PublisherChain:
    """
    The reasoning logic for the Publisher (Agent 9).
    Executes and confirms the final publishing of campaign assets.
    """
    def __init__(self):
        # Using Gemini 2.0 Flash for agile execution logic
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.1
        )

    async def execute_publishing(self, assets: list, schedule: dict, auth_tokens: dict) -> PublishingExecution:
        """
        Ingests context and outputs a definitive publishing execution log.
        """
        # Load the Publisher Playbook (UTF-8)
        playbook_path = os.path.join(os.getcwd(), "PUBLISHER_PLAYBOOK.md")
        playbook_content = ""
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                playbook_content = f.read()

        prompt = ChatPromptTemplate.from_messages([
            ("system", f"You are the ENOLA.AI Publisher. Playbook: \n\n{playbook_content}"),
            ("user", "Execute the technical publishing flow for this campaign. Focus on platform-specific "
                     "compliance and error recovery.\n\n"
                     "Schedule: {schedule}\nApproved Assets: {assets}\nAuth Context: {auth}")
        ])

        # Chain with structured output
        chain = prompt | self.model.with_structured_output(PublishingExecution)
        
        return await chain.ainvoke({
            "schedule": json.dumps(schedule),
            "assets": json.dumps(assets),
            "auth": json.dumps(auth_tokens)
        })

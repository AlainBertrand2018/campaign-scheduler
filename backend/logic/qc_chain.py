import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.qc import QCReport

# Load environment variables
load_dotenv()

class QCChain:
    """
    The reasoning logic for the Quality Controller (Agent 7).
    Performs a brand and compliance audit on any generated asset.
    """
    def __init__(self):
        # Using Gemini 2.0 Flash for agile auditing
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.3
        )

    async def audit_asset(self, brand_dna: dict, product_dna: dict, asset: dict, original_brief: dict = None) -> QCReport:
        """
        Runs a structured audit on a single asset or copy set.
        """
        # Load the QC Playbook (UTF-8)
        playbook_path = os.path.join(os.getcwd(), "QC_MANAGER_PLAYBOOK.md")
        playbook_content = ""
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                playbook_content = f.read()

        prompt = ChatPromptTemplate.from_messages([
            ("system", f"You are the ENOLA.AI Quality Controller. Playbook: \n\n{playbook_content}"),
            ("user", "Perform a rigorous audit of the following generated asset. Cross-reference it with the Brand DNA "
                     "and Product DNA for accuracy and quality.\n\n"
                     "Brand DNA: {brand_dna}\nProduct DNA: {product_dna}\nGenerated Asset: {asset}\nOriginal Brief: {brief}")
        ])

        # Chain with structured output
        chain = prompt | self.model.with_structured_output(QCReport)
        
        return await chain.ainvoke({
            "brand_dna": json.dumps(brand_dna),
            "product_dna": json.dumps(product_dna),
            "asset": json.dumps(asset),
            "brief": json.dumps(original_brief) if original_brief else "No specific brief metadata provided."
        })

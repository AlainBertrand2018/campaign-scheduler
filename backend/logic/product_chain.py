import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.product import ProductDNA

# Load environment variables
load_dotenv()

class ProductChain:
    """
    The reasoning logic for the Product Manager (Product DNA Manager).
    Transforms raw product specs into a benefit-first story.
    """
    def __init__(self):
        # Using Gemini 2.0 Flash for standard extraction tasks
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.2
        )

    async def map_product_dna(self, raw_input: str) -> ProductDNA:
        """
        Ingests specifications and outputs a validated ProductDNA object.
        """
        # Load the Product Playbook (ensuring UTF-8 on Windows)
        playbook_path = os.path.join(os.getcwd(), "PRODUCT_MANAGER_PLAYBOOK.md")
        playbook_content = ""
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                playbook_content = f.read()

        prompt = ChatPromptTemplate.from_messages([
            ("system", f"You are the ENOLA.AI Product Manager. Playbook: \n\n{playbook_content}"),
            ("user", "Analyze this product content and map it to a benefit-first DNA structure. Focus on gains, pains, and emotional hooks.\n\nInput: {raw_input}")
        ])

        # Chain with structured output
        chain = prompt | self.model.with_structured_output(ProductDNA)
        
        return await chain.ainvoke({
            "raw_input": raw_input
        })

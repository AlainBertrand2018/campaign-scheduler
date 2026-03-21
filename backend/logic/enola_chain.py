import os
import json
from typing import List, Dict, Any, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.enola import StrategicDirective, QAReport

from dotenv import load_dotenv

load_dotenv()

# Initialize Gemini (Agency Director Elite Tier)
model = ChatGoogleGenerativeAI(
    model="gemini-2.5-pro", 
    temperature=0.7,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

async def generate_strategic_directive(brand_dna: Dict[str, Any], product_dna: Dict[str, Any]) -> StrategicDirective:
    """The Gate 1 Task: Synthesize DNA into a high-level Strategic Directive."""
    
    # Load the Enola Playbook for context
    playbook_path = os.path.join(os.getcwd(), "ENOLA_PLAYBOOK.md")
    playbook_content = ""
    if os.path.exists(playbook_path):
        with open(playbook_path, "r", encoding="utf-8") as f:
            playbook_content = f.read()

    prompt = ChatPromptTemplate.from_messages([
        ("system", f"You are Enola, a world-class Advertising Agency Director. Your persona is defined in this Playbook: \n\n{playbook_content}"),
        ("user", "Based on the provided Brand DNA and Product DNA, generate a Strategic Directive to guide the creative team. Your directive should focus on achieving the primary campaign goal while protecting brand soul.\n\nBrand DNA: {brand_dna}\nProduct DNA: {product_dna}")
    ])

    chain = prompt | model.with_structured_output(StrategicDirective)
    return await chain.ainvoke({
        "brand_dna": json.dumps(brand_dna),
        "product_dna": json.dumps(product_dna)
    })

async def audit_creative(directive: StrategicDirective, creative_output: Dict[str, Any]) -> QAReport:
    """The Gate 2 Task: Conduct a final audit of the creative output."""
    
    # Load the Enola Playbook for consistency
    playbook_path = os.path.join(os.getcwd(), "ENOLA_PLAYBOOK.md")
    playbook_content = ""
    if os.path.exists(playbook_path):
        with open(playbook_path, "r", encoding="utf-8") as f:
            playbook_content = f.read()

    prompt = ChatPromptTemplate.from_messages([
        ("system", f"You are Enola, conducting a final audit. Persona Playbook: \n\n{playbook_content}"),
        ("user", "Does this creative output meet your original Strategic Directive? Audit and provide an Agency-Grade QA Report.\n\nDirective: {directive}\nCreative Assets: {creative}")
    ])

    chain = prompt | model.with_structured_output(QAReport)
    return await chain.ainvoke({
        "directive": json.dumps(directive.dict()),
        "creative": json.dumps(creative_output)
    })

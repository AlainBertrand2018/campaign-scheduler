import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.copy import CampaignCopySet

# Load environment variables
load_dotenv()

from typing import Optional, List
from models.copy import CopyDeck, CopyVariant

class CopywriterChain:
    """
    Agent 05: The Persuasion Engine.
    Delivers high-converting commercial copy decks for social platforms.
    """
    def __init__(self):
        # Using Gemini 2.0 Flash for speed/cost (Optimized margin)
        # Higher temperature (0.8) for creative hooks and tone variety
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.8
        )

    def _get_playbook(self) -> str:
        """Loads Agent 05's core standards and persuasion logic."""
        playbook_path = os.path.join(os.getcwd(), "COPYWRITER_PLAYBOOK.md")
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                with open(playbook_path, "r", encoding="utf-8") as f:
                    return f.read()
        return "You are a world-class advertising copywriter known for high-conversion psychology."

    async def write_standalone_copy_deck(self, user_brief: str, platforms: List[str] = ["LinkedIn", "Instagram"]) -> CopyDeck:
        """
        Standalone One-Shot ($1.99): Generates 5 distinct variants from a raw brief.
        """
        prompt = ChatPromptTemplate.from_messages([
            ("system", f"{self._get_playbook()}\n\n"
                       "Your mission is to deliver a 'Commercial Copy Deck' containing 5 distinct psychological variants for the user's objective. "
                       "You MUST use different frameworks for each: AIDA, PAS (Pain-Agitate-Solution), BAB (Before-After-Bridge), Storytelling, and feature-benefit-first. "
                       "Each variant must have a clear 'Strategic Rationale' explaining the underlying conversion psychology."),
            ("user", f"Objective/Brief: {user_brief}\nTarget Platforms: {', '.join(platforms)}")
        ])

        chain = prompt | self.model.with_structured_output(CopyDeck)
        
        # Invoke and add metadata
        result = await chain.ainvoke({})
        result.metadata = {
            "model": "gemini-2.0-flash",
            "cost_per_run": 0.005,
            "service_type": "standalone",
            "revenue": 1.99
        }
        return result

    async def write_campaign_copy(self, brand_dna: dict, product_dna: dict, persona: dict, strategy_brief: str = "", platforms: List[str] = ["LinkedIn"]) -> CopyDeck:
        """
        Campaign Mode: Ingests full DNA context for deep brand alignment.
        """
        prompt = ChatPromptTemplate.from_messages([
            ("system", f"{self._get_playbook()}\n\n"
                       "You are writing within a structured Agency Swarm. Align perfectly with the provided Brand DNA, "
                       "Product Features, and Audience Persona. Maintain absolute tone consistency."),
            ("user", "Write a Commercial Copy Deck aligned with this DNA:\n\n"
                     "Brand DNA: {brand_dna}\nProduct DNA: {product_dna}\nPersona: {persona}\n"
                     "Strategy: {strategy}\nPlatforms: {platforms}")
        ])

        chain = prompt | self.model.with_structured_output(CopyDeck)
        
        return await chain.ainvoke({
            "brand_dna": json.dumps(brand_dna),
            "product_dna": json.dumps(product_dna),
            "persona": json.dumps(persona),
            "strategy": strategy_brief,
            "platforms": ", ".join(platforms)
        })

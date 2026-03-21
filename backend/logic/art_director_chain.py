import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.visual import VisualBrief

# Load environment variables
load_dotenv()

from typing import List, Optional
from models.visual import VisualBrief, GenerationPrompt

class ArtDirectorChain:
    """
    Agent 06: Creative Prompt Architect.
    Engineers technically precise 4K visual briefs for high-end generation.
    """
    def __init__(self):
        # Using Gemini 2.0 Flash for granular visual reasoning
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.4
        )

    def _get_playbook(self) -> str:
        """Loads Agent 06's artistic standards and prompt engineering logic."""
        playbook_path = os.path.join(os.getcwd(), "ART_DIRECTOR_PLAYBOOK.md")
        if os.path.exists(playbook_path):
            with open(playbook_path, "r", encoding="utf-8") as f:
                return f.read()
        return "You are a world-class Art Director specializing in diffusion prompt engineering."

    async def write_standalone_visual_brief(self, user_idea: str, style_preference: str = "Premium SaaS") -> VisualBrief:
        """
        Standalone One-Shot ($1.99): Transforms a raw idea into a 4K Brief.
        """
        prompt = ChatPromptTemplate.from_messages([
            ("system", f"{self._get_playbook()}\n\n"
                       "Your mission is to deliver a 'Master Visual Brief' for the user's raw idea. "
                       "You must architect exactly 3 high-end generation prompts (Hero, Feature, Lifestyle). "
                       "Each prompt MUST be technical: focal length, lighting (e.g. volumetric neon, soft-box), "
                       "and mood. Include 'Safe Zones' for text overlays."),
            ("user", f"Raw Idea: {user_idea}\nAesthetic Preference: {style_preference}")
        ])

        chain = prompt | self.model.with_structured_output(VisualBrief)
        
        # Invoke without extra args as the prompt is pre-formatted
        return await chain.ainvoke({})

    async def generate_visual_brief(self, brand_dna: dict, strategy: dict, copy_brief: dict = None) -> VisualBrief:
        """
        Campaign Mode: Ingests full DNA context for brand-perfect visuals.
        """
        prompt = ChatPromptTemplate.from_messages([
            ("system", f"{self._get_playbook()}\n\n"
                       "Align your visual direction with the Brand DNA and Campaign Strategy. "
                       "Every prompt must reflect the core archetype and mission of the brand."),
            ("user", "Architect a Campaign Visual Brief with these inputs:\n\n"
                     "Brand DNA: {brand_dna}\nStrategy Blueprint: {strategy}\nCopy Context: {copy}")
        ])

        chain = prompt | self.model.with_structured_output(VisualBrief)
        
        return await chain.ainvoke({
            "brand_dna": json.dumps(brand_dna),
            "strategy": json.dumps(strategy),
            "copy": json.dumps(copy_brief) if copy_brief else "No specific copy yet."
        })

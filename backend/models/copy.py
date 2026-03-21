from pydantic import BaseModel, Field
from typing import List, Optional

class CopyVariant(BaseModel):
    variant_id: str = Field(..., description="Unique ID for the variant (v1, v2, etc)")
    framework: str = Field(..., description="The psychological framework used (e.g., AIDA, PAS, Storytelling)")
    headline: str = Field(..., description="Punchy, high-converting headline")
    body: str = Field(..., description="Engaging ad body copy")
    cta: str = Field(..., description="Strong call to action")
    rationale: str = Field(..., description="Strategic explanation for why this variant works")
    platform: str = Field(default="Universal", description="The intended social platform")

class CopyDeck(BaseModel):
    deck_id: str = Field(..., description="Unique ID for the copy deck")
    objective: str = Field(..., description="The core business objective for this copy")
    variants: List[CopyVariant] = Field(..., description="List of 5 distinct copy variants")
    tone_profile: str = Field(..., description="Summary of the brand voice used in the deck")
    metadata: Optional[dict] = Field(default_factory=dict, description="Generation metadata (tokens, costs, model)")

class CampaignCopySet(BaseModel):
    """
    Original model for campaign-wide copy (multiple platforms/personas)
    """
    campaign_id: str
    platforms: List[str]
    decks: List[CopyDeck]

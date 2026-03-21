from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class Demographics(BaseModel):
    age_range: str
    occupation: str
    income_level: Optional[str] = None
    location: Optional[str] = None

class Psychographics(BaseModel):
    values: List[str] = Field(..., description="Core values driving their decisions")
    motivations: List[str] = Field(..., description="What they want to achieve")
    fears: List[str] = Field(..., description="What keeps them up at night")
    aspirations: List[str] = Field(..., description="Where they want to be in 5 years")

class EmpathyMap(BaseModel):
    think_and_feel: str = Field(..., description="What occupies their mind?")
    hear: str = Field(..., description="What are friends and influencers saying?")
    see: str = Field(..., description="What does their environment look like?")
    say_and_do: str = Field(..., description="How do they behave in public?")
    pains: List[str] = Field(..., description="Frustrations and obstacles")
    gains: List[str] = Field(..., description="Hopes and dreams")

class Persona(BaseModel):
    """
    A hyper-specific Ideal Customer Profile (ICP).
    """
    persona_name: str = Field(..., description="e.g., 'The Tech-Forward Founder'")
    demographics: Demographics
    psychographics: Psychographics
    media_habits: List[str] = Field(..., description="Preferred platforms and content types")
    purchase_triggers: List[str] = Field(..., description="What events or words trigger a purchase?")
    empathy_map: EmpathyMap

class SurveyorOutput(BaseModel):
    personas: List[Persona]
    market_segmentation_summary: str

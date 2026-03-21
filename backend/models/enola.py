from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class StrategicDirective(BaseModel):
    """The master directive issued by Enola to guide the campaign swarm."""
    brand_tone: str = Field(..., description="The definitive voice and character of the brand.")
    visual_guidelines: str = Field(..., description="Key visual constraints and aesthetic direction.")
    primary_objective: str = Field(..., description="The main business goal for this specific campaign wave.")
    campaign_angle: str = Field(..., description="The unique creative hook or psychological angle chosen.")
    constraints: List[str] = Field(default_factory=list, description="Strict non-negotiable rules for all agents.")

class QAReport(BaseModel):
    """The final audit report issued by Enola before submission."""
    passed: bool = Field(..., description="Whether the content meets the agency-grade standard.")
    score: float = Field(..., description="A quality score from 0-100.")
    feedback: str = Field(..., description="Direct feedback and rationale from the Director.")
    refactoring_notes: List[str] = Field(default_factory=list, description="Specific revision steps required if failed.")

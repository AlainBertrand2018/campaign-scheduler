from pydantic import BaseModel, Field
from typing import List, Optional

class ProductFeature(BaseModel):
    name: str = Field(..., description="The technical name of the feature")
    description: str = Field(..., description="Technical detail of what it is")

class ProductBenefit(BaseModel):
    benefit: str = Field(..., description="What the user gets (Gain)")
    pain_point: str = Field(..., description="What problem it solves (Pain)")

class ProductDNA(BaseModel):
    """
    Structured Product DNA mapping features to emotional and rational benefits.
    """
    name: str = Field(..., description="The name of the product or service")
    features: List[ProductFeature] = Field(default_factory=list)
    benefits: List[ProductBenefit] = Field(default_factory=list)
    differentiators: List[str] = Field(default_factory=list, description="Unique advantages over competitors")
    value_proposition: str = Field(..., description="The core 'Why' statement")
    emotional_hooks: List[str] = Field(default_factory=list, description="Narrative hooks to trigger audience emotion")
    proof_points: List[str] = Field(default_factory=list, description="Evidence (stats, testimonials, tech specs)")

class ProductDNAInput(BaseModel):
    raw_input: str = Field(..., description="Raw text, specs, or website content describing the product")

from pydantic import BaseModel, Field
from typing import List, Optional

class VisualVariant(BaseModel):
    variant_id: str
    image_url: str
    headline: str
    description: str
    style_label: str

class BananaOutput(BaseModel):
    variants: List[VisualVariant]
    generation_metadata: dict
    
class BananaInput(BaseModel):
    prompt: str
    source_agent: Optional[str] = "Art Director"
    brand_context: Optional[str] = None
    style_preference: Optional[str] = "Premium SaaS"

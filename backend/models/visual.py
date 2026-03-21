from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class GenerationPrompt(BaseModel):
    id: str = Field(..., description="Unique ID for this asset (e.g., 'hero_image_1')")
    platform: str = Field(..., description="Target platform (Instagram, LinkedIn, etc.)")
    prompt: str = Field(..., description="Highly detailed diffusion model prompt")
    negative_prompt: Optional[str] = Field(None, description="What to exclude from the image")
    aspect_ratio: str = Field(..., description="e.g., 16:9, 9:16, 1:1")
    lighting_directive: str = Field(..., description="Cinematic, soft, neon, etc.")
    composition_rules: str = Field(..., description="Rule of thirds, centered, etc.")

class VisualBrief(BaseModel):
    """
    A comprehensive visual direction package for AI generation engines.
    """
    campaign_name: str
    primary_style: str = Field(..., description="The overarching aesthetic (e.g., 'Hyper-realistic Glassmorphism')")
    color_palette: List[str] = Field(..., description="Primary HEX or descriptive colors")
    image_prompts: List[GenerationPrompt]
    video_scripts: List[Dict[str, str]] = Field(default_factory=list, description="Motion directives for video generation")
    safe_zones: str = Field(..., description="Instructions for UI overlays and text safe zones")

class VisualInput(BaseModel):
    brand_dna: Dict
    strategy_brief: str
    copy_brief: Optional[Dict] = None

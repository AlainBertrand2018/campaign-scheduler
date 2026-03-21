from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class CampaignTask(BaseModel):
    id: str = Field(..., description="Unique ID for this task (e.g., 'primary_copy_gen')")
    agent_id: str = Field(..., description="The ID of the agent responsible (e.g., 'Copywriter')")
    depends_on: List[str] = Field(default_factory=list, description="IDs of tasks that must complete first")
    context_keys: List[str] = Field(default_factory=list, description="Keys in the campaign state this task needs")
    output_key: str = Field(..., description="Where the output will be stored in the final campaign state")

class ChannelStrategy(BaseModel):
    platform: str = Field(..., description="e.g., Meta, LinkedIn, TikTok")
    objective: str = Field(..., description="Awareness, Traffic, Lead Gen, etc.")
    budget_weight: float = Field(default=1.0, description="Relative budget allocation (0.0 to 1.0)")
    key_metrics: List[str] = Field(default_factory=list, description="Primary KPIs for this channel")

class CampaignBlueprint(BaseModel):
    """
    The Master Execution Plan for a campaign run.
    """
    campaign_name: str
    target_objectives: List[str]
    creative_direction: str = Field(..., description="The overarching artistic and tonal theme")
    channels: List[ChannelStrategy]
    execution_dag: List[CampaignTask] = Field(default_factory=list, description="The ordered list of agent tasks")
    kpi_targets: List[str] = Field(default_factory=list, description="List of specific measurable goals")
    risk_assessment: Optional[str] = None

class StrategyInput(BaseModel):
    brand_dna: Dict[str, Any]
    product_dna: Dict[str, Any]
    user_brief: Optional[str] = None

from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class CostItem(BaseModel):
    category: str = Field(..., description="e.g., 'Google AI Tokens', 'Platform API Fee', 'Compute'")
    amount_usd: float
    description: str

class FinanceReport(BaseModel):
    """
    The commercial audit for a specific campaign or user.
    """
    campaign_id: str
    user_id: str
    total_cost_usd: float
    breakdown: List[CostItem]
    is_within_budget: bool
    budget_remaining_usd: float
    estimated_margin_percent: float = Field(..., description="Margin after all technical and platform costs")

class FinanceInput(BaseModel):
    campaign_id: str
    usage_data: Dict = Field(..., description="Aggregated token/API usage per agent")
    user_budget: float

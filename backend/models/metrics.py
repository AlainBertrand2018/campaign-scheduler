from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class NativeMetric(BaseModel):
    name: str = Field(..., description="e.g., 'CTR', 'Engagement Rate', 'CPC'")
    value: float
    unit: str = Field(default="count")

class PerformanceAudit(BaseModel):
    """
    The performance intelligence report for a campaign run.
    """
    campaign_id: str
    platform_summaries: Dict[str, List[NativeMetric]]
    sentiment_score: float = Field(..., description="-1 to 1 (Very Negative to Very Positive)")
    engagement_patterns: List[str] = Field(..., description="Key insights found in the data")
    refinement_signals: Dict[str, str] = Field(..., description="Specific updates for KYC or Strategy agents")
    calculated_roi: Optional[float] = None

class MetricsInput(BaseModel):
    campaign_id: str
    live_data: Dict = Field(..., description="Raw data from platform analytics APIs")
    original_strategy: Dict

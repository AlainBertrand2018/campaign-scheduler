from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class PostConfirmation(BaseModel):
    asset_id: str
    platform: str
    status: str = Field(..., description="LIVE, SCHEDULED, FAILED")
    post_url: Optional[str] = Field(None, description="The live URL of the post if available")
    platform_post_id: Optional[str] = Field(None, description="The platform's internal ID")
    error_message: Optional[str] = None
    retry_attempt: int = 0

class PublishingExecution(BaseModel):
    """
    The final execution log for a campaign flight.
    """
    campaign_name: str
    results: List[PostConfirmation]
    total_published: int
    total_failed: int
    execution_complete_time: str

class PublisherInput(BaseModel):
    approved_assets: List[Dict]
    final_schedule: Dict
    platform_auth_tokens: Dict[str, str] = Field(..., description="Encrypted or temporary OAuth tokens")

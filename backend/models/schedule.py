from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class ScheduleSlot(BaseModel):
    asset_id: str
    platform: str = Field(..., description="LinkedIn, Instagram, etc.")
    scheduled_time: str = Field(..., description="ISO 8601 timestamp")
    timezone: str = Field(default="UTC")
    rationale: str = Field(..., description="Why this time? (e.g., 'Peak commute hour for LinkedIn')")
    priority: int = Field(default=1, ge=1, le=5)

class CampaignSchedule(BaseModel):
    """
    A unified calendar for the entire campaign across all platforms.
    """
    campaign_name: str
    slots: List[ScheduleSlot]
    flight_start: str
    flight_end: str
    overall_pacing_strategy: str = Field(..., description="e.g., 'Front-loaded', 'Evenly distributed'")
    total_assets: int

class ScheduleInput(BaseModel):
    strategy_blueprint: Dict
    approved_assets: List[Dict]
    start_date: str
    end_date: str

from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class ComplianceFlag(BaseModel):
    category: str = Field(..., description="e.g., 'Brand Voice', 'Platform Policy', 'Fact Check'")
    issue: str
    severity: str = Field(..., description="High, Medium, Low")
    suggestion: str

class QCReport(BaseModel):
    """
    Validation audit for a generated asset.
    """
    asset_id: str
    qc_score: float = Field(..., description="0 to 100 quality score")
    verdict: str = Field(..., description="PASS, CONDITIONAL_PASS, FAIL")
    compliance_flags: List[ComplianceFlag] = Field(default_factory=list)
    correction_instructions: Optional[str] = Field(None, description="Direct instructions back to the agent")
    brand_alignment_score: float
    platform_policy_pass: bool

class QCInput(BaseModel):
    brand_dna: Dict
    product_dna: Dict
    generated_asset: Dict
    original_brief: Optional[Dict] = None

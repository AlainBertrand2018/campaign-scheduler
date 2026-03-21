import os
import json
from typing import Dict, Any, List
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from models.finance import FinanceInput, FinanceReport
from dotenv import load_dotenv

load_dotenv()

class AccountantChain:
    """
    AGENT 11: The Financial Auditor (Enola.ai).
    Monitors token spend, API costs, and visual generation overhead (Nano Banana 2).
    """
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-001", temperature=0.5)
        # CURRENT PRICING TABLE (2026)
        self.costs = {
            "gemini_2_flash_in": 0.10 / 1000000, # per 1M tokens
            "gemini_2_flash_out": 0.40 / 1000000,
            "nanobanana_2_4k": 0.05, # per 4k variant
            "nanobannana_2_batch": 0.20 # per 4x variants
        }

    async def audit_one_shot(self, transaction_id: str, service_type: str, usage_data: dict) -> dict:
        """
        Standalone One-Shot ($1.99): Audits a specific microtool transaction.
        """
        # 1. Calculate hard cost
        tokens_in = usage_data.get("tokens_in", 0)
        tokens_out = usage_data.get("tokens_out", 0)
        nb2_runs = usage_data.get("nanobanana_2_runs", 0)
        
        token_cost = (tokens_in * self.costs["gemini_2_flash_in"]) + (tokens_out * self.costs["gemini_2_flash_out"])
        visual_cost = nb2_runs * self.costs["nanobannana_2_batch"]
        total_hard_cost = token_cost + visual_cost
        
        # 2. Logic for status
        net_margin = 1.99 - total_hard_cost
        margin_pct = (net_margin / 1.99) * 100
        
        return {
            "transaction_id": transaction_id,
            "service_type": service_type,
            "revenue": 1.99,
            "hard_cost": round(total_hard_cost, 4),
            "net_margin": round(net_margin, 2),
            "margin_percentage": f"{round(margin_pct, 1)}%",
            "status": "IDEAL" if margin_pct > 70 else "ALARM"
        }

    async def calculate_campaign_costs(self, campaign_id: str, usage_data: dict, budget: float) -> dict:
        """
        Campaign Mode ($6.99): Monitors the full strategic workflow costs.
        """
        
        # 1. Total tokens and gen count
        tokens_in = usage_data.get("tokens_in", 0)
        tokens_out = usage_data.get("tokens_out", 0)
        nb2_runs = usage_data.get("nanobanana_2_runs", 0)
        
        # 2. Hard calculation
        token_cost = (tokens_in * self.costs["gemini_2_flash_in"]) + (tokens_out * self.costs["gemini_2_flash_out"])
        visual_cost = nb2_runs * self.costs["nanobannana_2_batch"]
        total_hard_cost = token_cost + visual_cost
        
        # 3. Reasoning Report (Is the run profitable?)
        prompt = ChatPromptTemplate.from_template("""
        ROLE: Enola.ai Accountant Agent.
        ACT: Audit the current campaign spend.
        CAMPAIGN ID: {campaign_id}
        REVENUE: $6.99 (Entry Level Run)
        HARD COST: ${total_cost}
        REMAINING BUDGET: ${budget}
        
        TASK:
        - Calculate the current Net Margin percentage.
        - Provide a status: "IDEAL", "MARGIN_THREAT", or "LOSS".
        - Give a brief financial recommendation.
        """)
        
        chain = prompt | self.llm
        audit = await chain.ainvoke({
            "campaign_id": campaign_id,
            "total_cost": total_hard_cost,
            "budget": budget
        })
        
        return {
            "campaign_id": campaign_id,
            "hard_cost": round(total_hard_cost, 4),
            "token_spend": round(token_cost, 6),
            "visual_spend": round(visual_cost, 2),
            "audit_brief": audit.content,
            "margin_status": "IDEAL" if total_hard_cost / 6.99 < 0.3 else "CAUTION",
            "metadata": { "resolution": "4K_CERTIFIED", "tier": "Highest" }
        }

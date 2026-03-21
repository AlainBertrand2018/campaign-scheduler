import os
import sys
from typing import Dict, Any
from mcp.server.fastmcp import FastMCP
from dotenv import load_dotenv

# Ensure we can import from models and logic
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from logic.enola_chain import generate_strategic_directive, audit_creative
from models.enola import StrategicDirective, QAReport

# Load .env for API keys
load_dotenv()

# Initialize FastMCP server
mcp = FastMCP("Enola.ai Director")

@mcp.tool()
def strategic_synthesis(brand_dna: Dict[str, Any], product_dna: Dict[str, Any]) -> str:
    """Synthesize Brand and Product DNA into a Strategic Directive.
    
    Args:
        brand_dna: Structured identity of the brand.
        product_dna: Technical and marketing specs of the product.
    """
    directive = generate_strategic_directive(brand_dna, product_dna)
    return directive.json()

@mcp.tool()
def director_audit(directive_json: str, creative_assets: Dict[str, Any]) -> str:
    """Perform a high-level audit of the creative output against the directive.
    
    Args:
        directive_json: The Strategic Directive in JSON format.
        creative_assets: The generated copy, visuals, and strategy.
    """
    directive = StrategicDirective.parse_raw(directive_json)
    report = audit_creative(directive, creative_assets)
    return report.json()

if __name__ == "__main__":
    mcp.run()

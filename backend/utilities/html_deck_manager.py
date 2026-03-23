import os
import asyncio
from playwright.async_api import async_playwright
from jinja2 import Environment, FileSystemLoader
from datetime import datetime

# Configure Jinja2
TEMPLATE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "templates")
env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

async def render_html_to_pdf(html_content: str, output_path: str):
    """Uses Playwright to render high-quality landscape PDF from HTML."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Set content
        await page.set_content(html_content, wait_until="networkidle")
        
        # Render PDF in Landscape A4 (matching our CSS slides)
        await page.pdf(
            path=output_path,
            format="A4",
            landscape=True,
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
        )
        
        await browser.close()

async def generate_dna_deck_pdf(dna_dict: dict, filename: str = "report_deck.pdf"):
    """
    Main entry point for generating the HubSpot-style Slide Deck PDF.
    Renders the HTML template and then calls Playwright for PDF conversion.
    """
    try:
        template = env.get_template("report_deck.html")
        
        # Add metadata for template
        template_data = dna_dict.copy()
        template_data['timestamp'] = datetime.now().strftime("%Y-%m-%d")
        template_data['brand_name'] = dna_dict.get('foundation', {}).get('brand_name', 'BRAND').upper()
        
        # Render HTML
        html_out = template.render(**template_data)
        
        # Define output path - use 'exports' to match main.py serving logic
        output_dir = os.path.join(os.getcwd(), "exports")
        os.makedirs(output_dir, exist_ok=True)
        pdf_path = os.path.join(output_dir, filename)
        
        # Run the async renderer
        await render_html_to_pdf(html_out, pdf_path)
        
        return pdf_path
    
    except Exception as e:
        import traceback
        print(f"ERROR_IN_DECK_GENERATION: {e}")
        print(traceback.format_exc())
        return None

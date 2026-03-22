import os
import io
from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, 
    Spacer, Table, TableStyle, PageBreak, KeepTogether, 
    NextPageTemplate
)

# --- THEME CONFIGURATION ---
class ReportTheme:
    """Centralized styling for the premium editorial report."""
    PRIMARY = colors.HexColor("#0f172a")    # Slate 900
    SECONDARY = colors.HexColor("#64748b")  # Slate 500
    ACCENT = colors.HexColor("#4f46e5")     # Indigo 600
    LIGHT_BG = colors.HexColor("#f8fafc")   # Slate 50
    BORDER = colors.HexColor("#cbd5e1")     # Slate 300
    SUCCESS = colors.HexColor("#059669")    # Emerald 600
    DANGER = colors.HexColor("#dc2626")     # Red 600

    @staticmethod
    def get_styles():
        styles = getSampleStyleSheet()
        # Custom Paragraphs
        styles.add(ParagraphStyle(
            name='ReportTitle', fontName='Helvetica-Bold', fontSize=42, 
            textColor=ReportTheme.PRIMARY, alignment=TA_CENTER, 
            spaceAfter=15, leading=48
        ))
        styles.add(ParagraphStyle(
            name='ReportSubtitle', fontName='Helvetica', fontSize=18, 
            textColor=ReportTheme.SECONDARY, alignment=TA_CENTER, 
            spaceAfter=60, leading=22
        ))
        styles.add(ParagraphStyle(
            name='SectionHeader', fontName='Helvetica-Bold', fontSize=18, 
            textColor=ReportTheme.PRIMARY, spaceBefore=30, spaceAfter=15, 
            textTransform='uppercase', leading=22
        ))
        styles.add(ParagraphStyle(
            name='LabelIndicated', fontName='Helvetica-Bold', fontSize=9, 
            textColor=ReportTheme.ACCENT, textTransform='uppercase', 
            spaceBefore=12, spaceAfter=4
        ))
        styles.add(ParagraphStyle(
            name='LabelCentered', parent=styles['LabelIndicated'], 
            alignment=TA_CENTER
        ))
        styles.add(ParagraphStyle(
            name='BodyTextSmall', fontName='Helvetica', fontSize=10, 
            textColor=ReportTheme.PRIMARY, leading=14
        ))
        styles.add(ParagraphStyle(
            name='MetaFooter', fontName='Helvetica', fontSize=8, 
            textColor=ReportTheme.SECONDARY, alignment=TA_CENTER, leading=10
        ))
        # Dedicated Sig styles for zero-gap table layout
        styles.add(ParagraphStyle(
            name='SigTitle', parent=styles['ReportTitle'], 
            fontSize=48, spaceAfter=0, leading=50
        ))
        styles.add(ParagraphStyle(
            name='SigSubtitle', parent=styles['ReportSubtitle'], 
            fontSize=16, spaceAfter=0, spaceBefore=0, leading=20
        ))
        return styles

# --- CORE GENERATOR ---
class PremiumReportGenerator:
    """
    Production-ready PDF Engine using ReportLab's BaseDocTemplate and Frames.
    Implements a clean Start-Body-End flow with fixed Chrome.
    """
    def __init__(self, payload: dict, filename: str = "report.pdf"):
        self.data = payload
        self.filename = filename
        self.timestamp = datetime.now().strftime("%Y-%m-%d")
        self.brand_name = payload.get('foundation', {}).get('brand_name', 'BRAND').upper()
        self.styles = ReportTheme.get_styles()
        
        # Buffer for bytes output
        self.buffer = io.BytesIO()
        
        # Margins & Page Setup
        self.left_margin = 0.8 * inch
        self.right_margin = 0.8 * inch
        self.top_margin = 1.0 * inch
        self.bottom_margin = 1.0 * inch
        
        self.doc = BaseDocTemplate(
            self.buffer,
            pagesize=A4,
            rightMargin=self.right_margin,
            leftMargin=self.left_margin,
            topMargin=self.top_margin,
            bottomMargin=self.bottom_margin,
            title=f"{self.brand_name} | Brand DNA Report"
        )
        
        # Initialize Page Templates
        self._init_templates()

    def _init_templates(self):
        """Define the fixed drawing area and recurring elements."""
        # Frame for normal content pages
        main_frame = Frame(
            self.doc.leftMargin, self.doc.bottomMargin, 
            self.doc.width, self.doc.height, 
            id='normal'
        )
        
        # Frame for centered sign-off (Page-middle)
        center_frame = Frame(
            self.doc.leftMargin, 2 * inch, 
            self.doc.width, 6 * inch, 
            id='centered'
        )
        
        # Template 1: The Standalone Cover (No Chrome)
        cover_tpl = PageTemplate(id='CoverTemplate', frames=[main_frame], onPage=self._draw_no_chrome)
        
        # Template 2: The Main Report (With Chrome & Footer)
        main_tpl = PageTemplate(id='MainTemplate', frames=[main_frame], onPage=self._draw_chrome)
        
        # Template 3: The Isolated Sign-off (No Chrome, Centered Frame)
        signoff_tpl = PageTemplate(id='SignoffTemplate', frames=[center_frame], onPage=self._draw_no_chrome)
        
        self.doc.addPageTemplates([cover_tpl, main_tpl, signoff_tpl])

    def _draw_no_chrome(self, canvas, doc):
        """Empty chrome to ensure clean standalone pages."""
        canvas.setTitle(f"{self.brand_name} | Brand DNA Report")

    def _draw_chrome(self, canvas, doc):
        """Draws the fixed margins, footer meta, and page numbers."""
        canvas.setTitle(f"{self.brand_name} | Brand DNA Report")
        canvas.saveState()
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(ReportTheme.SECONDARY)
        canvas.setStrokeColor(ReportTheme.BORDER)
        
        # Bottom Line
        y_pos = 0.6 * inch
        canvas.line(self.left_margin, y_pos, A4[0] - self.right_margin, y_pos)
        
        # Footer Meta
        footer_text = f"{doc.page} | {self.brand_name} Brand DNA Report • {self.timestamp} • Enola.ai"
        canvas.drawCentredString(A4[0]/2, 0.4 * inch, footer_text)
        
        canvas.restoreState()

    def _create_callout(self, title, text):
        """Reusable styled guidance/callout box."""
        data = [
            [Paragraph(f"<b>ENOLA'S STRATEGIC GUIDANCE: {title.upper()}</b>", self.styles['LabelIndicated'])],
            [Paragraph(text, self.styles['BodyTextSmall'])]
        ]
        t = Table(data, colWidths=[self.doc.width])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), ReportTheme.LIGHT_BG),
            ('BOX', (0,0), (-1,-1), 0.5, ReportTheme.BORDER),
            ('TOPPADDING', (0,0), (-1,-1), 15),
            ('BOTTOMPADDING', (0,0), (-1,-1), 15),
            ('LEFTPADDING', (0,0), (-1,-1), 20),
            ('RIGHTPADDING', (0,0), (-1,-1), 20),
        ]))
        return t

    def build(self):
        """Assembles the document flow with precise template switching."""
        story = []
        
        # 1. START WITH COVER
        story.append(NextPageTemplate('CoverTemplate'))
        
        # COVER CONTENT
        story.append(Spacer(1, 3*inch))
        story.append(Paragraph("BRAND DNA", self.styles['ReportTitle']))
        story.append(Paragraph("STRATEGIC DIRECTIVE", self.styles['ReportSubtitle']))
        story.append(Spacer(1, 0.5*inch))
        story.append(Paragraph(f"PREPARED FOR: <b>{self.brand_name}</b>", self.styles['LabelCentered']))
        
        # 2. SWITCH TO MAIN ENGINE
        story.append(NextPageTemplate('MainTemplate'))
        story.append(PageBreak())
        
        # FOUNDATION
        fd = self.data.get('foundation', {})
        s1 = [
            Paragraph("1. Brand Foundation", self.styles['SectionHeader']),
            Paragraph("BRAND STORY", self.styles['LabelIndicated']),
            Paragraph(fd.get('brand_story', 'Pending.'), self.styles['BodyTextSmall']),
            Spacer(1, 10),
            self._create_callout("Foundational Strategy", fd.get('usp_strength_analysis', 'N/A'))
        ]
        story.append(KeepTogether(s1))
        story.append(Spacer(1, 20))
        
        # DYNAMIC SECTIONS
        sections = [
            ("visual", "2. Visual Identity System", "visual_props_advice"),
            ("voice", "3. Tone of Voice", "writing_style_hints"),
            ("positioning", "4. Market Positioning", "market_crunch_hints"),
            ("audience", "5. Audience Intelligence", None)
        ]
        
        for key, title, guidance_key in sections:
            sec_data = self.data.get(key, {})
            if not sec_data: continue
            
            block = [Paragraph(title, self.styles['SectionHeader'])]
            
            if key == "visual":
                block.append(Paragraph("Imagery Style", self.styles['LabelIndicated']))
                block.append(Paragraph(sec_data.get('imagery_style', 'N/A'), self.styles['BodyTextSmall']))
            elif key == "audience":
                for icp in sec_data.get('icps', []):
                    block.append(Paragraph(f"Persona: {icp.get('name', '')}", self.styles['LabelIndicated']))
                    block.append(Paragraph(icp.get('demographics', ''), self.styles['BodyTextSmall']))
            
            if guidance_key and sec_data.get(guidance_key):
                block.append(self._create_callout(f"{key} Integration", sec_data.get(guidance_key)))
            
            story.append(KeepTogether(block))
            story.append(Spacer(1, 20))

        # 3. SWITCH TO CENTRALLY ISOLATED SIGN-OFF
        story.append(NextPageTemplate('SignoffTemplate'))
        story.append(PageBreak())
        
        brand_block = [
            [Paragraph("<font color='#4f46e5'><b>E</b></font>", self.styles['SigTitle'])],
            [Paragraph("<b>ENOLA AI</b>", self.styles['SigSubtitle'])],
            [Paragraph("enola.launchbeat.online", self.styles['LabelCentered'])],
            [Paragraph("Flic en Flac, Mauritius", self.styles['LabelCentered'])]
        ]
        sig_table = Table(brand_block, colWidths=[self.doc.width])
        sig_table.setStyle(TableStyle([('ALIGN', (0,0), (-1,-1), 'CENTER')]))
        story.append(sig_table)

        # Final Render
        self.doc.build(story)
        
        # Return bytes
        pdf_bytes = self.buffer.getvalue()
        self.buffer.close()
        return pdf_bytes

    def save_to_disk(self, target_path):
        """Optional utility to save the generated report to disk."""
        pdf_bytes = self.build()
        with open(target_path, "wb") as f:
            f.write(pdf_bytes)
        return target_path

# --- BACKWARD COMPATIBILITY BRIDGE ---
async def generate_dna_pdf(dna_dict: dict):
    """
    Bridge function to integrate the new Premium Generator into the existing chain.
    """
    output_dir = os.path.join(os.getcwd(), "exports")
    os.makedirs(output_dir, exist_ok=True)
    
    timestamp_slug = datetime.now().strftime('%Y%H%M')
    brand_name = dna_dict.get('foundation', {}).get('brand_name', 'BRAND').replace(' ', '_')
    m_name = f"MASTER_BRIEF_{brand_name}_{timestamp_slug}.pdf"
    m_path = os.path.join(output_dir, m_name)
    
    # Generate Master
    generator = PremiumReportGenerator(dna_dict)
    generator.save_to_disk(m_path)
    
    # Return same structure (names/paths) for main.py stability
    return m_path, m_name, m_path, m_name

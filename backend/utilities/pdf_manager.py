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

    def _create_list(self, items):
        if not items:
            return Paragraph("None identified.", self.styles['BodyTextSmall'])
        list_data = [[Paragraph(f"• {str(item)}", self.styles['BodyTextSmall'])] for item in items]
        t = Table(list_data, colWidths=[self.doc.width])
        t.setStyle(TableStyle([
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        return t

    def _create_key_value(self, key, value):
        data = [
            [Paragraph(f"<b>{key}</b>", self.styles['BodyTextSmall']), Paragraph(str(value), self.styles['BodyTextSmall'])]
        ]
        t = Table(data, colWidths=[1.5*inch, self.doc.width - 1.5*inch])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
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
        
        # --- 1. FOUNDATION ---
        fd = self.data.get('foundation', {})
        story.append(Paragraph("1. Brand Foundation", self.styles['SectionHeader']))
        
        story.append(Paragraph("BRAND STORY & MISSION", self.styles['LabelIndicated']))
        story.append(Paragraph(str(fd.get('brand_story', '')), self.styles['BodyTextSmall']))
        story.append(Spacer(1, 10))
        story.append(self._create_key_value("Mission", fd.get('mission')))
        story.append(self._create_key_value("Vision", fd.get('vision')))
        story.append(self._create_key_value("Brand Promise", fd.get('brand_promise')))
        
        story.append(Paragraph("CORE VALUES", self.styles['LabelIndicated']))
        story.append(self._create_list(fd.get('values', [])))
        
        story.append(Paragraph("ARCHETYPES & BEHAVIOR", self.styles['LabelIndicated']))
        story.append(self._create_key_value("Primary", fd.get('primary_archetype')))
        story.append(self._create_key_value("Secondary", fd.get('secondary_archetype')))
        story.append(Spacer(1, 6))
        story.append(Paragraph(str(fd.get('archetype_behavioral_implications', '')), self.styles['BodyTextSmall']))
        
        if fd.get('usp_strength_analysis'):
            story.append(Spacer(1, 10))
            story.append(self._create_callout("Foundational Strategy", fd.get('usp_strength_analysis')))
            
        story.append(PageBreak())
        
        # --- 2. VISUAL IDENTITY ---
        vi = self.data.get('visual', {})
        story.append(Paragraph("2. Visual Identity System", self.styles['SectionHeader']))
        
        story.append(Paragraph("TYPOGRAPHY & IMAGERY", self.styles['LabelIndicated']))
        story.append(self._create_key_value("Primary Font", vi.get('primary_typography')))
        story.append(self._create_key_value("Secondary Font", vi.get('secondary_typography')))
        story.append(self._create_key_value("Imagery Style", vi.get('imagery_style')))
        story.append(self._create_key_value("Logo Analysis", vi.get('logo_analysis')))
        
        story.append(Paragraph("COLOR PALETTE", self.styles['LabelIndicated']))
        for color in vi.get('primary_colors', []) + vi.get('secondary_colors', []):
            hex_c = color.get('hex_code', '')
            psy = color.get('psychology', '')
            story.append(self._create_key_value(hex_c, psy))
            
        story.append(Paragraph("VISUAL RULES", self.styles['LabelIndicated']))
        rules = vi.get('rules', {})
        story.append(Paragraph("DOs", self.styles['BodyTextSmall']))
        story.append(self._create_list(rules.get('dos', [])))
        story.append(Paragraph("DONTs", self.styles['BodyTextSmall']))
        story.append(self._create_list(rules.get('donts', [])))
        
        if vi.get('visual_props_advice'):
            story.append(Spacer(1, 10))
            story.append(self._create_callout("Visual Integration", vi.get('visual_props_advice')))
            
        story.append(PageBreak())
        
        # --- 3. TONE OF VOICE ---
        vo = self.data.get('voice', {})
        story.append(Paragraph("3. Tone of Voice", self.styles['SectionHeader']))
        story.append(Paragraph(f"Summary: {vo.get('five_word_summary', '')}", self.styles['LabelIndicated']))
        
        story.append(Paragraph("LANGUAGE PATTERNS", self.styles['LabelIndicated']))
        story.append(Paragraph("Signatures", self.styles['BodyTextSmall']))
        story.append(self._create_list(vo.get('signature_patterns', [])))
        story.append(Paragraph("Forbidden", self.styles['BodyTextSmall']))
        story.append(self._create_list(vo.get('forbidden_phrases', [])))
        
        story.append(Paragraph("WRITING RULES", self.styles['LabelIndicated']))
        story.append(self._create_key_value("Guidelines", vo.get('writing_style_rules')))
        story.append(self._create_key_value("Reading Level", vo.get('flesch_kincaid_target')))
        
        if vo.get('writing_style_hints'):
            story.append(Spacer(1, 10))
            story.append(self._create_callout("Copywriting Strategy", vo.get('writing_style_hints')))
            
        story.append(PageBreak())
        
        # --- 4. MARKET POSITIONING ---
        mp = self.data.get('positioning', {})
        story.append(Paragraph("4. Market Positioning", self.styles['SectionHeader']))
        story.append(Paragraph("POSITIONING", self.styles['LabelIndicated']))
        story.append(Paragraph(str(mp.get('positioning_statement', '')), self.styles['BodyTextSmall']))
        story.append(Spacer(1, 10))
        story.append(self._create_key_value("Price Point", mp.get('price_positioning')))
        story.append(self._create_key_value("Coordinates", mp.get('brand_coordinates')))
        
        story.append(Paragraph("COMPETITORS", self.styles['LabelIndicated']))
        for comp in mp.get('competitors', []):
            story.append(self._create_key_value(comp.get('name', 'Comp.'), comp.get('differentiation', '')))
            
        swot = mp.get('swot_analysis', {})
        story.append(Paragraph("SWOT ANALYSIS", self.styles['LabelIndicated']))
        story.append(self._create_key_value("Strengths", ", ".join(swot.get('strengths', []))))
        story.append(self._create_key_value("Weaknesses", ", ".join(swot.get('weaknesses', []))))
        story.append(self._create_key_value("Opportunities", ", ".join(swot.get('opportunities', []))))
        story.append(self._create_key_value("Threats", ", ".join(swot.get('threats', []))))
        
        if mp.get('whitespace_opportunities'):
            story.append(Spacer(1, 10))
            story.append(self._create_callout("Market Whitespace", mp.get('whitespace_opportunities')))
            
        story.append(PageBreak())

        # --- 5. AUDIENCE INTELLIGENCE ---
        au = self.data.get('audience', {})
        story.append(Paragraph("5. Audience Intelligence", self.styles['SectionHeader']))
        for icp in au.get('icps', []):
            story.append(Paragraph(f"PERSONA: {str(icp.get('name', '')).upper()}", self.styles['LabelIndicated']))
            story.append(self._create_key_value("Demographics", icp.get('demographics')))
            story.append(self._create_key_value("Motivations", icp.get('motivations')))
            story.append(self._create_key_value("Media Habits", icp.get('media_habits')))
            story.append(self._create_key_value("Purchase Triggers", icp.get('purchase_triggers')))
            
            emap = icp.get('empathy_map', {})
            emap_str = f"Think: {emap.get('think')} | Feel: {emap.get('feel')} | Say: {emap.get('say')} | Do: {emap.get('do')}"
            story.append(self._create_key_value("Empathy Map", emap_str))
            story.append(Spacer(1, 10))

        story.append(PageBreak())

        # --- 6. PRODUCT / SERVICE DNA ---
        pr = self.data.get('product', {})
        story.append(Paragraph("6. Product / Service DNA", self.styles['SectionHeader']))
        story.append(self._create_key_value("Hero Product", pr.get('hero_product')))
        story.append(self._create_key_value("Pricing Psych", pr.get('pricing_psychology')))
        
        story.append(Paragraph("VALUE PROPOSITION", self.styles['LabelIndicated']))
        vc = pr.get('value_canvas', {})
        story.append(self._create_key_value("Gains", ", ".join(vc.get('gains', []))))
        story.append(self._create_key_value("Pains Eliminated", ", ".join(vc.get('pains', []))))
        story.append(self._create_key_value("Jobs To Done", ", ".join(vc.get('jobs_to_be_done', []))))
        
        story.append(Paragraph("FEATURE TO BENEFIT", self.styles['LabelIndicated']))
        for fb in pr.get('feature_mapping', []):
            f_str = f"<b>{fb.get('feature')}</b> -> {fb.get('benefit')} ({fb.get('emotional_outcome')})"
            story.append(Paragraph(f"• {f_str}", self.styles['BodyTextSmall']))
            
        if pr.get('commercial_translation_hints'):
            story.append(Spacer(1, 10))
            story.append(self._create_callout("Commercial Translation", pr.get('commercial_translation_hints')))
            
        story.append(PageBreak())

        # --- 7. CAMPAIGN INTELLIGENCE ---
        ca = self.data.get('campaign', {})
        story.append(Paragraph("7. Campaign Intelligence", self.styles['SectionHeader']))
        story.append(Paragraph("OBJECTIVES & PRIORITIES", self.styles['LabelIndicated']))
        story.append(self._create_key_value("Platform Priority", ca.get('platform_priority')))
        story.append(Paragraph("Top Objectives", self.styles['BodyTextSmall']))
        story.append(self._create_list(ca.get('top_objectives', [])))
        
        story.append(Paragraph("CONTENT STRATEGY", self.styles['LabelIndicated']))
        story.append(Paragraph("Content Pillars", self.styles['BodyTextSmall']))
        story.append(self._create_list(ca.get('content_pillars', [])))
        story.append(Paragraph("Creative Themes", self.styles['BodyTextSmall']))
        story.append(self._create_list(ca.get('creative_themes', [])))
        
        if ca.get('content_pillar_advice'):
            story.append(Spacer(1, 10))
            story.append(self._create_callout("Content Guidance", ca.get('content_pillar_advice')))
            
        # --- 8. AUDIT & METHODOLOGY ---
        au_sec = self.data.get('audit', {})
        story.append(Spacer(1, 20))
        story.append(Paragraph("8. Data Audit & Confidence", self.styles['SectionHeader']))
        story.append(self._create_key_value("Overall Score", f"{au_sec.get('overall_score', 0)}/100"))
        story.append(self._create_key_value("Quality", au_sec.get('data_quality_indicators')))
        story.append(self._create_key_value("Gaps Found", au_sec.get('identified_gaps')))

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

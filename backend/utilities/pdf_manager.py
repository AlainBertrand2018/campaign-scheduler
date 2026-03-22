import os
from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.graphics.shapes import Drawing, String, Line
from reportlab.graphics.charts.spider import SpiderChart

class DNAReportGenerator:
    """
    Agency-grade, boardroom-ready PDF generator for Brand DNA.
    Generates Two PDFs based on the MasterBrandDNA Pydantic schema:
    1. Executive Summary (Passport)
    2. Master Consultation Brief (In-Depth)
    Uses a highly legible, strict light-theme corporate styling (Helvetica).
    """
    def __init__(self, brand_dna: dict):
        self.dna = brand_dna
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.brand_name = self.dna.get('foundation', {}).get('brand_name', 'UNKNOWN_BRAND').upper()
        
        # Paths
        self.output_dir = os.path.join(os.getcwd(), "exports")
        os.makedirs(self.output_dir, exist_ok=True)
        
        timestamp_slug = datetime.now().strftime('%Y%H%M')
        safe_name = self.brand_name.replace(' ', '_').replace('/', '')
        
        self.preview_filename = f"SUMMARY_{safe_name}_{timestamp_slug}.pdf"
        self.master_filename = f"MASTER_BRIEF_{safe_name}_{timestamp_slug}.pdf"
        
        # Colors (Light Theme Agency)
        self.c_bg = colors.HexColor("#ffffff")
        self.c_text = colors.HexColor("#0f172a") # Slate 900
        self.c_secondary = colors.HexColor("#475569") # Slate 600
        self.c_accent = colors.HexColor("#4f46e5") # Indigo 600
        self.c_surface = colors.HexColor("#f8fafc") # Slate 50
        self.c_border = colors.HexColor("#e2e8f0") # Slate 200

        self.styles = getSampleStyleSheet()
        self._init_styles()

    def _init_styles(self):
        # Base Text
        self.styles.add(ParagraphStyle(name='AText', fontName='Helvetica', fontSize=10, textColor=self.c_text, leading=14))
        self.styles.add(ParagraphStyle(name='ASmall', fontName='Helvetica', fontSize=8, textColor=self.c_secondary, leading=11))
        # Headers
        self.styles.add(ParagraphStyle(name='ATitle', fontName='Helvetica-Bold', fontSize=26, textColor=self.c_text, spaceAfter=20, leading=30))
        self.styles.add(ParagraphStyle(name='AHeader1', fontName='Helvetica-Bold', fontSize=18, textColor=self.c_text, spaceBefore=20, spaceAfter=10, leading=22))
        self.styles.add(ParagraphStyle(name='AHeader2', fontName='Helvetica-Bold', fontSize=14, textColor=self.c_text, spaceBefore=15, spaceAfter=8, leading=18))
        self.styles.add(ParagraphStyle(name='ALabel', fontName='Helvetica-Bold', fontSize=9, textColor=self.c_accent, spaceBefore=5, spaceAfter=2, textTransform='uppercase'))

    def _draw_radar_chart(self, scores_dict):
        """Draws a Spider/Radar chart using reportlab.graphics"""
        d = Drawing(400, 200)
        chart = SpiderChart()
        chart.x = 100
        chart.y = 20
        chart.width = 160
        chart.height = 160
        chart.data = [[
            scores_dict.get('sincerity', 5),
            scores_dict.get('excitement', 5),
            scores_dict.get('competence', 5),
            scores_dict.get('sophistication', 5),
            scores_dict.get('ruggedness', 5)
        ]]
        chart.labels = ['Sincerity', 'Excitement', 'Competence', 'Sophistication', 'Ruggedness']
        chart.fillColor = colors.Color(79/255, 70/255, 229/255, alpha=0.2) # Indigo transparent
        chart.strokeColor = self.c_accent
        chart.strokeWidth = 1.5
        chart.spokeLabels.fontName = 'Helvetica'
        chart.spokeLabels.fontSize = 8
        d.add(chart)
        return d
        
    def _create_standard_table(self, data, col_widths=None):
        t = Table(data, colWidths=col_widths)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), self.c_surface),
            ('TEXTCOLOR', (0,0), (-1,0), self.c_text),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 9),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('TOPPADDING', (0,0), (-1,-1), 8),
            ('GRID', (0,0), (-1,-1), 0.5, self.c_border)
        ]))
        return t

    def generate(self):
        self._build_preview()
        self._build_master()
        return (
            os.path.join(self.output_dir, self.preview_filename), self.preview_filename,
            os.path.join(self.output_dir, self.master_filename), self.master_filename
        )

    def _build_preview(self):
        """Builds Document 1: 3-page Passport"""
        doc = SimpleDocTemplate(
            os.path.join(self.output_dir, self.preview_filename),
            pagesize=A4, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
        )
        elements = []
        
        # Helper to get nested values safely
        fd = self.dna.get('foundation', {})
        vd = self.dna.get('visual', {})
        vo = self.dna.get('voice', {})
        ca = self.dna.get('campaign', {})
        au = self.dna.get('audit', {})
        
        # --- PAGE 1: Identity Card ---
        elements.append(Paragraph("BRAND IDENTITY CARD", self.styles['ATitle']))
        elements.append(Paragraph(f"<b>BRAND:</b> {self.brand_name}", self.styles['AHeader2']))
        elements.append(Paragraph(f"<b>ARCHETYPE:</b> {fd.get('primary_archetype', 'N/A')}", self.styles['AText']))
        elements.append(Spacer(1, 15))
        
        elements.append(Paragraph("BRAND PERSONALITY (AAKER)", self.styles['ALabel']))
        radar = self._draw_radar_chart(fd.get('personality_scores', {}))
        elements.append(radar)
        
        elements.append(Spacer(1, 15))
        elements.append(Paragraph("PRIMARY COLOR PALETTE", self.styles['ALabel']))
        color_data = [['HEX', 'PSYCHOLOGY']]
        for c in vd.get('primary_colors', []):
            color_data.append([c.get('hex_code', ''), Paragraph(c.get('psychology', ''), self.styles['AText'])])
        if len(color_data) > 1:
            elements.append(self._create_standard_table(color_data, col_widths=[1*inch, 5*inch]))
        
        elements.append(Spacer(1, 15))
        elements.append(Paragraph("TYPOGRAPHY SPECIMEN", self.styles['ALabel']))
        elements.append(Paragraph(f"<b>Primary:</b> {vd.get('primary_typography', 'N/A')}", self.styles['AText']))
        elements.append(Paragraph(f"<b>Secondary:</b> {vd.get('secondary_typography', 'N/A')}", self.styles['AText']))
        elements.append(PageBreak())

        # --- PAGE 2: Voice & Positioning Snapshot ---
        elements.append(Paragraph("VOICE & POSITIONING SNAPSHOT", self.styles['AHeader1']))
        elements.append(Paragraph("TONE IN 5 WORDS", self.styles['ALabel']))
        elements.append(Paragraph(vo.get('five_word_summary', 'N/A'), self.styles['AText']))
        
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("SIGNATURE EXPRESSIONS", self.styles['ALabel']))
        for exp in vo.get('signature_patterns', []):
            elements.append(Paragraph(f"• {exp}", self.styles['AText']))

        elements.append(Spacer(1, 10))
        elements.append(Paragraph("VALUE PROPOSITION", self.styles['ALabel']))
        vp = self.dna.get('product', {}).get('value_canvas', {}).get('jobs_to_be_done', ['N/A'])[0]
        elements.append(Paragraph(vp, self.styles['AText']))
        
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("TOP 3 DIFFERENTIATORS", self.styles['ALabel']))
        diffs = self.dna.get('positioning', {}).get('competitors', [])
        for i, comp in enumerate(diffs[:3]):
            elements.append(Paragraph(f"• vs {comp.get('name')}: {comp.get('differentiation')}", self.styles['AText']))
            
        elements.append(PageBreak())

        # --- PAGE 3: Campaign Readiness Score ---
        elements.append(Paragraph("CAMPAIGN READINESS SCORE", self.styles['AHeader1']))
        score = au.get('overall_score', 0)
        elements.append(Paragraph(f"<b>Overall Confidence Score:</b> {score}/100", self.styles['AHeader2']))
        elements.append(Paragraph(f"<b>Source Quality:</b> {au.get('data_quality_indicators', 'N/A')}", self.styles['AText']))
        
        elements.append(Spacer(1, 15))
        elements.append(Paragraph("TOP RECOMMENDED OBJECTIVES", self.styles['ALabel']))
        for obj in ca.get('top_objectives', []):
            elements.append(Paragraph(f"• {obj}", self.styles['AText']))

        doc.build(elements)

    def _create_guidance_box(self, title, content):
        """Creates a stylized advisory box for Enola's strategic hints"""
        data = [
            [Paragraph(f"<b>ENOLA'S STRATEGIC GUIDANCE: {title.upper()}</b>", self.styles['ASmall'])],
            [Paragraph(content, self.styles['AText'])]
        ]
        t = Table(data, colWidths=[7*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")), # Slate 100
            ('TEXTCOLOR', (0,0), (-1,-1), self.c_text),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('TOPPADDING', (0,0), (-1,-1), 8),
            ('LEFTPADDING', (0,0), (-1,-1), 12),
            ('RIGHTPADDING', (0,0), (-1,-1), 12),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")), # Slate 300
        ]))
        return t

    def _build_master(self):
        """Builds Document 2: In-Depth Exhaustive Report (Continuous Flow)"""
        doc = SimpleDocTemplate(
            os.path.join(self.output_dir, self.master_filename),
            pagesize=A4, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
        )
        elements = []
        
        elements.append(Paragraph(f"{self.brand_name} — IN-DEPTH BRAND DNA", self.styles['ATitle']))
        elements.append(Paragraph("ENOLA.AI STRATEGIC CONSULTATION BRIEF", self.styles['ASmall']))
        elements.append(Spacer(1, 20))
        
        # Section 1: Foundation
        fd = self.dna.get('foundation', {})
        elements.append(Paragraph("1. BRAND FOUNDATION", self.styles['AHeader1']))
        elements.append(Paragraph("BRAND STORY", self.styles['ALabel']))
        elements.append(Paragraph(fd.get('brand_story', 'N/A'), self.styles['AText']))
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("MISSION & VISION", self.styles['ALabel']))
        elements.append(Paragraph(f"<b>Mission:</b> {fd.get('mission', 'N/A')}", self.styles['AText']))
        elements.append(Paragraph(f"<b>Vision:</b> {fd.get('vision', 'N/A')}", self.styles['AText']))
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("BRAND PROMISE", self.styles['ALabel']))
        elements.append(Paragraph(fd.get('brand_promise', 'N/A'), self.styles['AText']))
        elements.append(Spacer(1, 10))
        elements.append(self._create_guidance_box("USP Strength & Integration", 
            f"<b>USP Strength:</b> {fd.get('usp_strength_analysis', 'N/A')}<br/>"
            f"<b>Campaign Hints:</b> {fd.get('campaign_integration_hints', 'N/A')}"
        ))

        # Section 2: Visual System
        vd = self.dna.get('visual', {})
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("2. VISUAL IDENTITY SYSTEM", self.styles['AHeader1']))
        elements.append(Paragraph("DOS AND DONTS", self.styles['ALabel']))
        rules = vd.get('rules', {})
        for do in rules.get('dos', []): elements.append(Paragraph(f"✅ {do}", self.styles['AText']))
        for dont in rules.get('donts', []): elements.append(Paragraph(f"❌ {dont}", self.styles['AText']))
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("IMAGERY STYLE", self.styles['ALabel']))
        elements.append(Paragraph(vd.get('imagery_style', 'N/A'), self.styles['AText']))
        elements.append(Spacer(1, 10))
        elements.append(self._create_guidance_box("Color Psychology & Visual Props", 
            f"<b>Color Analysis:</b> {vd.get('primary_secondary_colors_analysis', 'N/A')}<br/>"
            f"<b>Advertising Usage:</b> {vd.get('advertising_usage_hints', 'N/A')}<br/>"
            f"<b>Props Advice:</b> {vd.get('visual_props_advice', 'N/A')}"
        ))

        # Section 3: Tone of Voice
        vo = self.dna.get('voice', {})
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("3. TONE OF VOICE & COPY", self.styles['AHeader1']))
        elements.append(Paragraph("VOICE DIMENSIONS (0-10)", self.styles['ALabel']))
        dims = vo.get('dimensions', {})
        elements.append(Paragraph(f"Formal <---> Casual: {dims.get('formal_casual', 0)}", self.styles['AText']))
        elements.append(Paragraph(f"Serious <---> Playful: {dims.get('serious_playful', 0)}", self.styles['AText']))
        elements.append(Paragraph(f"Rational <---> Emotive: {dims.get('rational_emotive', 0)}", self.styles['AText']))
        elements.append(Spacer(1, 10))
        elements.append(self._create_guidance_box("Tone Integration & Writing Style", 
            f"<b>Integration Analysis:</b> {vo.get('voice_dna_integration_analysis', 'N/A')}<br/>"
            f"<b>Style Hints:</b> {vo.get('writing_style_hints', 'N/A')}"
        ))
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("REWRITE SAMPLES", self.styles['ALabel']))
        for sample in vo.get('sample_rewrites', []):
            d = [
                [Paragraph("GENERIC", self.styles['ASmall']), Paragraph("BRAND VOICE", self.styles['ASmall'])],
                [Paragraph(sample.get('generic_copy',''), self.styles['AText']), Paragraph(sample.get('brand_voice_copy',''), self.styles['AText'])]
            ]
            elements.append(self._create_standard_table(d, col_widths=[3.5*inch, 3.5*inch]))
            elements.append(Spacer(1, 5))

        # Section 4: Market Positioning
        pos = self.dna.get('positioning', {})
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("4. MARKET POSITIONING", self.styles['AHeader1']))
        elements.append(Paragraph("POSITIONING STATEMENT", self.styles['ALabel']))
        elements.append(Paragraph(pos.get('positioning_statement', 'N/A'), self.styles['AText']))
        elements.append(Spacer(1, 10))
        elements.append(self._create_guidance_box("Market Context & Competition crunch", 
            f"<b>Context:</b> {pos.get('market_context_analysis', 'N/A')}<br/>"
            f"<b>Crunch Hints:</b> {pos.get('market_crunch_hints', 'N/A')}"
        ))
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("SWOT ANALYSIS", self.styles['ALabel']))
        sw = pos.get('swot_analysis', {})
        elements.append(Paragraph(f"<b>Strengths:</b> {', '.join(sw.get('strengths', []))}", self.styles['AText']))
        elements.append(Paragraph(f"<b>Weaknesses:</b> {', '.join(sw.get('weaknesses', []))}", self.styles['AText']))
        elements.append(Paragraph(f"<b>Opportunities:</b> {', '.join(sw.get('opportunities', []))}", self.styles['AText']))
        elements.append(Paragraph(f"<b>Threats:</b> {', '.join(sw.get('threats', []))}", self.styles['AText']))
        elements.append(Spacer(1, 10))
        elements.append(self._create_guidance_box("SWOT Mitigation & Resistance", 
            f"<b>Mitigation Strategy:</b> {pos.get('swot_mitigation_strategy', 'N/A')}<br/>"
            f"<b>Resistance Hints:</b> {pos.get('competition_resistance_hints', 'N/A')}"
        ))

        # Section 5: Audience Intelligence
        au_int = self.dna.get('audience', {})
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("5. AUDIENCE INTELLIGENCE", self.styles['AHeader1']))
        elements.append(Paragraph("IDEAL CUSTOMER PROFILES", self.styles['ALabel']))
        for icp in au_int.get('icps', []):
            elements.append(Paragraph(f"<b>Persona: {icp.get('name')}</b>", self.styles['AHeader2']))
            elements.append(Paragraph(f"<b>Demographics:</b> {icp.get('demographics', 'N/A')}", self.styles['AText']))
            elements.append(Paragraph(f"<b>Motivations:</b> {icp.get('motivations', 'N/A')}", self.styles['AText']))
            em = icp.get('empathy_map', {})
            elements.append(Paragraph(f"<i>Thinks:</i> {em.get('think')} | <i>Feels:</i> {em.get('feel')}", self.styles['AText']))
            elements.append(Spacer(1, 5))
            elements.append(self._create_guidance_box(f"Persona Fit & Communication: {icp.get('name')}", 
                f"<b>ICP Fit:</b> {icp.get('persona_icp_fit', 'N/A')}<br/>"
                f"<b>Communication Hints:</b> {icp.get('communication_hints', 'N/A')}"
            ))
            elements.append(Spacer(1, 10))

        # Section 6: Product / Service DNA
        pr = self.dna.get('product', {})
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("6. PRODUCT / SERVICE DNA", self.styles['AHeader1']))
        elements.append(Paragraph("VALUE PROPOSITION CANVAS", self.styles['ALabel']))
        vc = pr.get('value_canvas', {})
        elements.append(Paragraph(f"<b>Gains:</b> {', '.join(vc.get('gains', []))}", self.styles['AText']))
        elements.append(Paragraph(f"<b>Pains:</b> {', '.join(vc.get('pains', []))}", self.styles['AText']))
        elements.append(Spacer(1, 5))
        elements.append(self._create_guidance_box("Value Canvas Influence", pr.get('value_canvas_analysis', 'N/A')))
        
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("FEATURE/BENEFIT MAPPING", self.styles['ALabel']))
        f_data = [['FEATURE', 'BENEFIT', 'EMOTION']]
        for f in pr.get('feature_mapping', []):
            f_data.append([
                Paragraph(f.get('feature',''), self.styles['AText']),
                Paragraph(f.get('benefit',''), self.styles['AText']),
                Paragraph(f.get('emotional_outcome',''), self.styles['AText'])
            ])
        if len(f_data) > 1:
            elements.append(self._create_standard_table(f_data, col_widths=[2.3*inch, 2.3*inch, 2.3*inch]))
        elements.append(Spacer(1, 5))
        elements.append(self._create_guidance_box("Commercial Translation", pr.get('commercial_translation_hints', 'N/A')))

        # Section 7: Campaign Intelligence
        ca = self.dna.get('campaign', {})
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("7. CAMPAIGN RECOMMENDATIONS", self.styles['AHeader1']))
        elements.append(Paragraph("CONTENT PILLARS", self.styles['ALabel']))
        for c in ca.get('content_pillars', []): elements.append(Paragraph(f"• {c}", self.styles['AText']))
        elements.append(Spacer(1, 5))
        elements.append(self._create_guidance_box("Content Pillar Advice", ca.get('content_pillar_advice', 'N/A')))
        
        # Section 8: Audit
        aud = self.dna.get('audit', {})
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("8. AUDIT & CONFIDENCE", self.styles['AHeader1']))
        elements.append(Paragraph(f"<b>Overall Score:</b> {aud.get('overall_score')}/100", self.styles['AText']))
        elements.append(Spacer(1, 5))
        elements.append(self._create_guidance_box("Scoring Benchmark", aud.get('scoring_benchmark_explanation', 'N/A')))
        elements.append(Spacer(1, 10))
        elements.append(Paragraph(f"<b>Identified Gaps:</b> {aud.get('identified_gaps', 'N/A')}", self.styles['AText']))
        elements.append(Spacer(1, 5))
        elements.append(self._create_guidance_box("Gap Resolution Strategy", aud.get('gap_resolution_strategy', 'N/A')))

        # Section 9: Frameworks
        meth = self.dna.get('methodology', {})
        elements.append(Spacer(1, 30))
        elements.append(Paragraph("9. METHODOLOGY & FRAMEWORKS", self.styles['AHeader1']))
        elements.append(Paragraph(f"<b>Frameworks Leveraged:</b> {', '.join(meth.get('frameworks_used', []))}", self.styles['AText']))
        elements.append(Spacer(1, 5))
        elements.append(self._create_guidance_box("Methodology Explanation", meth.get('framework_explanations', 'N/A')))

        doc.build(elements)

def generate_dna_pdf(dna_dict: dict):
    generator = DNAReportGenerator(dna_dict)
    p_path, p_name, m_path, m_name = generator.generate()
    return p_path, p_name, m_path, m_name

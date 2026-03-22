from pydantic import BaseModel, Field
from typing import List, Optional

# --- SECTION 1: Brand Foundation ---
class AakerPersonality(BaseModel):
    sincerity: int = Field(..., description="0-10 score for Sincerity")
    excitement: int = Field(..., description="0-10 score for Excitement")
    competence: int = Field(..., description="0-10 score for Competence")
    sophistication: int = Field(..., description="0-10 score for Sophistication")
    ruggedness: int = Field(..., description="0-10 score for Ruggedness")
    commentary: str = Field(..., description="Brief analysis of this personality profile.")

class BrandFoundation(BaseModel):
    brand_name: str = Field(..., description="The name of the Brand")
    brand_story: str = Field(..., description="Full brand story reconstruction (2-3 paragraphs)")
    mission: str = Field(..., description="Core mission statement")
    vision: str = Field(..., description="Long-term vision statement")
    values: List[str] = Field(..., description="List of core values")
    primary_archetype: str = Field(..., description="Primary 12-archetype classification (e.g., The Hero)")
    secondary_archetype: str = Field(..., description="Secondary archetype")
    archetype_behavioral_implications: str = Field(..., description="How these archetypes imply the brand should behave in advertising")
    personality_scores: AakerPersonality
    brand_promise: str = Field(..., description="One-line AI-generated brand promise")
    usp_strength_analysis: str = Field(..., description="How strong/enticing/convincing is the USP?")
    campaign_integration_hints: str = Field(..., description="How to mentally integrate these values in a campaign or advertisement planning. What to do and what not to do.")
    brand_maturity: str = Field(..., description="Maturity assessment (startup / growing / established / legacy)")

# --- SECTION 2: Visual Identity ---
class ColorDefinition(BaseModel):
    hex_code: str = Field(..., description="Hex code (e.g., #FFFFFF)")
    psychology: str = Field(..., description="What this specific color communicates emotionally")
    color_critical_analysis: str = Field(..., description="Critical analysis: is this a good or bad choice for the sector? Not sycophantic.")

class VisualDoDont(BaseModel):
    dos: List[str] = Field(..., description="Visual rules to follow")
    donts: List[str] = Field(..., description="Visual patterns to strictly avoid")

class VisualSystem(BaseModel):
    primary_colors: List[ColorDefinition] = Field(..., description="Primary brand colors and critical analysis")
    secondary_colors: List[ColorDefinition] = Field(..., description="Secondary/accent colors")
    primary_secondary_colors_analysis: str = Field(..., description="Critical analysis: is this a good or bad color choice for the sector?")
    advertising_usage_hints: str = Field(..., description="Hints on how to use the entire palette across advertising visuals and artworks.")
    visual_props_advice: str = Field(..., description="Advise on what kinds of visual props will work best for photography or video.")
    primary_typography: str = Field(..., description="Primary font family and its hierarchy rules")
    secondary_typography: str = Field(..., description="Secondary font family and its usage")
    logo_analysis: str = Field(..., description="Style classification and safe usage inferences of the logo")
    imagery_style: str = Field(..., description="Photography style, illustration vs photography, mood, lighting, subject matter patterns")
    rules: VisualDoDont
    extracted_app_images: List[str] = Field(..., description="List of image URLs extracted during the web scrape, directly copy-pasted from the 'SECONDARY SIGNALS'")
    extracted_app_fonts: List[str] = Field(..., description="List of fonts extracted during the web scrape.")
    extracted_app_colors: List[str] = Field(..., description="List of colors extracted during the web scrape.")

# --- SECTION 3: Tone of Voice & Copy ---
class ToneDimensions(BaseModel):
    formal_casual: int = Field(..., description="0 (Formal) to 10 (Casual)")
    serious_playful: int = Field(..., description="0 (Serious) to 10 (Playful)")
    rational_emotive: int = Field(..., description="0 (Rational) to 10 (Emotive)")
    conventional_irreverent: int = Field(..., description="0 (Conventional) to 10 (Irreverent)")
    inclusive_exclusive: int = Field(..., description="0 (Inclusive) to 10 (Exclusive)")
    simple_sophisticated: int = Field(..., description="0 (Simple) to 10 (Sophisticated)")

class PlatformTone(BaseModel):
    linkedin: str = Field(..., description="Tone adaptation for LinkedIn")
    instagram: str = Field(..., description="Tone adaptation for Instagram")
    tiktok_x: str = Field(..., description="Tone adaptation for TikTok/X")

class CopyRewriteSample(BaseModel):
    generic_copy: str = Field(..., description="A generic, boring version of a message")
    brand_voice_copy: str = Field(..., description="The same message rewritten perfectly in the brand's unique voice")

class VoiceProfile(BaseModel):
    five_word_summary: str = Field(..., description="Exact 5 words describing the tone")
    dimensions: ToneDimensions
    voice_dna_integration_analysis: str = Field(..., description="Explain how the discovered 'Voice Dimensions' integrate (or not) with the core Brand DNA.")
    writing_style_hints: str = Field(..., description="Specific hints on which writing style and grammatical rules suit the brand the most.")
    writing_style_rules: str = Field(..., description="Rules on sentence length, vocabulary level, punctuation")
    signature_patterns: List[str] = Field(..., description="3 signature phrases or linguistic rhythms")
    forbidden_phrases: List[str] = Field(..., description="3 forbidden words, phrases, or tones")
    flesch_kincaid_target: str = Field(..., description="Target reading level score/grade (e.g., 8th Grade)")
    platform_adaptations: PlatformTone
    sample_rewrites: List[CopyRewriteSample] = Field(..., description="At least 4-5 sample rewrites for comparison")

# --- SECTION 4: Market Positioning ---
class Competitor(BaseModel):
    name: str = Field(...)
    differentiation: str = Field(..., description="How our brand differentiates from this competitor (feature/benefit/emotion)")

class SWOT(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]

class MarketPositioning(BaseModel):
    positioning_statement: str = Field(..., description="Crafted positioning statement")
    market_context_analysis: str = Field(..., description="Explain what the global and local markets look like and how the brand positions itself therein.")
    market_crunch_hints: str = Field(..., description="Hints on what is usually done by sector actors to capture market share.")
    perceptual_map_axes: str = Field(..., description="The two axes defining the market (e.g., Premium vs Accessible, Traditional vs Innovative)")
    brand_coordinates: str = Field(..., description="Where the brand sits on these axes")
    competitors: List[Competitor]
    whitespace_opportunities: str = Field(..., description="Where competitors are weak or silent")
    price_positioning: str = Field(..., description="Premium / mid / value and its advertising implications")
    swot_analysis: SWOT
    swot_mitigation_strategy: str = Field(..., description="Explain how each strength and weakness influences market positioning. Give hints on stylishly emphasizing strengths and mitigating weaknesses.")
    competition_resistance_hints: str = Field(..., description="Give hints on how to effectively resist and counter competition.")

# --- SECTION 5: Audience Intelligence ---
class EmpathyMap(BaseModel):
    think: str
    feel: str
    say: str
    do: str

class ICP(BaseModel):
    name: str
    demographics: str = Field(..., description="Age, location, occupation")
    motivations: str = Field(..., description="Goals, frustrations, motivations")
    persona_icp_fit: str = Field(..., description="Explain how this persona fits into the broader ICP required by the brand.")
    communication_hints: str = Field(..., description="Hints on how specifically to communicate to this persona.")
    media_habits: str = Field(..., description="Media habits and platform preferences")
    purchase_triggers: str = Field(..., description="Triggers and objections")
    preferred_content: str = Field(..., description="Preferred content format")
    empathy_map: EmpathyMap

class AudienceIntelligence(BaseModel):
    icps: List[ICP] = Field(..., description="3 to 5 fully developed Ideal Customer Profiles / Personas")
    audience_language_patterns: str = Field(..., description="Exact words the audience uses (mined or inferred)")
    buying_journey_stages: str = Field(..., description="Stages and what content fits each stage")

# --- SECTION 6: Product / Service DNA ---
class ValuePropositionCanvas(BaseModel):
    gains: List[str]
    pains: List[str]
    jobs_to_be_done: List[str]

class FeatureBenefit(BaseModel):
    feature: str
    benefit: str
    emotional_outcome: str

class ProductDNA(BaseModel):
    value_canvas: ValuePropositionCanvas
    value_canvas_analysis: str = Field(..., description="Elaborate on Gains and Pains. Explain how these influence or spotlight the brand's image.")
    feature_mapping: List[FeatureBenefit]
    commercial_translation_hints: str = Field(..., description="Elaborate on Feature/Benefit mapping. Give hints on how to translate these into accessible commercial advertising language.")
    hero_product: str
    pricing_psychology: str
    proof_points: List[str] = Field(..., description="Inventory of awards, testimonials, credentials")
    objection_map: List[str] = Field(..., description="Common objections + counter-messages")

# --- SECTION 7: Campaign Intelligence ---
class CampaignIntelligence(BaseModel):
    top_objectives: List[str] = Field(..., description="Top 5 recommended campaign objectives ranked by readiness")
    content_pillars: List[str] = Field(..., description="3-5 content pillars with rationale")
    content_pillar_advice: str = Field(..., description="Elaborate on the chosen content pillars, giving actionable advice and hints on deployment.")
    platform_priority: str = Field(..., description="Platform ranking and why")
    creative_themes: List[str] = Field(..., description="3 recommended campaign themes/territories")
    seasonal_opportunities: str = Field(..., description="Seasonal and cultural moment opportunities")

# --- SECTION 8: Confidence & Audit ---
class ConfidenceAudit(BaseModel):
    overall_score: int = Field(..., description="0-100 overall brand DNA confidence score")
    scoring_benchmark_explanation: str = Field(..., description="Elaborate on the scoring benchmark, why this score was attributed, and exactly how to upgrade the score.")
    data_quality_indicators: str = Field(..., description="Data source quality rating per source")
    identified_gaps: str = Field(..., description="What's missing and how it affects output quality")
    gap_resolution_strategy: str = Field(..., description="Elaborate on the identified gaps. Suggest explicit methods and actions to resolve them.")
    enrichment_actions: str = Field(..., description="Recommended actions for the user to improve accuracy")

# --- SECTION 9: Methodology & Frameworks ---
class MethodologyFrameworks(BaseModel):
    frameworks_used: List[str] = Field(..., description="List of frameworks leveraged in this analysis (e.g., Aaker, AIDA, SWOT)")
    framework_explanations: str = Field(..., description="Explain the reference benchmarks, case studies, and frameworks used to build this report, detailing why they matter.")

# --- MASTER MODEL ---
class MasterBrandDNA(BaseModel):
    foundation: BrandFoundation
    visual: VisualSystem
    voice: VoiceProfile
    positioning: MarketPositioning
    audience: AudienceIntelligence
    product: ProductDNA
    campaign: CampaignIntelligence
    audit: ConfidenceAudit
    methodology: MethodologyFrameworks

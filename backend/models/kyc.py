from pydantic import BaseModel, Field
from typing import List, Optional

# --- SECTION 1: Brand Foundation ---
class AakerPersonality(BaseModel):
    sincerity: int = Field(5, description="0-10 score for Sincerity")
    excitement: int = Field(5, description="0-10 score for Excitement")
    competence: int = Field(5, description="0-10 score for Competence")
    sophistication: int = Field(5, description="0-10 score for Sophistication")
    ruggedness: int = Field(5, description="0-10 score for Ruggedness")
    commentary: str = Field("Standard personality assessment.", description="Brief analysis of this personality profile.")

class BrandFoundation(BaseModel):
    brand_name: str = Field("Unknown Brand", description="The name of the Brand")
    brand_story: str = Field("Story under reconstruction.", description="Full brand story reconstruction (2-3 paragraphs)")
    mission: str = Field("Mission pending.", description="Core mission statement")
    vision: str = Field("Vision pending.", description="Long-term vision statement")
    values: List[str] = Field(default_factory=list, description="List of core values")
    primary_archetype: str = Field("The Everyman", description="Primary 12-archetype classification (e.g., The Hero)")
    secondary_archetype: str = Field("The Innocent", description="Secondary archetype")
    archetype_behavioral_implications: str = Field("Standard behavior.", description="How these archetypes imply the brand should behave in advertising")
    personality_scores: AakerPersonality = Field(default_factory=lambda: AakerPersonality())
    brand_promise: str = Field("Quality provided.", description="One-line AI-generated brand promise")
    usp_strength_analysis: str = Field("Balanced USP.", description="How strong/enticing/convincing is the USP?")
    campaign_integration_hints: str = Field("Standard integration.", description="How to mentally integrate these values in a campaign or advertisement planning. What to do and what not to do.")
    brand_maturity: str = Field("Startup", description="Maturity assessment (startup / growing / established / legacy)")

# --- SECTION 2: Visual Identity ---
class ColorDefinition(BaseModel):
    hex_code: str = Field("#000000", description="Hex code (e.g., #FFFFFF)")
    psychology: str = Field("Neutral impact.", description="What this specific color communicates emotionally")
    color_critical_analysis: str = Field("Functional choice.", description="Critical analysis: is this a good or bad choice for the sector? Not sycophantic.")

class VisualDoDont(BaseModel):
    dos: List[str] = Field(default_factory=list, description="Visual rules to follow")
    donts: List[str] = Field(default_factory=list, description="Visual patterns to strictly avoid")

class VisualSystem(BaseModel):
    primary_colors: List[ColorDefinition] = Field(default_factory=list, description="Primary brand colors and critical analysis")
    secondary_colors: List[ColorDefinition] = Field(default_factory=list, description="Secondary/accent colors")
    primary_secondary_colors_analysis: str = Field("Color palette under review.", description="Critical analysis: is this a good or bad color choice for the sector?")
    advertising_usage_hints: str = Field("Standard usage.", description="Hints on how to use the entire palette across advertising visuals and artworks.")
    visual_props_advice: str = Field("Standard props.", description="Advise on what kinds of visual props will work best for photography or video.")
    primary_typography: str = Field("Sans-serif", description="Primary font family and its hierarchy rules")
    secondary_typography: str = Field("Serif", description="Secondary font family and its usage")
    logo_analysis: str = Field("Modern minimalist.", description="Style classification and safe usage inferences of the logo")
    imagery_style: str = Field("Lifestyle photography.", description="Photography style, illustration vs photography, mood, lighting, subject matter patterns")
    rules: VisualDoDont = Field(default_factory=lambda: VisualDoDont())
    extracted_app_images: List[str] = Field(default_factory=list, description="List of image URLs extracted during the web scrape, directly copy-pasted from the 'SECONDARY SIGNALS'")
    extracted_app_fonts: List[str] = Field(default_factory=list, description="List of fonts extracted during the web scrape.")
    extracted_app_colors: List[str] = Field(default_factory=list, description="List of colors extracted during the web scrape.")

# --- SECTION 3: Tone of Voice & Copy ---
class ToneDimensions(BaseModel):
    formal_casual: int = Field(5, description="0 (Formal) to 10 (Casual)")
    serious_playful: int = Field(5, description="0 (Serious) to 10 (Playful)")
    rational_emotive: int = Field(5, description="0 (Rational) to 10 (Emotive)")
    conventional_irreverent: int = Field(5, description="0 (Conventional) to 10 (Irreverent)")
    inclusive_exclusive: int = Field(5, description="0 (Inclusive) to 10 (Exclusive)")
    simple_sophisticated: int = Field(5, description="0 (Simple) to 10 (Sophisticated)")

class PlatformTone(BaseModel):
    linkedin: str = Field("Platform adaptation pending.", description="Tone adaptation for LinkedIn")
    instagram: str = Field("Platform adaptation pending.", description="Tone adaptation for Instagram")
    tiktok_x: str = Field("Platform adaptation pending.", description="Tone adaptation for TikTok/X")

class CopyRewriteSample(BaseModel):
    generic_copy: str = Field("Standard generic copy.", description="A generic, boring version of a message")
    brand_voice_copy: str = Field("Refined brand voice copy.", description="The same message rewritten perfectly in the brand's unique voice")

class VoiceProfile(BaseModel):
    five_word_summary: str = Field("Professional, clear, robust, direct, effective.", description="Exact 5 words describing the tone")
    dimensions: ToneDimensions = Field(default_factory=lambda: ToneDimensions())
    voice_dna_integration_analysis: str = Field("Integration analysis pending.", description="Explain how the discovered 'Voice Dimensions' integrate (or not) with the core Brand DNA.")
    writing_style_hints: str = Field("Clear and concise.", description="Specific hints on which writing style and grammatical rules suit the brand the most.")
    writing_style_rules: str = Field("Standard business English.", description="Rules on sentence length, vocabulary level, punctuation")
    signature_patterns: List[str] = Field(default_factory=list, description="3 signature phrases or linguistic rhythms")
    forbidden_phrases: List[str] = Field(default_factory=list, description="3 forbidden words, phrases, or tones")
    flesch_kincaid_target: str = Field("8th Grade", description="Target reading level score/grade (e.g., 8th Grade)")
    platform_adaptations: PlatformTone = Field(default_factory=lambda: PlatformTone())
    sample_rewrites: List[CopyRewriteSample] = Field(default_factory=list, description="At least 4-5 sample rewrites for comparison")

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
    positioning_statement: str = Field("Positioning statement under development.", description="Crafted positioning statement")
    market_context_analysis: str = Field("Market context analysis pending.", description="Explain what the global and local markets look like and how the brand positions itself therein.")
    market_crunch_hints: str = Field("Standard market entry hints.", description="Hints on what is usually done by sector actors to capture market share.")
    perceptual_map_axes: str = Field("Quality vs Price", description="The two axes defining the market (e.g., Premium vs Accessible, Traditional vs Innovative)")
    brand_coordinates: str = Field("High Quality / Premium Price", description="Where the brand sits on these axes")
    competitors: List[Competitor] = Field(default_factory=list)
    whitespace_opportunities: str = Field("Whitespace under review.", description="Where competitors are weak or silent")
    price_positioning: str = Field("Premium", description="Premium / mid / value and its advertising implications")
    swot_analysis: SWOT = Field(default_factory=lambda: SWOT(strengths=[], weaknesses=[], opportunities=[], threats=[]))
    swot_mitigation_strategy: str = Field("Standard mitigation.", description="Explain how each strength and weakness influences market positioning. Give hints on stylishly emphasizing strengths and mitigating weaknesses.")
    competition_resistance_hints: str = Field("Standard resistance.", description="Give hints on how to effectively resist and counter competition.")

# --- SECTION 5: Audience Intelligence ---
class EmpathyMap(BaseModel):
    think: str
    feel: str
    say: str
    do: str

class ICP(BaseModel):
    name: str = Field("General Persona")
    demographics: str = Field("Diverse demographics.", description="Age, location, occupation")
    motivations: str = Field("Quality and efficiency.", description="Goals, frustrations, motivations")
    persona_icp_fit: str = Field("Core audience fit.", description="Explain how this persona fits into the broader ICP required by the brand.")
    communication_hints: str = Field("Clear, benefit-driven value.", description="Hints on how specifically to communicate to this persona.")
    media_habits: str = Field("Digital first.", description="Media habits and platform preferences")
    purchase_triggers: str = Field("Value alignment.", description="Triggers and objections")
    preferred_content: str = Field("Educational and lifestyle.", description="Preferred content format")
    empathy_map: EmpathyMap = Field(default_factory=lambda: EmpathyMap(think="Quality", feel="Excited", say="I need this", do="Purchases"))

class AudienceIntelligence(BaseModel):
    icps: List[ICP] = Field(default_factory=list, description="3 to 5 fully developed Ideal Customer Profiles / Personas")
    audience_language_patterns: str = Field("Direct and clear.", description="Exact words the audience uses (mined or inferred)")
    buying_journey_stages: str = Field("Awareness to Advocacy.", description="Stages and what content fits each stage")

# --- SECTION 6: Product / Service DNA ---
class ValuePropositionCanvas(BaseModel):
    gains: List[str]
    pains: List[str]
    jobs_to_be_done: List[str]

class FeatureBenefit(BaseModel):
    feature: str = Field("Core Feature")
    benefit: str = Field("Core Benefit")
    emotional_outcome: str = Field("Positive Emotional Outcome")

class ProductDNA(BaseModel):
    value_canvas: ValuePropositionCanvas = Field(default_factory=lambda: ValuePropositionCanvas(gains=[], pains=[], jobs_to_be_done=[]))
    value_canvas_analysis: str = Field("Analysis pending.", description="Elaborate on Gains and Pains. Explain how these influence or spotlight the brand's image.")
    feature_mapping: List[FeatureBenefit] = Field(default_factory=list)
    commercial_translation_hints: str = Field("Standard translation.", description="Elaborate on Feature/Benefit mapping. Give hints on how to translate these into accessible commercial advertising language.")
    hero_product: str = Field("Primary Offering")
    pricing_psychology: str = Field("Value-based pricing.")
    proof_points: List[str] = Field(default_factory=list, description="Inventory of awards, testimonials, credentials")
    objection_map: List[str] = Field(default_factory=list, description="Common objections + counter-messages")

# --- SECTION 7: Campaign Intelligence ---
class CampaignIntelligence(BaseModel):
    top_objectives: List[str] = Field(default_factory=list, description="Top 5 recommended campaign objectives ranked by readiness")
    content_pillars: List[str] = Field(default_factory=list, description="3-5 content pillars with rationale")
    content_pillar_advice: str = Field("Actionable advice pending.", description="Elaborate on the chosen content pillars, giving actionable advice and hints on deployment.")
    platform_priority: str = Field("Digital First (LinkedIn/Instagram)", description="Platform ranking and why")
    creative_themes: List[str] = Field(default_factory=list, description="3 recommended campaign themes/territories")
    seasonal_opportunities: str = Field("Standard seasonal cycles.", description="Seasonal and cultural moment opportunities")

# --- SECTION 8: Confidence & Audit ---
class ConfidenceAudit(BaseModel):
    overall_score: int = Field(80, description="0-100 overall brand DNA confidence score")
    scoring_benchmark_explanation: str = Field("Standard scoring applied.", description="Elaborate on the scoring benchmark, why this score was attributed, and exactly how to upgrade the score.")
    data_quality_indicators: str = Field("Good quality signals.", description="Data source quality rating per source")
    identified_gaps: str = Field("Minimal gaps found.", description="What's missing and how it affects output quality")
    gap_resolution_strategy: str = Field("Ongoing enrichment recommended.", description="Elaborate on the identified gaps. Suggest explicit methods and actions to resolve them.")
    enrichment_actions: str = Field("Update signals periodically.", description="Recommended actions for the user to improve accuracy")

# --- SECTION 9: Methodology & Frameworks ---
class MethodologyFrameworks(BaseModel):
    frameworks_used: List[str] = Field(default_factory=lambda: ["Aaker", "SWOT", "AIDA"], description="List of frameworks leveraged in this analysis (e.g., Aaker, AIDA, SWOT)")
    framework_explanations: str = Field("Methodology based on standard agency frameworks.", description="Explain the reference benchmarks, case studies, and frameworks used to build this report, detailing why they matter.")

# --- MASTER MODEL ---
class MasterBrandDNA(BaseModel):
    foundation: BrandFoundation = Field(default_factory=BrandFoundation)
    visual: VisualSystem = Field(default_factory=VisualSystem)
    voice: VoiceProfile = Field(default_factory=VoiceProfile)
    positioning: MarketPositioning = Field(default_factory=MarketPositioning)
    audience: AudienceIntelligence = Field(default_factory=AudienceIntelligence)
    product: ProductDNA = Field(default_factory=ProductDNA)
    campaign: CampaignIntelligence = Field(default_factory=CampaignIntelligence)
    audit: ConfidenceAudit = Field(default_factory=ConfidenceAudit)
    methodology: MethodologyFrameworks = Field(default_factory=MethodologyFrameworks)

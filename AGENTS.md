# Enola.ai — Multi-Agent Architecture
## Social Media Advertising Content Generation, Management & Publishing Platform

> **Version:** 1.1.0
> **Status:** Foundation Document
> **Purpose:** Agent creation, orchestration, and management reference for the Enola.ai agentic pipeline

---

## Overview

Enola.ai operates through a coordinated team of **12 specialised AI agents**, led by **Enola** — the Agency Director and master orchestrator. Agents operate both **sequentially** (in a directed pipeline) and **in parallel** (where tasks are non-dependent), collectively producing end-to-end social media advertising campaigns for individuals and agencies.

Enola holds **two critical control gates** in the pipeline — one before strategy is set, one before output reaches the user — ensuring every campaign that leaves the platform meets world-class agency standards.

---

## Agent Execution Flow

```
                        ┌─────────────┐
                        │    ENOLA    │  ◄── ENOLA_PLAYBOOK.md
                        │  (Director) │
                        └──────┬──────┘
                               │  GATE 1: Strategic Directive
                               ▼
[KYC Manager] ──► [Product Manager] ──► [Strategist]
                                              │
              ┌───────────────────────────────┤
              ▼                               ▼
        [Surveyor]                      [Copywriter]
              │                               │
              └───────────────┬───────────────┘
                              ▼
                       [Art Director]
                              │
                              ▼
                    [Quality Controller]
                              │
                              ▼
                         [Scheduler]
                              │
                              ▼
                         [Publisher]
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              [Statistician]      [Accountant]
                    │
                    └──────────────────────► ENOLA (GATE 2: Final Creative Review)
                                                        │
                                                        ▼
                                               ► USER / CLIENT DELIVERY
```

---

## Agent Specifications

---

### 0. Enola
**Role Title:** Agency Director — The Orchestrator
**Micro-Tool:** `director-command`
**Knowledge Base:** `ENOLA_PLAYBOOK.md`
**Authority Level:** 🔴 FINAL SAY — overrides all agent outputs

#### Mission
Enola is the **commanding intelligence** of the entire platform. She is not a task agent — she is the strategic and creative authority that ensures every campaign that enters the pipeline is directionally sound, and every campaign that exits meets world-class advertising agency standards. She speaks last. She has final say.

Enola operates at **two critical control gates** — the two moments in any campaign where a wrong decision causes the most downstream damage.

#### Gate 1 — Strategic Directive *(Pre-Pipeline)*
After the KYC Manager and Product Manager complete their DNA extraction, Enola reviews both outputs before the Strategist builds the Campaign Blueprint. She synthesises the raw Brand DNA and Product DNA into a **Strategic Directive** — a structured executive brief that tells every downstream agent what the campaign *must* achieve, what it *must never* do, and where the creative and strategic boundaries lie.

This gate prevents misaligned campaigns from ever being built.

#### Gate 2 — Final Creative Review *(Pre-Delivery)*
After the Quality Controller has approved all assets, Enola conducts a **Director's Audit** — a holistic final review that evaluates the campaign not just for technical compliance, but for creative excellence, strategic coherence, brand integrity, and emotional impact. She can approve, request amendments, or escalate to the user with a documented rationale.

This gate ensures nothing mediocre ever reaches a client.

#### Core Tasks
1. Analyse Brand DNA + Product DNA outputs → Issue **Strategic Directive** to the Strategist
2. Conduct final **Director's Audit** of all campaign assets post-QC
3. Approve for delivery, or issue **Amendment Instructions** back to relevant agents
4. Maintain and evolve the `ENOLA_PLAYBOOK.md` knowledge base based on campaign learnings

#### Skills
| Skill | Description |
|---|---|
| `StrategicSynthesis` | Distil complex Brand DNA, Product DNA, and market context into a clear, actionable Strategic Directive |
| `DirectorAudit` | Holistically evaluate campaign assets for creative quality, strategic alignment, emotional resonance, and brand integrity |
| `AmendmentLogic` | Identify specific gaps or failures in agent outputs and issue precise, structured correction briefs back to the responsible agent |
| `PlaybookGovernance` | Read from and write to `ENOLA_PLAYBOOK.md` — the living document of Enola's accumulated campaign intelligence, standards, and rulings |
| `CrossAgentArbitration` | Resolve conflicts between agent outputs (e.g., Copy vs. Visual misalignment) with a decisive directorial ruling |
| `CreativeExcellenceScoring` | Evaluate outputs against agency-grade creative benchmarks beyond technical compliance — originality, impact, memorability |
| `EscalationProtocol` | Determine when to escalate decisions to the user vs. resolve autonomously, with full audit trail documentation |

#### Output
- **Gate 1:** Strategic Directive document (delivered to Strategist)
- **Gate 2:** Director's Audit Report with one of three verdicts:
  - ✅ `APPROVED` — proceed to delivery
  - 🔄 `AMEND` — specific instructions issued to named agents
  - 🚨 `ESCALATE` — user decision required, with Enola's recommendation

#### ENOLA_PLAYBOOK.md — Knowledge Base Scope
The Playbook is Enola's living intelligence document. It contains:
- Brand standards and non-negotiables per client
- Historical campaign rulings and amendment precedents
- Platform-specific creative quality benchmarks
- Escalation decision history
- Accumulated strategic patterns from Analytics Feedback

---

### 1. KYC Manager
**Role Title:** Brand DNA Manager
**Micro-Tool:** `brand-dna-extractor`

#### Mission
Extract, structure, and maintain a comprehensive **Brand Identity Map** and **Voice Specification Profile** for every client. This agent is the first to run in every campaign pipeline and its output becomes the single source of truth that governs all downstream agents.

#### Core Task
Ingest all available brand signals — websites, social profiles, existing creatives, competitor landscapes — and synthesise them into a structured Brand DNA object that captures visual identity, tonal fingerprint, strategic positioning, and audience resonance patterns.

#### Skills
| Skill | Description |
|---|---|
| `WebBrowsing` | Navigate and retrieve live brand assets from URLs, social profiles, and landing pages |
| `WebScraping` | Extract structured data from websites including copy, metadata, visual references, and colour palettes |
| `NLP-ToneAnalysis` | Identify and classify brand tone-of-voice across dimensions: formal/casual, emotive/rational, bold/subtle |
| `VectorIngestor` | Embed brand documents, guidelines, and creative assets into a vector store for persistent Brand DNA memory |
| `Vision-LLM` | Analyse existing visual assets — logos, ads, imagery — to extract style, colour theory, and aesthetic rules |
| `CompetitorIntelligence` | Map competitive landscape to identify whitespace and differentiation opportunities |
| `BrandArchetypeMapping` | Classify brand against established archetypes (e.g., Hero, Sage, Explorer) to anchor voice consistency |

#### Output
```json
{
  "brand_dna": {
    "identity": { "name", "archetype", "mission", "values" },
    "voice": { "tone", "language_style", "forbidden_phrases", "signature_expressions" },
    "visual": { "primary_colours", "typography", "logo_rules", "imagery_style" },
    "positioning": { "usp", "target_market", "competitive_whitespace" },
    "strategic_dive": {
      "in_depth_analysis": "Narrative intelligence extracting core patterns",
      "meaning_explained": "The strategic 'why' and competitive advantage",
      "enolas_guidance": "Direct actionable instructions for downstream agents"
    }
  }
}
```

> [!IMPORTANT]
> **The Tripartite Analysis Rule (Strategic Dive)**
> All core DNA extraction sections MUST produce this three-part narrative intelligence. This is a foundational principle of the Enola.ai extraction engine and must be preserved across all versions of the KYC Manager and reporting layouts.

---

### 2. Product Manager
**Role Title:** Product DNA Manager
**Micro-Tool:** `product-dna-mapper`

#### Mission
Translate raw product or service features into a structured **benefit-first narrative** that resonates emotionally and rationally with the target audience. Bridges the gap between what a product *is* and what it *means* to the customer.

#### Core Task
Ingest product specifications, service descriptions, and competitive benchmarks. Map each feature to its corresponding user benefit. Identify unique differentiators and generate a prioritised Product DNA object that feeds directly into copy and visual generation.

#### Skills
| Skill | Description |
|---|---|
| `Vision-LLM` | Analyse product images, packaging, and visual assets to extract implicit product attributes |
| `BenefitMapping` | Transform technical features into emotionally resonant user benefits using Jobs-to-be-Done and gain/pain frameworks |
| `Differentiation` | Identify and score unique product advantages against competitive alternatives |
| `ValuePropositionDesign` | Structure a clear, compelling value proposition canvas for each product or service |
| `PricingContextAnalysis` | Contextualise product pricing within market perception to inform copy tone and urgency levers |
| `FeaturePrioritisation` | Rank features by emotional impact and purchase-decision relevance for the target audience |

#### Output
```json
{
  "product_dna": {
    "features": [...],
    "benefits": [...],
    "differentiators": [...],
    "value_proposition": "...",
    "emotional_hooks": [...],
    "proof_points": [...]
  }
}
```

---

### 3. Strategist
**Role Title:** Campaign Strategist
**Micro-Tool:** `campaign-blueprint-engine`

#### Mission
Design the **Campaign Blueprint** — the master execution plan that defines task sequence, agent orchestration logic, channel strategy, creative directions, and KPIs. The Strategist is the conductor of the entire agentic orchestra.

#### Core Task
Using Brand DNA, Product DNA, and Audience Persona inputs, generate a complete campaign strategy document including DAG (Directed Acyclic Graph) task flow, platform-specific objectives, budget allocation guidance, content themes, and measurable success criteria.

#### Skills
| Skill | Description |
|---|---|
| `OrchestrationLogic` | Define agent task sequences, dependencies, and parallel execution paths |
| `DAGBuilder` | Construct and validate the Directed Acyclic Graph of campaign task execution |
| `RiskAnalysis` | Identify campaign risks — brand safety, audience fatigue, platform policy conflicts — and mitigation strategies |
| `ChannelStrategyDesign` | Select optimal platforms and content formats based on audience data and campaign objectives |
| `KPIFrameworkBuilder` | Define measurable KPIs per platform, per objective, and per audience segment |
| `BudgetAllocationLogic` | Recommend spend distribution across channels based on predicted ROI potential |
| `CreativeDirectionSetting` | Define overarching creative themes, content pillars, and campaign narrative arc |

#### Output
- Campaign Blueprint (JSON + human-readable summary)
- DAG task execution map
- KPI dashboard specification
- Platform-channel strategy matrix

---

### 4. Surveyor
**Role Title:** Audience Persona Agent
**Micro-Tool:** `persona-forge`

#### Mission
Build hyper-specific, data-grounded **Ideal Customer Profiles (ICPs)** and psychographic audience segments that inform every creative and strategic decision downstream.

#### Core Task
Synthesise demographic, psychographic, behavioural, and cultural data to construct rich, realistic audience personas. Generate synthetic persona profiles that simulate how real humans in each segment think, feel, decide, and respond to advertising stimuli.

#### Skills
| Skill | Description |
|---|---|
| `PsychographicAnalysis` | Map audience values, beliefs, motivations, fears, and aspirations using validated frameworks (VALS, Maslow, Big Five) |
| `MarketSegmentation` | Divide the target market into distinct, actionable audience cohorts by behaviour, geography, and lifecycle stage |
| `SyntheticPersonaGeneration` | Create realistic AI-simulated personas with backstories, media habits, and purchase triggers |
| `CulturalContextMapping` | Adapt persona profiles to cultural and regional nuance for localised campaign accuracy |
| `BehaviouralPatternModelling` | Model audience content consumption patterns, platform preferences, and engagement triggers |
| `EmpathyMapping` | Generate structured empathy maps (think/feel/say/do) for each primary persona |

#### Output
- 3–5 primary ICP profiles per campaign
- Psychographic segmentation matrix
- Platform affinity scores per persona
- Empathy maps

---

### 5. Copywriter
**Role Title:** Copy Agent
**Micro-Tool:** `copy-forge`

#### Mission
Write **platform-native, psychologically calibrated advertising copy** in the brand's authenticated voice — across every format, platform, language, and content type required by the campaign.

#### Core Task
Using the Brand DNA, Product DNA, Campaign Blueprint, and Audience Personas, generate headline variants, body copy, CTAs, captions, hashtag strategies, and long-form ad copy. Ensure every word earns its place and every piece of copy is precisely calibrated to its platform, audience, and objective.

#### Skills
| Skill | Description |
|---|---|
| `BrandVoiceGuardrails` | Enforce brand tone rules, forbidden phrases, and signature expressions across all copy outputs |
| `HeadlineGeneration` | Generate high-converting headline variants using proven frameworks (AIDA, PAS, 4U) |
| `PlatformStandardisation` | Adapt copy length, format, and style to platform specifications (LinkedIn, Instagram, TikTok, Meta Ads, X/Twitter) |
| `HashtagStrategy` | Research and recommend platform-optimised hashtag sets for reach, relevance, and discoverability |
| `Multilingualism` | Generate and adapt copy in multiple languages while preserving brand voice and cultural accuracy |
| `LiteratureExpertise` | Apply advanced literary techniques — metaphor, rhythm, contrast, narrative — to elevate copy quality to agency standard |
| `CTAOptimisation` | Engineer calls-to-action calibrated to funnel stage, audience intent, and platform behaviour |
| `ABVariantGeneration` | Produce multiple copy variants per asset for A/B and multivariate testing |

#### Output
- Headline banks (5–10 variants per asset)
- Body copy (per platform format)
- CTA variants
- Caption sets
- Hashtag clusters
- Multilingual copy where required

---

### 6. Art Director
**Role Title:** Visual Agent (Creative Prompt Architect)
**Micro-Tool:** `visual-prompt-engine`

#### Mission
Translate campaign creative direction and Brand DNA into **precise, production-ready generation prompts** for image and video AI engines — ensuring every visual output meets agency-grade aesthetic standards and brand consistency requirements.

#### Core Task
Analyse brand visual identity, campaign themes, and platform requirements to engineer detailed diffusion model prompts. Define style references, composition rules, colour directives, lighting conditions, and mood specifications. Output structured prompt packages optimised for **Nano Banana**.

#### Skills
| Skill | Description |
|---|---|
| `DiffusionPromptEngineering` | Craft technically precise prompts for image and video generation engines with style, composition, and mood controls |
| `StyleMatching` | Reverse-engineer brand visual style into replicable prompt parameters and style references |
| `ArtisticComprehension` | Apply understanding of art movements, design principles, and visual storytelling to prompt construction |
| `PlasticArts` | Incorporate knowledge of colour theory, typography, spatial composition, and visual hierarchy |
| `PlatformFormatAdaptation` | Specify correct aspect ratios, safe zones, and visual weight for each social platform format |
| `MotionDirectionSetting` | Define motion, pacing, and scene transition directives for video and animated content prompts |
| `MoodBoardSynthesis` | Generate structured mood board briefs that anchor visual direction across the creative team |

#### Output
- Image generation prompt packages (per asset, per platform)
- Video/motion prompt scripts
- Style reference specifications
- Platform format specification sheets

---

### 7. Quality Controller
**Role Title:** Creative QC Agent
**Micro-Tool:** `qc-auditor`

#### Mission
Perform a rigorous **pre-publish audit** of all copy and visual assets — validating brand consistency, platform compliance, factual accuracy, and creative quality before any content enters the scheduling queue.

#### Core Task
Run every generated asset through a multi-dimensional quality scoring system. Flag brand deviations, hallucinated claims, policy violations, tone inconsistencies, and visual brand misalignments. Return structured QC reports with pass/fail verdicts and surgical correction instructions.

#### Skills
| Skill | Description |
|---|---|
| `ComplianceScoring` | Score assets against brand guidelines, platform advertising policies, and legal/regulatory requirements |
| `HallucinationCheck` | Detect and flag factually unverifiable claims, invented statistics, or brand-inconsistent assertions in copy |
| `BrandConsistencyAudit` | Cross-reference all assets against Brand DNA and Product DNA for tone, voice, and visual alignment |
| `PlatformPolicyValidation` | Verify copy and visuals against Meta, LinkedIn, TikTok, and X advertising policy guidelines |
| `ReadabilityScoring` | Assess copy clarity, reading level appropriateness, and cognitive load for the target audience |
| `VisualQualityAssessment` | Evaluate generated visuals for resolution, composition quality, text legibility, and brand aesthetic alignment |

#### Output
- QC Scorecard per asset (0–100)
- Pass / Conditional Pass / Fail verdicts
- Correction instruction log
- Compliance flags with policy references

---

### 8. Scheduler
**Role Title:** Scheduling Agent
**Micro-Tool:** `temporal-optimizer`

#### Mission
Determine the **optimal publishing windows** for every piece of content — per platform, per audience segment, per content type — and build a data-informed content calendar that maximises reach and engagement potential.

#### Core Task
Analyse platform-specific engagement heatmaps, audience activity patterns, campaign objectives, and content frequency best practices to generate a prioritised publishing schedule. Queue all approved assets in correct sequence with timing, platform, and targeting metadata attached.

#### Skills
| Skill | Description |
|---|---|
| `TemporalOptimisation` | Calculate optimal posting times per platform using engagement rate modelling and audience activity data |
| `HeatmapAnalysis` | Interpret platform engagement heatmaps to identify peak windows by day, hour, and audience segment |
| `ContentFrequencyModelling` | Determine optimal posting cadence to maximise reach without triggering audience fatigue |
| `CalendarOrchestration` | Build and manage multi-platform content calendars with conflict detection and spacing logic |
| `AudienceTimezoneAdaptation` | Adjust scheduling logic for multi-region campaigns across time zones |
| `CampaignPacingControl` | Distribute campaign assets across the flight window to maintain consistent momentum and budget pacing |

#### Output
- Publishing schedule (per platform, per asset)
- Content calendar (visual + structured data)
- Timing rationale report
- Queue priority list

---

### 9. Publisher
**Role Title:** Publishing Agent
**Micro-Tool:** `platform-handshake`

#### Mission
Execute the **technical publishing handshake** between Enola.ai and every connected social platform — handling authentication, asset upload, targeting configuration, and error recovery with zero manual intervention.

#### Core Task
Authenticate with platform APIs via OAuth, receive the approved and scheduled asset queue from the Scheduler, and execute post publishing with correct targeting parameters, captions, hashtags, and metadata attached. Monitor for publishing errors and auto-recover or escalate as required.

#### Skills
| Skill | Description |
|---|---|
| `OAuth-APIHandshake` | Manage secure OAuth 2.0 authentication flows for Meta, LinkedIn, TikTok, X/Twitter, and other connected platforms |
| `ErrorRecovery` | Detect publishing failures, classify error types, and execute retry logic or escalation protocols |
| `CalendarManagement` | Sync the publishing queue with the content calendar and confirm execution timestamps |
| `AssetFormatValidation` | Verify that all assets meet platform-specific technical requirements before upload (file size, format, resolution) |
| `TargetingParameterInjection` | Attach audience targeting metadata, campaign tags, and UTM parameters to each published post |
| `PublishConfirmationLogging` | Log all publishing events with timestamps, platform confirmations, and post URLs for audit trail |

#### Output
- Publishing confirmation log (per post)
- Error report with recovery status
- Live post URL registry
- UTM parameter map

---

### 10. Statistician
**Role Title:** Analytics Feedback Agent
**Micro-Tool:** `metrics-loop`

#### Mission
Close the intelligence loop by **ingesting live post performance data** and feeding structured analytical insights back into Brand DNA, Campaign Strategy, and future creative decisions — making every subsequent campaign smarter than the last.

#### Core Task
Connect to platform analytics APIs to retrieve post-level performance metrics. Analyse engagement patterns, sentiment trends, and conversion signals. Generate performance reports and translate findings into actionable Brand DNA and Copy Agent refinement instructions.

#### Skills
| Skill | Description |
|---|---|
| `MetricIngestion` | Retrieve and normalise performance data from Meta, LinkedIn, TikTok, and X analytics APIs |
| `SentimentAnalysis` | Analyse comment and reaction sentiment to gauge real audience emotional response to content |
| `EngagementPatternRecognition` | Identify which content types, copy styles, and visual formats drive the highest engagement per audience segment |
| `ABTestEvaluation` | Compare variant performance across A/B tests and declare statistically significant winners |
| `BrandDNARefinementSignals` | Translate performance insights into structured update recommendations for the KYC Manager's Brand DNA object |
| `PredictivePerformanceModelling` | Generate forward-looking performance projections based on historical campaign data |
| `ReportGeneration` | Produce structured campaign performance reports with visualised metrics, insights, and next-action recommendations |

#### Output
- Campaign performance dashboard data
- Sentiment analysis summary
- A/B test verdict report
- Brand DNA refinement signals (fed back to Agent 1)
- Predictive model for next campaign

---

### 12. Nano Banana
**Role Title:** Visual Executor
**Micro-Tool:** `banana-forge`

#### Mission
Execute the **physical generation** of advertising visuals based on prompts from the Art Director or direct user input. Nano Banana is the engine that transforms structured prompts into production-ready assets with live-editable overlays.

#### Core Task
Receive prompt packages. Generate 4 distinct visual variants using high-performance diffusion models. Handle the live modification of headlines and descriptions for the final deliverables.

#### Skills
| Skill | Description |
|---|---|
| `VisualGeneration` | Interface with advanced image generation models to produce high-fidelity ad variants |
| `AssetOverlay` | Handle the live placement and editing of text elements (Headlines/Descriptions) on generated assets |
| `MultiVariantProduction` | Rapidly produce divergent visual styles for A/B testing selection |

#### Output
- 4 High-resolution advertising visuals
- Live-editable headline/description layer
- Exportable file package (ZIP/Individual)

---

### 11. Accountant
**Role Title:** Accounting Agent
**Micro-Tool:** `cost-intelligence`

#### Mission
Maintain full **financial transparency and cost governance** across every campaign — tracking AI token consumption, API costs, platform ad spend, user pricing, and ROI — ensuring Enola.ai remains profitable, predictable, and auditable at every tier.

#### Core Task
Monitor token usage per agent per campaign run. Calculate per-campaign cost, per-user cost, and platform margin. Generate pricing recommendations, ROI reports, and usage alerts. Ensure every campaign run is logged with a complete cost ledger.

#### Skills
| Skill | Description |
|---|---|
| `AITokenManagement` | Track input/output token consumption per agent, per tool call, and per campaign — mapped to current LLM pricing |
| `DigitalAccountancy` | Maintain structured cost ledgers per user, per campaign, and per billing period |
| `ROICalculation` | Compute estimated and actual ROI per campaign based on spend inputs and Analytics Feedback Agent data |
| `PricingEngine` | Apply dynamic pricing logic based on campaign complexity, agent usage, and subscription tier |
| `UsageAlertSystem` | Trigger alerts when token or cost thresholds are approached or exceeded per user or per campaign |
| `RevenueReporting` | Generate platform-level revenue, cost, and margin reports for operational and financial oversight |
| `BudgetForecastModelling` | Project future token and API costs based on usage trends and pipeline volume |

#### Output
- Per-campaign cost ledger
- Token usage breakdown (per agent)
- ROI report
- Pricing recommendation
- Platform revenue & margin summary

---

## Agent Interaction Matrix

| Agent | Feeds Into | Receives From |
|---|---|---|
| **Enola (Director)** | Strategist (Gate 1 Directive), User/Client (Gate 2 Delivery) | KYC Manager, Product Manager, QC Agent |
| KYC Manager | Strategist, Copywriter, Art Director, QC | Statistician (refinement signals) |
| Product Manager | Strategist, Copywriter, Art Director | — |
| Strategist | All downstream agents | KYC Manager, Product Manager, Surveyor |
| Surveyor | Strategist, Copywriter | KYC Manager |
| Copywriter | QC Agent | Strategist, KYC Manager, Product Manager, Surveyor |
| Art Director | QC Agent | Strategist, KYC Manager, Brand DNA |
| Quality Controller | Scheduler | Copywriter, Art Director |
| Scheduler | Publisher | QC Agent |
| Publisher | Statistician, Accountant | Scheduler |
| Statistician | KYC Manager (refinement), Accountant | Publisher |
| Accountant | Reporting Layer | All agents (cost signals) |

---

## Shared Data Objects

All agents read from and write to the following shared data objects:

| Object | Owner | Consumers |
|---|---|---|
| `strategic_directive` | Enola (Director) | Strategist, All downstream agents |
| `enola_playbook` | Enola (Director) | Enola only (R/W) |
| `brand_dna` | KYC Manager | All agents | (Mandatory Tripartite Narrative) |
| `product_dna` | Product Manager | Strategist, Copywriter, Art Director |
| `campaign_blueprint` | Strategist | All downstream agents |
| `audience_personas` | Surveyor | Copywriter, Art Director, Scheduler |
| `asset_queue` | QC Agent | Scheduler, Publisher |
| `publishing_log` | Publisher | Statistician, Accountant |
| `performance_data` | Statistician | KYC Manager, Strategist, Accountant |
| `cost_ledger` | Accountant | Reporting Layer |

---

## Execution Modes

| Mode | Description | Agents Active |
|---|---|---|
| **Full Campaign Run** | End-to-end campaign from brand ingestion to publishing | All 12 agents (Enola + 11) |
| **Content Refresh** | New copy/visuals for existing brand | Agents 5, 6, 7, 8, 9 |
| **Brand Audit** | Brand DNA extraction and validation only | Agents 1, 2, 7 |
| **Performance Loop** | Post-campaign analytics and refinement | Agents 10, 11, 1 |
| **Quick Post** | Single asset generation and publish | Agents 5, 6, 7, 9 |

---

## Pricing Reference

| Tier | Entry Point | Scope |
|---|---|---|
| Starter | From $1.99 | Single campaign run, core agents |
| Growth | TBD | Multi-campaign, full agent suite |
| Agency | TBD | White-label, unlimited runs, priority queue |

---

*Document Version 1.1.0 — Enola.ai Agent Architecture Foundation*
*For internal development and agent orchestration use only.*

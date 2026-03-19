# Gravity.ai — AI Agent Roster

This document defines the specialized autonomous agents that power the Gravity.ai campaign engine. All agents are built using **Google Genkit Flows** and are orchestrated by the **Campaign Strategist Agent**.

---

## 🏛️ Strategic Layer (The Brain)

### 1. Brand DNA Agent
*   **Role**: Extracts the "Soul" of the brand from raw data.
*   **Tools/Skills**: `WebScraperTool` (Puppeteer), `DocumentParser` (PDF/Docx), `ToneAnalyzer` (NLP), `VectorIngestor`.
*   **Input**: URLs, brand guidelines, manifesto notes, logo/visual assets.
*   **Output**: Structured **Brand Identity Map** (voice specs, visual style guide, core values).

### 2. Product DNA Agent
*   **Role**: Maps product features to user benefits and "Killer Claims."
*   **Tools/Skills**: `Featureextractor` (Vision-LLM), `BenefitMapper`, `CompetitiveDifferentiator`.
*   **Input**: Product shots, feature lists, landing pages, raw product demos.
*   **Output**: **Product DNA Map** (value proposition, primary claims, technical specs).

### 3. Campaign Strategist Agent
*   **Role**: The "Project Manager" of the swarm. Orchestrates all other agents.
*   **Tools/Skills**: `OrchestrationLogic`, `DAGBuilder` (Directed Acyclic Graph), `ConstraintValidator`.
*   **Input**: User Objectives + Brand DNA + Product DNA.
*   **Output**: **Campaign Blueprint** (task list for other agents with priority and parallel paths).

---

## 🎨 Creative Layer (The Muscle)

### 4. Audience Persona Agent
*   **Role**: Generates hyper-specific target personas for the campaign.
*   **Tools/Skills**: `MarketSegmentation`, `PsychographicProfiler`, `PainPointSynthesis`.
*   **Input**: Campaign Objectives + Brand DNA.
*   **Output**: **User Personas** (detailed "Ideal Customer" profiles with triggers and objections).

### 5. Copy Agent
*   **Role**: Writes platform-native copy in the brand's voice.
*   **Tools/Skills**: `BrandVoiceGuardrails`, `HeadlineGenerator`, `MultivariateVariantTool`.
*   **Input**: Brand Voice Specs + Persona + Campaign Strategy.
*   **Output**: **Copy Repository** (multiple variants of headlines, body text, and CTAs).

### 6. Visual Direction Agent
*   **Role**: Translates copy and strategy into descriptive visual prompts.
*   **Tools/Skills**: `DiffusionPromptEngineer`, `CompositionDesigner`, `StyleReferenceMatcher`.
*   **Input**: Copy Variants + Brand Style Guide.
*   **Output**: **Visual Direction Briefs** (prompts for image/video generation engines).

---

## ⚙️ Operations Layer (The Engine)

### 7. Creative QA Agent
*   **Role**: Acts as the "Final Editor" before human review.
*   **Tools/Skills**: `HallucinationChecker`, `ComplianceValidator`, `StyleConsistencyScorer`.
*   **Input**: Agent Outputs vs. Original Brand/Campaign Context.
*   **Output**: **QA Report** (Pass/Fail with specific refactoring notes for agents).

### 8. Channel Adaptation Agent
*   **Role**: Optimizes creative for specific social platform constraints.
*   **Tools/Skills**: `CharacterCountEnforcer`, `HashtagStrategist`, `PlatformUIPreviewer`.
*   **Input**: Creative Assets + Target Channels (X, LinkedIn, Meta).
*   **Output**: **Platform-Ready Variants** (sized and formatted for specific networks).

---

## 🚀 Execution Layer (The Hand-off)

### 9. Scheduler Agent
*   **Role**: Determines the high-probability timing for each post.
*   **Tools/Skills**: `TemporalOptimizer`, `HeatmapAnalysis`, `CalendarSync`.
*   **Input**: Audience Personas + Platform Metrics.
*   **Output**: **Posting Schedule** (time-stamped queue of all campaign content).

### 10. Publisher Agent
*   **Role**: Handles the technical API handshakes to push content live.
*   **Tools/Skills**: `OAuthManager`, `APIHandler` (X, Meta, LI), `ErrorRecoveryLogic`.
*   **Input**: Platform-Ready Variants + Approved Post Time.
*   **Output**: **Publication Confirmation** (Deep-links to live posts).

### 11. Analytics Feedback Agent
*   **Role**: Closes the loop. Ingests raw metrics and "Teaches" the brain.
*   **Tools/Skills**: `MetricIngestion`, `SentimentAnalysis`, `CorrelationEngine`.
*   **Input**: Live Post Metrics (likes, shares, clicks).
*   **Output**: **Insight Feed** (informs the Brand DNA and Strategist for the next "Wave").

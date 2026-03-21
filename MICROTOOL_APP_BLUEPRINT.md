# Enola.ai — Microtool App Creation Blueprint
## High-Performance Standalone Agency Services ($1.99 One-Shot Model)

> **Version:** 1.0.0
> **Status:** Standard
> **Purpose:** Standardising the creation of unbundled, high-margin, professional-grade agency tools.

---

## The 5-Phase Agency Pillar Approach

Every microtool created for Enola.ai must be treated as an **independent Standalone Application** with a unique "Universe" and specialized logic.

### Phase 1: Specialized Ingestion (The Terminal)
**Purpose:** Guide the user through a "Consultancy Session" that guarantees elite results.
- **Logical Multi-Step Flow:** Do NOT use one long form. Use 3-4 logical steps (e.g. Identity -> Narrative -> Ecosystem) to simulate a professional agency interview.
- **Main Identifiers (Mandatory):** Core signals required for the Agentic Engine.
- **Value Enrichers (Professional Optimization):** URLs, image uploads (logos), and strategic seeds.
- **UI Standard:** Premium industrial-dark mode with step-tracking indicators. Specialized inputs: Selects, Multi-URL lists, and Terminal-grade uploads.

### Phase 2: Agentic Reasoning (The Engine)
**Purpose:** Execute laser-calibrated logic using specialized LLM chains (Agents 1-12).
- **Models:** Use Pydantic models for structured, valid outputs.
- **Backend Class:** Every app must have a dedicated Python `Chain` (e.g., `KYCChain`, `BananaChain`).
- **Cost Efficiency:** Targets ~90-99% gross margins using Gemini 2.0 Flash for reasoning.

### Phase 3: Intelligence Visualizer (The Reasoning UX)
**Purpose:** Visualizing "Agent Intelligence" so the user sees the work being done.
- **Real-Time Feedback:** Status bars for "Analyzing Tone," "Cross-Referencing Markets," or "Mapping Visual DNA."
- **Professional Layout:** 1:3 ratio (25% Input Terminal | 75% Visualizer Output).

### Phase 4: Artifact Generation (The Deliverable)
**Purpose:** Provide the "Contractor-Grade" final product.
- **Format:** High-end digital artifacts (Professional PDFs, ZIP packages, Structured Copy Decks).
- **Download CTA:** Clear, prominent actions to retrieve the finished deliverable.

### Phase 5: Financial Auditing (The Margin Layer)
**Purpose:** Continuous profitability monitoring for the $1.99 transaction.
- **Accountant Sync:** Every run must be logged via the **Agent 11 (Accountant)** for real-time cost-per-run (CPR) and profit auditing.

---

## Directory Structure
- **Frontend:** `src/app/apps/[app-name]/page.tsx` (Dedicated Independent Route)
- **Backend Logic:** `backend/logic/[agent_name]_chain.py`
- **Output Models:** `backend/models/[agent_name].py`
- **MCP Integration:** Register tools in `backend/main.py` for direct client access.

---

## The $1.99 Promise
A user who pays $1.99 for a "Brand DNA Manifest" or a "Copy Deck" should feel like they just hired a human agency for $500. The UI must be professional, the inputs must be thorough, and the output must be impeccable.

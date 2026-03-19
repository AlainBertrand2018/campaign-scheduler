# Gravity.ai — Engine Process Hierarchy

This document outlines the workflow stages, user intervention points, and technical orchestration between Human input and the AI Agent Swarm.

---

## 🏗️ Phase 1: Sign-Up & Onboarding (The Foundation)
**Goal**: Build the "Long-Term Memory" of the user and company.

1.  **User Identity**:
    *   Capture: Full Name, Email, Phone, Role/Position.
    *   Company Metadata: Name, Legal Entity, Headquarters.
2.  **Global Brand Sync**:
    *   URLs: Website, Linktree, Social Profiles.
    *   Assets: Brand Guidelines (PDFs), Logos (PNG/SVG).
    *   *Trigger*: **Brand DNA Agent** ingests these and stores the Brand Identity Map in Firestore.

---

## 🏗️ Phase 2: Campaign Context Initialization (The Blueprint)
**Goal**: Define a specific "Wave" (Campaign) on top of the foundation.

1.  **Project Parameters**:
    *   Title, Objectives (KPIs), Target Duration.
2.  **Asset Provisioning**:
    *   Upload campaign-specific assets (Product shots, demo videos).
    *   *Trigger*: **Product DNA Agent** analyzes these specific assets to map "Killer Claims" for *this* campaign.
3.  **Human Direction**:
    *   User-defined tone variations (e.g., "Highly aggressive for Q4" or "Soft educational launch").

---

## 🏗️ Phase 3: AI Swarm & Task Orchestration (The Engine)
**Goal**: Autonomous execution of the campaign blueprint.

Once Step 2 is complete, the **Campaign Strategist Agent** takes over.

### Execution DAG (Directed Acyclic Graph):

1.  **Strategist Initialization**: Generates a JSON "Blueprint" containing a task list.
2.  **Parallel Persona Genesis**: **Audience Persona Agent** creates 3-5 hyper-specific segments.
3.  **Creative Synthesis**:
    *   **Copy Agent** writes variants for each persona.
    *   **Visual Direction Agent** designs prompts matching the copy.
4.  **Operational Refinement**:
    *   **Creative QA** validates every output against Brand DNA (Step 1).
    *   **Channel Adaptation Agent** reformats the "Winners" for X, LinkedIn, and Meta.
5.  **Human Review Intercept**: The engine pauses at a "Pending Approval" state.

---

## 🏗️ Phase 4: Execution & Feedback Loop (The Hand-off)
**Goal**: Pushing live and learning from results.

1.  **Scheduling**: **Scheduler Agent** calculates "Peak Engagement Windows."
2.  **Publication**: **Publisher Agent** executes the OAuth API handshake to push content live.
3.  **Intelligence Ingestion**: **Analytics Feedback Agent** monitors post performance for 7 days.
    *   *Refinement*: Metrics are fed back into the **Brand & Product DNA Maps** to "teach" the brain what works for the next campaign.

---

## 🔧 Technical State Hierarchy (Persistence)

1.  **Level 1: `Users` (Collection)**: Basic profile.
2.  **Level 2: `Brands` (Collection)**: Brand DNA, guidelines, long-term memory.
3.  **Level 3: `Campaigns` (Collection)**: Campaign context, specific assets, strategist blueprint.
4.  **Level 4: `AgentExecutions` (Sub-collection)**: Raw logs of what each agent did, input/output tokens, and PASSED/FAILED QA status.

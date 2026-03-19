# Project Architecture: AI Campaign Scheduler SaaS

## 1. Multi-Agent Ecosystem (Genkit)
The system is built as a set of specialized, interoperable agents defined as Genkit Flows.

### Strategic Agents
*   **Brand DNA Agent**: Analyzes URLs, PDF docs, and manual notes to extract reusable voice, visual style, and audience cues.
*   **Product DNA Agent**: Analyzes product features to derive positioning and key claims.
*   **Campaign Strategist Agent**: Orchestrates overall narrative, key messages, and channel selection based on the combined DNAs.

### Creative Agents
*   **Audience Persona Agent**: Generates detailed target personas for specific campaigns.
*   **Channel Adaptation Agent**: Transforms a campaign strategy into platform-specific content briefs.
*   **Copy Agent**: Generates multiple variant options (short, long, emoji-heavy, professional).
*   **Visual Direction Agent**: Produces descriptive prompts for image generation engines.

### Operations Agents
*   **Creative QA Agent**: Checks alignment against the original Brand DNA and Campaign Objectives before manual review.
*   **Scheduler & Publisher Agent**: Manages the queue and handles platform API handshakes (X, LinkedIn, Meta).
*   **Analytics Feedback Agent**: Ingests performance logs and informs future campaign waves.

---

## 2. Core Modules
1.  **Brand & Product Onboarding**: Step-by-step wizard for building "DNA Memory."
2.  **Campaign Discovery**: A multi-step form to set objectives, audience, and channels.
3.  **Content Studio**: Workspace to view agent outputs, edit copy, and regenerate visuals.
4.  **Publishing Calendar**: Drag-and-drop interface for scheduling content.
5.  **Analytics Hub**: High-level dashboard for multi-channel performance tracking.

---

## 3. Tech Stack Details
*   **Framework**: Next.js 16 (App Router) + Turbopack.
*   **Agent Orchestration**: Google Genkit (JS SDK) using Gemini 2.5 Pro/Flash.
*   **Database**: PostgreSQL with Prisma (planned for persistence).
*   **State Management**: React Context / Zustand for dashboard state.
*   **Styling**: Modern, premium UI utilizing CSS Variables and a custom Design System.
*   **Background Jobs**: Planned using BullMQ or similar for publishing and long-running AI generation.

---

## 4. Python Microservice Boundaries
While the core orchestration is in Next.js/Genkit (TypeScript), Python services are reserved for heavy compute and specific data science tasks:

*   **Media Processing Service (Python/FastAPI)**:
    - Image generation with custom LoRA (Stable Diffusion / Flux).
    - Video synthesis (Viggle / Runway integration).
    - Brand-asset vector injection for customized creative outputs.
*   **Analytics Ingestion Engine (Python/Pandas)**:
    - Scraping and processing raw social metrics from platform webhooks.
    - Anomaly detection in campaign performance.
    - Feedback-loop weight adjustment (reinforcement learning for future strategies).

---

## 5. Publishing Adapter Interface (Next.js)
The TypeScript layer defines a pluggable interface for each social network:

```typescript
export interface PlatformAdapter {
  platform: string; // instagram, x, linkedin
  authType: 'oauth2' | 'apiKey';
  publish: (content: ContentVariant) => Promise<PublishResult>;
  verify: (postId: string) => Promise<boolean>;
  getMetrics: (postId: string) => Promise<AnalyticsMetrics>;
}
```

---

## 6. Implementation Status (Phase 1)
- [x] Next.js 16 Bootstrap & Configuration
- [x] Shared TypeScript Schemas & Zod validation
- [x] Initial Genkit Flow Definitions (Strategist, DNA, Copy)
- [x] Project Folder Structure Setup
- [x] Premium Dashboard & Onboarding Skeleton
- [ ] Database Implementation (Prisma/PostgreSQL)
- [ ] Python Microservice API Integration
- [ ] Real-time Agent Log Webhooks
- [ ] Production Deployment Config

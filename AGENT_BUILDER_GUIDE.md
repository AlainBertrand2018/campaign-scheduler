# ENOLA.AI — Foundational Agent Building Guide

This document defines the high-standard, cross-platform protocol for building the ENOLA.AI agent swarm. All agents must follow this **Python + Pydantic + MCP + Genkit** architecture to ensure "Agency-Grade" precision.

---

## 🏛️ 1. The Core Stack

### **🧠 The Thinking Layer (Python)**
*   **`Pydantic`**: Used to define strict, non-negotiable data schemas. ALL agent outputs must be validated by a Pydantic Model before being released.
*   **`LangChain / PydanticAI`**: Used for building complex reasoning chains, self-correction loops, and persona-driven multi-step thinking.
*   **`MCP SDK`**: The "Model Context Protocol" bridges the Python reasoning to the TypeScript frontend. Each agent skill is exposed as a high-performance **MCP Tool**.

### **⚡ The Orchestration Layer (TypeScript)**
*   **`Google Genkit`**: The "Central Nervous System." Genkit manages the overall FLOW of the campaign, connecting multiple agent tools into a single DAG (Directed Acyclic Graph).
*   **`MCP Client`**: Automatically discovers and authenticates with the Python MCP servers.
*   **`Next.js / Zod`**: Provides the reactive UI (The OS Dashboard) and ensures the frontend is perfectly typed with the Python output.

---

## 🛠️ 2. The 5-Step Agent Creation Workflow

Each agent in the swarm (Enola, DNA, Strategist, etc.) follows this standardized creation path:

### **Step 1: Schema Definition**
Define the input/output schemas in both **Pydantic** (Python) and **Zod** (TypeScript).
*   **File Location**: `backend/models/[agent_name].py` and `src/lib/agents/definitions.ts`.

### **Step 2: The Playbook (The "Soul")**
Create a detailed Markdown "Playbook" that defines the agent's unique persona, voice directives, and quality benchmarks.
*   **File Location**: `[AGENT_NAME]_PLAYBOOK.md`.

### **Step 3: Reasoning Implementation**
Build the agent's logical chain in Python. This includes:
*   Reasoning/Synthesis logic.
*   Tool-calling (if the agent needs external data).
*   Strict formatting of the Pydantic output.
*   **File Location**: `backend/logic/[agent_name]_chain.py`.

### **Step 4: The MCP Interface**
Register the reasoning logic as a tool in the agent's MCP server.
*   **File Location**: `backend/[agent_name]_mcp.py`.

### **Step 5: Genkit Flow Integration**
Register the MCP server in `genkit.config.ts` and define the high-level Genkit Flow to consume the tool.
*   **File Location**: `src/lib/agents/[layer]/[agent_name].ts`.

---

## 📜 3. Foundational Rules
1.  **Strict Typing**: NO "vanilla" LLM responses. Every response MUST be structured against a Pydantic model.
2.  **No Hallucinations**: Every agent must check its output against its **Playbook** standards before returning.
3.  **Auditability**: Every agent step must be traceable via Genkit's trace logging system.
4.  **Decoupling**: Business logic stays in Python; UI and Flow Orchestration stay in TypeScript.
5.  **Google AI Native**: All agents MUST use the **Gemini Model Family** (Flash, Pro, or 8B tiering).
6.  **Context Discipline**: Never pass the full Brand DNA to an agent; slice and inject only the relevant context for the task.

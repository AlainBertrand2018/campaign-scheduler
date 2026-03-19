# Gravity.ai — Python Strategic Engine (2026 Shift)

This backend houses the **DNA Architect** and high-reasoning strategic agents that utilize the **Google GenAI Unified SDK**.

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Environment:**
   Ensure `GEMINI_API_KEY` is set in the root `.env` file.

3. **Run the DNA Architect (Simulation):**
   ```bash
   python dna_architect.py
   ```

## 🤝 The Genkit Handshake
The `dna_architect.py` script extracts structured brand DNA from a URL and prepares a **Handshake JSON**. This JSON is the primary contract that should be posted to your Next.js/Genkit endpoints for copy and creative generation.

- **Strategist Model:** `gemini-3-pro-latest`
- **Extraction Model:** `gemini-3-flash-latest`

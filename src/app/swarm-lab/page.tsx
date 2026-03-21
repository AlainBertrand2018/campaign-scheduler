'use client';

import React, { useState } from 'react';
import { BrandDNAVisualizer } from '@/components/swarm/visualizers/BrandDNAVisualizer';
import { ProductMapperVisualizer } from '@/components/swarm/visualizers/ProductMapperVisualizer';
import { StrategyBlueprintVisualizer } from '@/components/swarm/visualizers/StrategyBlueprintVisualizer';
import { NanoBananaVisualizer } from '@/components/swarm/visualizers/NanoBananaVisualizer';
import { CopywriterVisualizer } from '@/components/swarm/visualizers/CopywriterVisualizer';
import './swarm-lab.css';

export default function SwarmLab() {
    const [activeAgent, setActiveAgent] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [manualInput, setManualInput] = useState<string>("");

    // MOCK DATA for visual assessment (to be replaced with actual Genkit flow calls)
    const mockData: Record<number, any> = {
        1: {
            identity: { name: "Enola.ai", archetype: "The Magician", mission: "To automate creativity through agentic swarms.", values: ["Intelligence", "Speed", "Agency-Grade"] },
            voice: { tone: "Professional & Precise", language_style: "Commanding yet collaborative", forbidden_phrases: ["maybe", "standard", "average"] },
            visual: { primary_colours: ["#0a0a0c", "#6366f1", "#ffffff"], typography: ["Outfit", "Inter"], imagery_style: "Glassmorphism, dark-mode, neon accents" },
            positioning: { usp: "The world's first fully autonomous ad agency.", target_market: "Growth-stage tech startups" }
        },
        2: {
            features: ["12 Specialized AI Agents", "MCP Tool Integration", "Genkit Flow Management"],
            benefits: ["Eliminate 90% of manual ad management overhead.", "Access specialized domain knowledge instantly.", "Deploy complex campaigns across 5 platforms via one dashboard."],
            differentiators: ["Agentic reasoning over simple templating.", "Bi-directional feedback loops between agents."],
            value_proposition: "Enola transforms your brand DNA into a multi-platform advertising machine in seconds.",
            emotional_hooks: ["Reclaim your time.", "Out-think your competitors.", "Scale without hiring more staff."],
            proof_points: ["Built on Gemini 1.5 Pro architecture.", "Zero manual intervention from brief to post."]
        },
        3: {
            campaign_name: "The Autonomous Dawn",
            objectives: ["Drive 500 LinkedIn demo bookings.", "Increase brand recognition within AI startup circles by 40%."],
            channels: ["LinkedIn", "Meta Ads", "TikTok", "X"],
            overarching_narrative: "You don't need an agency. You need a Swarm. Enola is the only solution that combines strategic reasoning with creative execution at scale.",
            kpis: ["Demo booking conversion rate > 5%", "CPA < $40"],
            risk_assessment: ["Platform API rate limits", "Ad creative feeigue"],
            dag_flow: [
                { agent: "1", description: "Extract Brand Soul and Voice.", dependencies: [], priority: "High" },
                { agent: "2", description: "Map Product Differentiators.", dependencies: ["1"], priority: "High" },
                { agent: "3", description: "Architect Visual Prompts.", dependencies: ["1", "2"], priority: "High" },
                { agent: "4", description: "Forge Audience Personas.", dependencies: ["3"], priority: "Medium" }
            ]
        },
        4: {
            variants: [
                { variant_id: "v1", image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80", headline: "The Future of Advertising", description: "Automated, agentic, and fully unbundled.", style_label: "Modern Minimalist" },
                { variant_id: "v2", image_url: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80", headline: "Unleash the Swarm", description: "12 Specialized agents working for you.", style_label: "Cinematic Dark" },
                { variant_id: "v3", image_url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80", headline: "Scale Without Borders", description: "Launch multi-platform campaigns in seconds.", style_label: "Vibrant Tech" },
                { variant_id: "v4", image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80", headline: "Agency-Grade Intelligence", description: "Premium quality at startup speed.", style_label: "Abstract Corporate" }
            ]
        },
        5: {
            variants: [
                { headline: "Stop Advertising. Start Orchestrating.", body: "Hire 12 specialized AI agents to run your social media strategy.", cta: "Unlock the Swarm", framework: "AIDA" },
                { headline: "The Agency Killer is Here.", body: "Professional 4K visual assets and copy, delivered in 60 seconds.", cta: "Deploy Now", framework: "PAS" },
                { headline: "Scale Without the Salary.", body: "The only AI platform that reasons about your brand DNA before posting.", cta: "Schedule for $1.99", framework: "Feature/Benefit" },
                { headline: "Your Brand. Our Swarm.", body: "High-performance social growth, powered by Gemini 2.0 Flash.", cta: "Experience Enola", framework: "Storytelling" }
            ]
        }
    };

    const runAgentTest = async (agentId: number) => {
        setLoading(true);
        // Simulate local network delay
        await new Promise(r => setTimeout(r, 800));
        setResult(mockData[agentId]);
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#0a0a0c] text-white p-8 font-sans selection:bg-indigo-500/30">
            <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <p className="text-indigo-500 font-mono text-xs font-bold tracking-[0.3em] uppercase">Laboratory / Swarm_Alpha_0.1</p>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">The Swarm Lab</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: 1, label: "Brand Soul", icon: "🧬" },
                        { id: 5, label: "Commercial Copy", icon: "✍️" },
                        { id: 3, label: "Visual Brief", icon: "📐" },
                        { id: 4, label: "Nano Banana", icon: "🍌" }
                    ].map(node => (
                        <button 
                            key={node.id}
                            onClick={() => { setActiveAgent(node.id); runAgentTest(node.id); }}
                            className={`px-5 py-3 rounded-xl border text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeAgent === node.id ? 'bg-indigo-500 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/10'}`}
                        >
                            <span className="text-lg opacity-80">{node.icon}</span>
                            {node.label}
                        </button>
                    ))}
                </div>
            </header>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* STANDALONE INPUT TERMINAL */}
                    <div className="lg:col-span-1 space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Standalone Initialization</label>
                        <textarea 
                            value={manualInput}
                            onChange={(e) => setManualInput(e.target.value)}
                            placeholder="Enter custom brief or goal for this one-shot run..."
                            className="w-full h-[200px] bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-medium text-slate-300 focus:border-indigo-500 transition-all resize-none shadow-inner"
                        />
                        <button 
                            onClick={() => runAgentTest(activeAgent)}
                            className="w-full py-4 bg-indigo-500/20 border border-indigo-500/40 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all shadow-xl"
                        >
                            Execute Node 0{activeAgent} ⚡
                        </button>
                    </div>

                    {/* EXECUTION VISUALIZER */}
                    <div className="lg:col-span-3">
                        <div className="mb-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <p className="text-xs font-mono text-indigo-300 uppercase">Node Activated: Visualizing Agent Intelligence...</p>
                        </div>

                        {loading ? (
                            <div className="h-[400px] flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {activeAgent === 1 && result && <BrandDNAVisualizer dna={result} />}
                                {activeAgent === 2 && result && <ProductMapperVisualizer product={result} />}
                                {activeAgent === 3 && result && <StrategyBlueprintVisualizer blueprint={result} />}
                                {activeAgent === 4 && result && <NanoBananaVisualizer variants={result.variants} />}
                                {activeAgent === 5 && result && <CopywriterVisualizer variants={result.variants} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <footer className="mt-20 text-center opacity-20 text-[10px] font-mono uppercase tracking-widest pb-12">
                Enola.ai — Strategic Orchestration Engine — Visual Assessment Beta
            </footer>
        </main>
    );
}

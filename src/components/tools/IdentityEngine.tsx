'use client';

import React, { useState } from 'react';
import { runInitialSynthesisAction } from '@/app/actions/swarmActions';

/**
 * IDENTITY ENGINE MICROTOOL
 * This component handles the visual extraction of Brand DNA using Agent 1 (KYC).
 */
export default function IdentityEngine() {
    const [status, setStatus] = useState<'IDLE' | 'EXTRACTING' | 'DONE'>('IDLE');
    const [dna, setDna] = useState<any>(null);

    const handleExtraction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('EXTRACTING');
        
        const form = e.currentTarget;
        const formData = {
            brandName: (form.elements.namedItem('brandName') as HTMLInputElement).value,
            targetAudience: (form.elements.namedItem('target') as HTMLInputElement).value,
            brandVoice: (form.elements.namedItem('voice') as HTMLInputElement).value,
            productSpecs: "Enola.ai Agentic Platform"
        };

        const result = await runInitialSynthesisAction(formData);
        
        if (result.success) {
            setDna(result.brandDNA);
            setStatus('DONE');
        } else {
            console.error("Extraction failed.");
            setStatus('IDLE');
        }
    };

    return (
        <div className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl">
            <header className="mb-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 animate-pulse border-4 border-indigo-500/20 shadow-indigo-500/50" />
                    <div>
                        <h2 className="text-xl font-black uppercase italic tracking-tighter">Identity Engine</h2>
                        <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">ENOLA / AGENT 01 / KYC MANAGER</p>
                    </div>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest bg-white/5">
                    {status}
                </div>
            </header>

            {status === 'IDLE' && (
                <form onSubmit={handleExtraction} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Brand Identity Name</label>
                        <input name="brandName" type="text" placeholder="e.g., Enola.ai" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-indigo-500 transition-all font-medium text-lg" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Target Persona Map</label>
                            <input name="target" type="text" placeholder="SaaS Founders, Creatives..." className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-sm" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Desired Tone Profile</label>
                            <input name="voice" type="text" placeholder="Professional, Bold, Ethereal..." className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-sm" required />
                        </div>
                    </div>

                    <button type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]">
                        Start Extraction Session
                    </button>
                </form>
            )}

            {status === 'EXTRACTING' && (
                <div className="h-[300px] flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-mono uppercase tracking-widest animate-pulse">Consulting KYC Manager...</p>
                </div>
            )}

            {status === 'DONE' && dna && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                        <span className="text-2xl">✅</span>
                        <p className="text-sm font-medium text-emerald-200 uppercase tracking-widest">DNA Extraction Successful / Identity Verified</p>
                    </div>
                    
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <h4 className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] mb-4">Core Archetype</h4>
                        <p className="text-2xl font-bold tracking-tight text-white mb-4 line-clamp-1">{dna.identity?.archetype || 'AUTHENTICATED'}</p>
                        <div className="flex flex-wrap gap-2">
                             {dna.identity?.values?.map((v: string) => (
                                 <span key={v} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold">{v}</span>
                             ))}
                        </div>
                    </div>
                    
                    <button onClick={() => setStatus('IDLE')} className="w-full py-4 border border-white/10 hover:bg-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">
                        Reset Engine
                    </button>
                </div>
            )}
        </div>
    );
}

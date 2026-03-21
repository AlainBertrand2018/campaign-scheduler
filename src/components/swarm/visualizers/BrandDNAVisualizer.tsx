import React from 'react';

interface BrandDNA {
    identity: { name: string; archetype: string; mission: string; values: string[] };
    voice: { tone: string; language_style: string; forbidden_phrases: string[] };
    visual: { primary_colours: string[]; typography: string[]; imagery_style: string };
    positioning: { usp: string; target_market: string };
}

export const BrandDNAVisualizer: React.FC<{ dna: BrandDNA }> = ({ dna }) => {
    return (
        <div className="swarm-card space-y-6">
            <header className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="brand-label">Agent 01: KYC Manager</span>
                <h2 className="text-xl font-bold tracking-tight">{dna.identity.name}</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Identity & Core Soul */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold opacity-50 uppercase tracking-widest">The Identity Soul</h3>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <p className="text-indigo-400 font-medium mb-1">{dna.identity.archetype}</p>
                        <p className="text-sm leading-relaxed">{dna.identity.mission}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {dna.identity.values.map((v, i) => (
                                <span key={i} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 text-[10px] rounded uppercase border border-indigo-500/20">
                                    {v}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tone & Voice Fingerprint */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold opacity-50 uppercase tracking-widest">The Voice Fingerprint</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <p className="text-sm"><b>Tone:</b> {dna.voice.tone}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <p className="text-sm italic">"{dna.voice.language_style}"</p>
                        </div>
                        <div className="mt-2 text-[11px] opacity-40 border-t border-white/5 pt-2">
                            <b>Forbidden phrases:</b> {dna.voice.forbidden_phrases.join(', ')}
                        </div>
                    </div>
                </section>

                {/* Visual Identity DNA */}
                <section className="col-span-1 md:col-span-2 space-y-4 border-t border-white/5 pt-6">
                    <h3 className="text-sm font-semibold opacity-50 uppercase tracking-widest">Visual DNA</h3>
                    <div className="flex flex-wrap items-center gap-6">
                       <div className="flex gap-2">
                           {dna.visual.primary_colours.map((c, i) => (
                               <div key={i} className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: c }} title={c} />
                           ))}
                       </div>
                       <div className="text-sm">
                           <span className="opacity-50">Typography: </span>
                           <span className="font-mono">{dna.visual.typography.join(' / ')}</span>
                       </div>
                       <div className="text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10">
                           <span className="opacity-50">Style: </span> {dna.visual.imagery_style}
                       </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

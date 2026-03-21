import React from 'react';

interface ProductDNA {
    features: string[];
    benefits: string[];
    differentiators: string[];
    value_proposition: string;
    emotional_hooks: string[];
    proof_points: string[];
}

export const ProductMapperVisualizer: React.FC<{ product: ProductDNA }> = ({ product }) => {
    return (
        <div className="swarm-card space-y-8 bg-gradient-to-br from-indigo-900/10 to-transparent">
            <header className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="brand-label">Agent 02: Product DNA Manager</span>
                <h2 className="text-xl font-bold tracking-tight">The Narrative Core</h2>
            </header>

            {/* Value Proposition Hero */}
            <section className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h3 className="text-xs font-semibold opacity-30 uppercase mb-3">Master Value Proposition</h3>
                <p className="text-lg leading-relaxed text-slate-100 font-medium">"{product.value_proposition}"</p>
                <div className="flex gap-4 mt-6">
                    {product.emotional_hooks.slice(0, 3).map((hook, i) => (
                        <div key={i} className="flex-1 p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] opacity-70">
                            <span className="text-indigo-400 block mb-1">Hook #{i+1}</span> {hook}
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Feature to Benefit Mapping */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold opacity-50 uppercase tracking-widest">Feature → Benefit Mapping</h3>
                    <div className="space-y-4">
                        {product.features.map((feature, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-500 transition-colors" />
                                    <div className="flex-1 w-[1px] bg-slate-800" />
                                </div>
                                <div className="pb-4">
                                    <p className="text-sm font-medium mb-1">{feature}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs opacity-40">SO THAT...</span>
                                        <p className="text-sm text-emerald-400">{product.benefits[i] || '—'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Differentiators & Proof Points */}
                <section className="space-y-8 p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 h-min">
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase">Competitive Differentiators</h4>
                        <ul className="space-y-2">
                            {product.differentiators.map((d, i) => (
                                <li key={i} className="text-sm flex gap-3">
                                    <span className="text-indigo-500">★</span> {d}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4 border-t border-indigo-500/10 pt-6">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase">Reason-to-Believe (Proof Points)</h4>
                        <ul className="space-y-2">
                            {product.proof_points.map((p, i) => (
                                <li key={i} className="text-[13px] opacity-70">
                                    <span className="opacity-40">{i+1}. </span> {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

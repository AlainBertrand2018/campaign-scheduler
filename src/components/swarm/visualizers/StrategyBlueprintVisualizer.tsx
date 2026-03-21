import React from 'react';

interface Task {
    agent: string;
    description: string;
    dependencies: string[];
    priority: string;
}

interface StrategyBlueprint {
    campaign_name: string;
    objectives: string[];
    dag_flow: Task[];
    channels: string[];
    kpis: string[];
    overarching_narrative: string;
    risk_assessment: string[];
}

export const StrategyBlueprintVisualizer: React.FC<{ blueprint: StrategyBlueprint }> = ({ blueprint }) => {
    return (
        <div className="swarm-card space-y-10 border-2 border-indigo-500/10">
            <header className="flex justify-between items-center bg-indigo-500/5 -m-6 p-6 border-b border-indigo-500/10 mb-8">
                <span className="brand-label">Agent 03: Senior Strategist</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Strategic Directive</h2>
                <div className="flex gap-2">
                    {blueprint.channels.map((ch, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-900 border border-white/5 text-[9px] rounded uppercase font-bold text-slate-400">
                            {ch}
                        </span>
                    ))}
                </div>
            </header>

            {/* Overarching Narrative Mission */}
            <section className="relative p-10 bg-indigo-900/10 border border-indigo-500/20 rounded-3xl overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-20 text-xs font-bold font-mono">ENOLA_BLUEPRINT_v1.0</div>
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Core Strategy Directive</h3>
                <p className="text-2xl font-medium text-slate-100 leading-snug">"{blueprint.overarching_narrative}"</p>
                <div className="flex flex-wrap gap-4 mt-8">
                    {blueprint.objectives.map((obj, i) => (
                        <div key={i} className="flex-1 min-w-[200px] p-4 bg-white/5 border border-white/5 rounded-2xl group-hover:border-indigo-500/30 transition-all">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Objective {i+1}</span>
                            <p className="text-sm">{obj}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* DAG Task Flow Interaction Map */}
                <section className="space-y-6">
                    <h3 className="text-sm font-semibold opacity-50 uppercase tracking-widest">Swarm Execution Pipeline (DAG)</h3>
                    <div className="space-y-6">
                        {blueprint.dag_flow.map((task, i) => (
                            <div key={i} className="relative pl-12 group">
                                {/* Flow line decorator */}
                                <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-slate-800 group-hover:bg-indigo-500/50 transition-colors" />
                                <div className="absolute left-2.5 top-0 w-3 h-3 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-indigo-400 z-10" />
                                
                                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl group-hover:bg-indigo-500/5 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-black uppercase text-indigo-400 tracking-tighter">AGENT {task.agent}</span>
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${task.priority === 'High' ? 'text-rose-400 bg-rose-400/10' : 'text-slate-400 bg-slate-900'}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <p className="text-[13px] leading-relaxed text-slate-300">{task.description}</p>
                                    {task.dependencies.length > 0 && (
                                        <div className="mt-3 flex gap-2 items-center">
                                            <span className="text-[9px] opacity-40 font-mono uppercase">Wait for →</span>
                                            {task.dependencies.map((dep, d) => (
                                                <span key={d} className="px-1.5 py-0.5 bg-slate-900/50 border border-white/5 text-[9px] rounded-sm font-mono opacity-60">
                                                    {dep}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* KPIs & Risk Assessment */}
                <section className="space-y-12">
                    <div className="grid grid-cols-2 gap-6">
                        <section className="space-y-4">
                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Success Metrics (KPIs)</h3>
                            <div className="space-y-2">
                                {blueprint.kpis.map((kpi, i) => (
                                    <div key={i} className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs text-emerald-200 flex gap-2">
                                        <span className="text-emerald-500">✔</span> {kpi}
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="space-y-4">
                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risk Mitigation</h3>
                            <div className="space-y-2">
                                {blueprint.risk_assessment.map((risk, i) => (
                                    <div key={i} className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl text-xs text-rose-200 flex gap-2">
                                        <span className="text-rose-500">⚠</span> {risk}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
};

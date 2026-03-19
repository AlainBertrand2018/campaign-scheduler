'use client';

import { Rocket, Calendar, CheckCircle, Clock, PlayCircle } from 'lucide-react';
import { useCampaignStore } from '@/lib/store/useCampaignStore';

export default function CampaignsPage() {
  const { swarm, runExecutionSwarm } = useCampaignStore();

  const handleExecute = async () => {
    await runExecutionSwarm();
  };

  const hasCreatives = swarm.creatives && swarm.creatives.length > 0;
  const hasSchedules = swarm.schedules && swarm.schedules.length > 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold italic tracking-tight text-white drop-shadow-sm">Campaign Execution</h1>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed">
            Review approved creative variants and initialize the scheduling swarm to map content drops across channels.
          </p>
        </div>

        {hasCreatives && !hasSchedules && (
          <button 
            onClick={handleExecute}
            disabled={swarm.status === 'executing'}
            className="btn-primary group relative overflow-hidden flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <PlayCircle size={18} className={swarm.status === 'executing' ? "animate-spin" : ""} />
            {swarm.status === 'executing' ? 'Deploying Swarm...' : 'Trigger Execution Swarm'}
          </button>
        )}
      </header>

      {!hasCreatives && !hasSchedules && (
        <div className="card-premium min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 animate-slide-up">
          <div className="p-6 bg-brand-primary/10 rounded-full text-brand-primary animate-pulse shadow-[0_0_30px_rgba(255,51,102,0.2)]">
            <Rocket size={48} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">Awaiting Creative Assets</h2>
            <p className="text-slate-500 max-w-sm mx-auto mt-2 text-sm leading-relaxed">
              Run Phase 1 (Synthesis) and Phase 2 (Creative Swarm) first in the Terminal/Logs to populate this module.
            </p>
          </div>
        </div>
      )}

      {hasCreatives && !hasSchedules && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle size={18} className="text-brand-primary" />
            Approved Creatives Queue ({swarm.creatives.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {swarm.creatives.map((c: any, i) => (
              <div key={i} className="card-premium bg-gradient-to-b from-dark-surface to-black/50 border border-white/5 hover:border-brand-primary/30 transition-colors">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">{c.persona_name}</span>
                    <span className="text-xs text-brand-accent bg-brand-accent/10 px-2 py-1 rounded">Score: {c.qa_feedback?.score}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">{c.copy?.headlines?.[0] || 'Default Headline'}</p>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{c.copy?.body_copy || c.copy?.primary_text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasSchedules && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-3">
              <Calendar size={22} className="text-brand-secondary" />
              Live Deployment Schedule
            </h3>
            <div className="flex items-center gap-2 text-sm text-brand-accent bg-brand-accent/10 px-4 py-1.5 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              {swarm.publishedResults.filter((p: any) => p.status === 'LIVE').length} POSTS LIVE OR QUEUED
            </div>
          </div>
          
          <div className="bg-dark-surface/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
            <div className="hidden lg:grid grid-cols-12 gap-4 p-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/5">
              <div className="col-span-3">Target Date</div>
              <div className="col-span-2">Platform</div>
              <div className="col-span-7">Content / Reasoning</div>
            </div>
            
            <div className="divide-y divide-white/5">
              {swarm.schedules.sort((a,b) => new Date(a.target_date_iso).getTime() - new Date(b.target_date_iso).getTime()).map((s: any, idx) => {
                const isTwitter = s.platform_variant.platform === 'Twitter_X';
                const publishResult = swarm.publishedResults.find((p: any) => p.schedule_id === s.schedule_id);

                return (
                  <div key={idx} className="p-4 lg:grid grid-cols-12 gap-4 items-start hover:bg-white/[0.02] transition-colors">
                    <div className="col-span-3 mb-3 lg:mb-0">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <Clock size={16} className="text-brand-primary" />
                        {tryFormatDate(s.target_date_iso)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 pl-6">{s.optimal_time_slot}</div>
                    </div>
                    
                    <div className="col-span-2 mb-3 lg:mb-0">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md border ${
                        isTwitter ? 'bg-[#000000] border-white/20 text-white' : 'bg-[#0A66C2]/10 border-[#0A66C2]/30 text-[#0A66C2]'
                      }`}>
                        {isTwitter ? 'X / Twitter' : 'LinkedIn'}
                      </span>
                      {publishResult?.status === 'LIVE' && (
                        <div className="mt-2 pl-1">
                          <span className="text-[10px] font-bold text-green-400 flex items-center gap-1">
                            <CheckCircle size={10} /> DISPATCHED
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="col-span-7 space-y-3">
                      <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                        <p className="text-sm text-slate-300 leading-relaxed">
                          "{s.platform_variant.adapted_copy}"
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 truncate">
                          {s.platform_variant.hashtags?.map((tag: string, i: number) => (
                            <span key={i} className="text-xs text-brand-primary">{tag}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pl-2 border-l-2 border-brand-secondary/30">
                        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                          <span className="font-bold text-slate-400">Agent Reasoning:</span> {s.reasoning}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function tryFormatDate(iso: string) {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${months[d.getMonth()]} ${pad(d.getDate())}, ${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch(e) {
    return iso;
  }
}

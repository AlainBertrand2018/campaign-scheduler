'use client';

import { BarChart3, TrendingUp, TrendingDown, Users, Share2, MousePointer2 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase drop-shadow-xl drop-shadow-brand-primary/20 leading-tight">Performance Hub</h1>
          <p className="text-slate-400 mt-2 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">Real-time Campaign Intelligence Feed</p>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 md:flex-none p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center md:items-end">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Reach</span>
            <span className="text-2xl md:text-xl font-black tracking-tight text-emerald-400">+1.2M</span>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Total Impressions" value="482.5k" trend="up" percent="12.4" icon={Users} color="text-brand-primary" />
        <StatCard label="Click-through Rate" value="4.8%" trend="up" percent="2.1" icon={MousePointer2} color="text-brand-secondary" />
        <StatCard label="Conversion Efficiency" value="18.2%" trend="down" percent="0.5" icon={TrendingUp} color="text-emerald-500" />
        <StatCard label="Total Shares" value="2,408" trend="up" percent="8.7" icon={Share2} color="text-brand-accent" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-premium min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5" />
          <BarChart3 size={64} className="text-slate-800 mb-6 drop-shadow-2xl" />
          <h3 className="text-xl font-bold uppercase tracking-widest text-slate-500">Multivariate Engagement Graph</h3>
          <p className="text-xs text-slate-700 font-mono mt-2 lowercase">aggregating cross-channel metadata...</p>
        </div>
        
        <div className="card-premium space-y-8">
          <h3 className="font-bold text-lg border-b border-white/5 pb-4">Channel Power</h3>
          <div className="space-y-6">
            <ChannelRow platform="Twitter" score={92} color="bg-brand-primary" />
            <ChannelRow platform="LinkedIn" score={78} color="bg-indigo-400" />
            <ChannelRow platform="Instagram" score={45} color="bg-brand-secondary" />
            <ChannelRow platform="Facebook" score={12} color="bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, percent, icon: Icon, color }: any) {
  return (
    <div className="card-premium p-8 group hover:-translate-y-2 transition-all cursor-default">
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 bg-slate-900/50 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
          <Icon size={28} />
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-black tracking-tighter px-3 py-1.5 rounded-full ${
          trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'
        }`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {percent}%
        </div>
      </div>
      <div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-black tracking-tighter">{value}</h3>
      </div>
    </div>
  );
}

function ChannelRow({ platform, score, color }: { platform: string, score: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span>{platform}</span>
        <span>{score}% Efficiency</span>
      </div>
      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

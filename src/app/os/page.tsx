import Link from 'next/link';
import { 
  Rocket, 
  BarChart3, 
  CalendarClock, 
  PlusCircle, 
  Zap, 
  Clock, 
  AlertTriangle, 
  History 
} from 'lucide-react';

const STATS = [
  { label: 'Live Campaigns', value: '12', icon: Rocket, color: 'text-brand-primary' },
  { label: 'Weekly Reach', value: '45.2k', icon: BarChart3, color: 'text-brand-secondary' },
  { label: 'Pending Approvals', value: '7', icon: Clock, color: 'text-amber-500' },
  { label: 'AI Processing', value: '3', icon: Zap, color: 'text-emerald-500' },
];

const RECENT_HISTORY = [
  { id: 1, action: 'Genkit Flow Executed', desc: 'Campaign Strategist completed "Growth Wave"', time: '2m ago', type: 'agent' },
  { id: 2, action: 'Post Published', desc: 'Acme SaaS to Instagram', time: '1h ago', type: 'publish' },
  { id: 3, action: 'Brief Approved', desc: 'Founder approved LinkedIn Carousel', time: '4h ago', type: 'user' },
];

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Workspace Overview</h2>
          <p className="text-slate-400 mt-1 text-sm md:text-base">Acme Global Marketing HQ</p>
        </div>
        <Link href="/os/campaign/new" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 py-4 sm:py-2 px-8 shadow-2xl">
          <PlusCircle size={20} /> Start Campaign
        </Link>
      </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {STATS.map(stat => (
            <div key={stat.label} className="card-premium flex items-center gap-4">
              <div className={`p-4 bg-slate-900/50 rounded-2xl ${stat.color}`}>
                <stat.icon size={26} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase">{stat.label}</p>
                <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Active Campaigns */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Zap size={22} className="text-brand-primary" /> Active Waves
            </h3>
            <div className="space-y-4">
              <CampaignCard 
                title="Q4 Growth Sprint" 
                status="Generating Copy" 
                progress={65} 
                channels={['twitter', 'linkedin']} 
              />
              <CampaignCard 
                title="SaaS Product Hunt Launch" 
                status="Awaiting Approval" 
                progress={90} 
                channels={['twitter', 'linkedin', 'facebook']} 
              />
              <CampaignCard 
                title="AI Webinar Mini-Series" 
                status="Strategy Ready" 
                progress={30} 
                channels={['instagram', 'tiktok']} 
              />
            </div>
          </div>

          {/* Activity Logs */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <History size={22} className="text-slate-400" /> Recent Activity
            </h3>
            <div className="card-premium space-y-6 p-6">
              {RECENT_HISTORY.map(log => (
                <div key={log.id} className="flex gap-4 relative">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    log.type === 'agent' ? 'bg-brand-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 
                    log.type === 'publish' ? 'bg-emerald-500' : 'bg-slate-500'
                  }`} />
                  <div>
                    <h4 className="text-sm font-bold">{log.action}</h4>
                    <p className="text-xs text-slate-400 mt-1">{log.desc}</p>
                    <p className="text-[10px] text-slate-600 font-mono mt-2">{log.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-xs font-bold text-slate-400 hover:text-brand-primary transition-all border-t border-white/5 pt-4">
                View All Intelligence Logs
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

function CampaignCard({ title, status, progress, channels }: { title: string, status: string, progress: number, channels: string[] }) {
  return (
    <div className="card-premium group hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h4 className="font-bold text-lg group-hover:text-brand-primary transition-colors">{title}</h4>
          <span className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            {status === 'Awaiting Approval' ? <AlertTriangle size={12} className="text-amber-500" /> : <Clock size={12} />}
            {status}
          </span>
        </div>
        <div className="flex -space-x-2">
          {channels.map(c => (
            <div key={c} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] uppercase font-bold text-slate-400">
              {c[0]}
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold tracking-widest text-slate-600 uppercase">
          <span>Agent Confidence: {progress}%</span>
          <span>Phase 2/3</span>
        </div>
        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-primary via-indigo-400 to-brand-secondary transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

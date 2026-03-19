import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { runInitialSynthesisAction, runCreativeSwarmAction, runExecutionSwarmAction } from '@/app/actions/swarmActions';

export type UserTier = 'none' | 'entry' | 'regular' | 'agency';

interface TierInfo {
  tier: UserTier;
  isRegistered: boolean;
  credits: number; // For entry level runs
}

interface CampaignState {
  // User & Subscription
  user: TierInfo;
  
  // Identity Onboarding (Phase 1)
  identity: {
    userName: string;
    email: string;
    companyName: string;
    website: string;
    brandSoul: string;
    isComplete: boolean;
  };
  
  // Campaign Context (Phase 2)
  campaign: {
    title: string;
    objective: string;
    targetAudience: string;
    brief: string;
    duration: string;
    isComplete: boolean;
  };

  // Agent Swarm Output (Phase 3)
  swarm: {
    blueprint: any;
    brandDNA: any;
    productDNA: any;
    personas: any[];
    creatives: any[];
    schedules: any[];
    publishedResults: any[];
    logs: Array<{
      id: string;
      agent: string;
      message: string;
      detail?: string;
      type: 'info' | 'success' | 'warning' | 'error' | 'agent';
      timestamp: string;
    }>;
    status: 'idle' | 'synthesizing' | 'orchestrating' | 'executing' | 'ready' | 'error';
  };

  // Actions
  setIdentity: (data: Partial<CampaignState['identity']>) => void;
  setCampaign: (data: Partial<CampaignState['campaign']>) => void;
  updateSwarm: (data: Partial<CampaignState['swarm']>) => void;
  addLog: (log: Omit<CampaignState['swarm']['logs'][0], 'id' | 'timestamp'>) => void;
  runInitialSynthesis: () => Promise<void>;
  runCreativeSwarm: () => Promise<void>;
  runExecutionSwarm: () => Promise<void>;
  setUserTier: (tier: UserTier) => void;
  reset: () => void;
  resetLogs: () => void;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set) => ({
      user: {
        tier: 'none',
        isRegistered: false,
        credits: 0,
      },
      identity: {
        userName: '',
        email: '',
        companyName: '',
        website: '',
        brandSoul: '',
        isComplete: false,
      },
      campaign: {
        title: '',
        objective: '',
        targetAudience: '',
        brief: '',
        duration: '',
        isComplete: false,
      },
      swarm: {
        blueprint: null,
        brandDNA: null,
        productDNA: null,
        personas: [],
        creatives: [],
        schedules: [],
        publishedResults: [],
        logs: [],
        status: 'idle',
      },

      setUserTier: (tier) => set((state) => ({
        user: { 
          ...state.user, 
          tier, 
          isRegistered: true,
          credits: tier === 'entry' ? 1 : 0 
        }
      })),

      setIdentity: (data) => set((state) => ({ 
        identity: { ...state.identity, ...data } 
      })),
      
      setCampaign: (data) => set((state) => ({ 
        campaign: { ...state.campaign, ...data } 
      })),

      updateSwarm: (data) => set((state) => ({ 
        swarm: { ...state.swarm, ...data } 
      })),

      addLog: (log) => set((state) => ({
        swarm: {
          ...state.swarm,
          logs: [
            {
              ...log,
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date().toLocaleTimeString(),
            },
            ...state.swarm.logs
          ].slice(0, 50) // Keep last 50
        }
      })),

      runInitialSynthesis: async () => {
        const { identity, campaign, addLog, updateSwarm } = useCampaignStore.getState();
        
        const mockIdentity = identity.userName ? identity : {
          userName: 'Founding Member',
          companyName: 'Gravity.ai Alpha',
          website: 'https://gravity.ai',
          brandSoul: 'Futuristic, efficient, and deeply human.'
        };

        const mockCampaign = campaign.title ? campaign : {
          title: 'Genesis Wave-01',
          objective: 'Pledge community building and early adopter engagement.',
          duration: '14 Days',
          brief: 'Attract high-fidelity SaaS pioneers.'
        };

        updateSwarm({ status: 'synthesizing' });
        addLog({ agent: 'System', message: 'Neural link established. Warm-booting Brand DNA Agent...', type: 'info' });

        try {
          const result = await runInitialSynthesisAction({
            url: mockIdentity.website || undefined,
            brand_notes: mockIdentity.brandSoul || undefined,
            product_desc: mockCampaign.brief || mockCampaign.objective,
            objective: mockCampaign.objective,
            duration: mockCampaign.duration || '30 days',
          });

          if (!result.success || !result.results) throw new Error(result.error || 'Synthesis failed');

          updateSwarm({
            blueprint: result.results.blueprint,
            brandDNA: result.results.brandDNA,
            productDNA: result.results.productDNA,
            status: 'ready',
          });
          
          addLog({ agent: 'System', message: 'Phase 1: Identity & Strategy Synthesis COMPLETE.', type: 'success' });
          addLog({ agent: 'System', message: 'Ready for Wave-2: Creative Generation.', type: 'info' });
        } catch (error: any) {
          console.error('[SWARM ERROR]', error);
          updateSwarm({ status: 'error' });
          addLog({ agent: 'System', message: `Synthesis failed: ${error.message}`, type: 'error' });
        }
      },

      runCreativeSwarm: async () => {
        const { swarm, addLog, updateSwarm } = useCampaignStore.getState();
        updateSwarm({ status: 'orchestrating' });
        addLog({ agent: 'System', message: 'Orchestrator deploying creative swarm...', type: 'info' });

        try {
          const result = await runCreativeSwarmAction({
            blueprint: swarm.blueprint,
            brandDNA: swarm.brandDNA,
          });

          if (!result.success || !result.results) throw new Error(result.error || 'Creative deployment failed');

          updateSwarm({
            personas: (result.results as any).personas,
            creatives: (result.results as any).creatives,
            status: 'ready'
          });

          addLog({ agent: 'System', message: 'Creative Swarm Generation COMPLETE. Variants available for review.', type: 'success' });
        } catch (error: any) {
          console.error('[CREATIVE SWARM ERROR]', error);
          updateSwarm({ status: 'error' });
          addLog({ agent: 'System', message: `Creative deployment failed: ${error.message}`, type: 'error' });
        }
      },

      runExecutionSwarm: async () => {
        const { swarm, addLog, updateSwarm } = useCampaignStore.getState();
        updateSwarm({ status: 'executing' });
        addLog({ agent: 'System', message: 'Orchestrator deploying Phase 3 execution swarm...', type: 'info' });

        try {
          const result = await runExecutionSwarmAction({
            creatives: swarm.creatives,
            platforms: ['LinkedIn', 'Twitter_X'],
            campaign_duration_days: 14,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
          });

          if (!result.success || !result.results) throw new Error(result.error || 'Execution deployment failed');

          updateSwarm({
            schedules: (result.results as any).schedules,
            publishedResults: (result.results as any).publishedResults,
            status: 'ready'
          });

          addLog({ agent: 'System', message: 'Execution Swarm COMPLETE. Campaign is scheduled and running.', type: 'success' });
        } catch (error: any) {
          console.error('[EXECUTION SWARM ERROR]', error);
          updateSwarm({ status: 'error' });
          addLog({ agent: 'System', message: `Execution deployment failed: ${error.message}`, type: 'error' });
        }
      },

      reset: () => set({
        user: { tier: 'none', isRegistered: false, credits: 0 },
        identity: { userName: '', email: '', companyName: '', website: '', brandSoul: '', isComplete: false },
        campaign: { title: '', objective: '', targetAudience: '', brief: '', duration: '', isComplete: false },
        swarm: { blueprint: null, brandDNA: null, productDNA: null, personas: [], creatives: [], schedules: [], publishedResults: [], logs: [], status: 'idle' }
      }),

      resetLogs: () => set((state) => ({
        swarm: { ...state.swarm, logs: [], status: 'idle' }
      })),
    }),
    {
      name: 'gravity-campaign-storage',
    }
  )
);

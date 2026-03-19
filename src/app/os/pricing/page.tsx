'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Rocket, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight,
  Target,
  Users,
  Layout,
  Globe
} from 'lucide-react';
import { useCampaignStore, UserTier } from '@/lib/store/useCampaignStore';
import { useRouter } from 'next/navigation';

const TIERS = [
  {
    id: 'entry',
    name: 'Entry Level',
    price: '$6.99',
    period: 'per run',
    description: 'Perfect for a single launch. Limited to 3 social accounts.',
    features: [
      '4 Static Visuals',
      '2 Animated Visuals',
      '4 Copy Variants',
      'Up to 3 Social Accounts',
      'Non-repeatable Run'
    ],
    icon: <Rocket className="w-6 h-6 text-pink-400" />,
    color: 'from-slate-900 to-slate-800',
    borderColor: 'border-pink-500/20',
    highlight: false
  },
  {
    id: 'regular',
    name: 'Regular Usage',
    price: '$7.99',
    period: 'per month',
    subtext: 'or $4.99/mo billed yearly',
    description: 'The "Always-On" automation. 1 Campaign per Month.',
    features: [
      '4 Static Visuals / 2 Animated',
      '4 Copy Variants per month',
      'Repeatable Swarm Logic',
      '1 Campaign per Month',
      'Sentiment Analysis Feedback'
    ],
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    color: 'from-slate-900 via-slate-800 to-slate-900',
    borderColor: 'border-yellow-500/50',
    highlight: true,
    badge: 'Popular'
  },
  {
    id: 'agency',
    name: 'Agency Usage',
    price: '$499',
    period: 'per month',
    description: 'Industrial-grade. Unlimited number of Campaigns.',
    features: [
      'Unlimited Campaigns',
      'Unlimited Social Accounts',
      'Multi-Brand DNA Architecture',
      'Full Asset Rights',
      'API Direct Access'
    ],
    icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
    color: 'from-slate-900 to-indigo-950/30',
    borderColor: 'border-indigo-500/30',
    highlight: false
  }
];

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>('regular');
  const [isYearly, setIsYearly] = useState(false);
  const { setUserTier } = useCampaignStore();
  const router = useRouter();

  const handleSubscribe = () => {
    if (selectedTier) {
      setUserTier(selectedTier as UserTier);
      // Simulate payment redirect
      router.push('/os/campaigns');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-pink-500/30">
      {/* Cinematic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold tracking-widest text-slate-400 uppercase"
          >
            <CreditCard className="w-3 h-3" />
            Selection Required
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold tracking-tighter"
          >
            Own Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Swarm</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto"
          >
            Your assets are ready. The blueprint is synthesized. Choose your deployment tier to unlock execution.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-slate-800 relative transition-colors focus:outline-none ring-2 ring-transparent focus:ring-pink-500/20"
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : ''}`} />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-slate-500'}`}>Yearly (Save 40%)</span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (idx + 1) }}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative cursor-pointer group flex flex-col p-8 rounded-[2rem] border transition-all duration-500 ${
                selectedTier === tier.id 
                ? `${tier.borderColor} bg-gradient-to-b ${tier.color} shadow-2xl shadow-pink-500/10 scale-105` 
                : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-500 text-xs font-bold tracking-widest uppercase">
                  {tier.badge}
                </div>
              )}

              <div className="flex items-center justify-between mb-8">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10`}>
                  {tier.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">
                    {tier.id === 'regular' && isYearly ? '$4.99' : tier.price}
                  </div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{tier.period}</div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                {tier.description}
              </p>

              <div className="flex-1 space-y-4">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                      <Check className="w-2.5 h-2.5 text-pink-500" />
                    </div>
                    <span className="text-sm text-slate-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className={`w-full py-4 rounded-2xl font-bold text-center transition-all ${
                  selectedTier === tier.id 
                  ? 'bg-white text-slate-950 shadow-xl' 
                  : 'bg-slate-800/50 text-slate-400 group-hover:bg-slate-800 group-hover:text-white'
                }`}>
                  Select {tier.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: selectedTier ? 1 : 0, scale: selectedTier ? 1 : 0.95 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-50"
        >
          <button
            onClick={handleSubscribe}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-[1px] rounded-3xl group shadow-2xl shadow-pink-500/20 active:scale-95 transition-transform"
          >
            <div className="w-full bg-slate-950 py-5 rounded-[1.4rem] flex items-center justify-center gap-3 group-hover:bg-transparent transition-colors">
              <span className="font-bold text-lg">Finalize & Activate Swarm</span>
              <ArrowRight className="w-6 h-6" />
            </div>
          </button>
          <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-bold">
            Secure Encryption Enabled • No Hidden Fees
          </p>
        </motion.div>
      </div>
    </div>
  );
}

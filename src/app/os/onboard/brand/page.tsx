'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  User, 
  Globe, 
  Target, 
  Briefcase, 
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { useCampaignStore } from '@/lib/store/useCampaignStore';

const STEPS = [
  {
    id: 'welcome',
    title: "Welcome to Gravity",
    subtitle: "Let's build your Brand DNA. This takes 2 minutes.",
    icon: <Sparkles className="w-12 h-12 text-indigo-400" />
  },
  {
    id: 'user_info',
    title: "The Captain",
    subtitle: "What should we call you?",
    fields: [
      { name: 'name', label: 'Full Name', placeholder: 'Elon Musk', icon: <User className="w-5 h-5" /> },
      { name: 'role', label: 'Your Position', placeholder: 'Founder', icon: <Briefcase className="w-5 h-5" /> }
    ]
  },
  {
    id: 'company_info',
    title: "The Organization",
    subtitle: "Who is the hero of our story?",
    fields: [
      { name: 'company', label: 'Company Name', placeholder: 'SpaceX', icon: <Building2 className="w-5 h-5" /> },
      { name: 'website', label: 'Website URL', placeholder: 'https://spacex.com', icon: <Globe className="w-5 h-5" /> }
    ]
  },
  {
    id: 'niche',
    title: "The Sector",
    subtitle: "Where do you play?",
    options: ['SaaS', 'E-commerce', 'Agency', 'Direct-to-Consumer', 'B2B Services', 'Other']
  },
  {
    id: 'memory',
    title: "The Brand Soul",
    subtitle: "Paste a manifesto, mission statement, or raw notes. Our AI will do the rest.",
    type: 'textarea'
  },
  {
    id: 'finalizing',
    title: "Activating DNA",
    subtitle: "Our agents are scanning your URLs and synthesisng your voice...",
    isFinal: true
  }
];

export default function OnboardBrand() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    website: '',
    niche: '',
    memory: ''
  });
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const activeStep = STEPS[currentStep];

  // Auto redirect on final step
  useEffect(() => {
    if (activeStep.isFinal) {
      const timer = setTimeout(() => router.push('/os'), 4500);
      return () => clearTimeout(timer);
    }
  }, [activeStep.isFinal, router]);

  return (
    <div className="fixed inset-0 bg-slate-950 text-white flex flex-col overflow-hidden z-[9999]">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-900 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        {currentStep > 0 && !activeStep.isFinal && (
          <button onClick={handleBack} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-400" />
          </button>
        )}
        <div className="flex-1 text-center pr-10">
           <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
             {activeStep.isFinal ? 'Finalizing' : `Step ${currentStep + 1} of ${STEPS.length}`}
           </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 relative px-6 flex flex-col justify-center max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full space-y-8"
          >
            {/* Step Icon/Icon Animation */}
            <div className="flex justify-center mb-4">
              {activeStep.isFinal ? (
                <div className="relative mt-8">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-2 border-dashed border-indigo-500/50 flex items-center justify-center"
                  />
                  <Zap className="w-10 h-10 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
              ) : (
                activeStep.icon || (
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <Sparkles className="w-8 h-8 text-indigo-400" />
                  </div>
                )
              )}
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{activeStep.title}</h1>
              <p className="text-slate-400 text-lg px-4">{activeStep.subtitle}</p>
            </div>

            {/* Form Fields & Glassbox */}
            <div className="space-y-4 pt-4">
              {activeStep.isFinal ? (
                <TerminalStream />
              ) : (
                <>
                  {activeStep.fields?.map((field) => (
                    <div key={field.name} className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                        {field.icon}
                      </div>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={(formData as any)[field.name]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                      />
                    </div>
                  ))}

                  {activeStep.options && (
                    <div className="grid grid-cols-2 gap-3">
                      {activeStep.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFormData({ ...formData, niche: option });
                            handleNext();
                          }}
                          className={`py-4 rounded-2xl border text-sm font-medium transition-all ${
                            formData.niche === option 
                            ? 'bg-indigo-500 text-white border-indigo-400 shadow-xl shadow-indigo-500/20' 
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {activeStep.id === 'memory' && (
                    <textarea
                      placeholder="E.g. We are a direct-to-consumer brand that values radical transparency and minimal aesthetics..."
                      value={formData.memory}
                      onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                      rows={6}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 resize-none"
                    />
                  )}
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer className="p-6 pb-12 max-w-lg mx-auto w-full">
        {!activeStep.isFinal && !activeStep.options && (
          <button
            onClick={handleNext}
            className="w-full py-5 rounded-2xl bg-white text-black font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-100 active:scale-95 transition-all shadow-xl shadow-black/20"
          >
            {currentStep === 0 ? "Get Started" : "Continue"}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
        
        {activeStep.isFinal && (
          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-3 text-indigo-400 font-medium animate-pulse">
               <ShieldCheck className="w-5 h-5" />
               Building Encrypted Identity
             </div>
             <p className="text-xs text-slate-600 uppercase tracking-widest text-center">
               Data stays in your private cluster
             </p>
          </div>
        )}
      </footer>
    </div>
  );
}

const PROCESS_LOGS = [
  "[System] Initializing DNA extractor kernel...",
  "[Network] Fetching public web graphs from provided URLs...",
  "[NLP] Running tone-analysis on index page...",
  "[NLP] Detected primary sentiment: Bold, Visionary, Direct.",
  "[Memory] Indexing user manifesto...",
  "[VectorDB] Upserting 4,231 tokens into semantic space...",
  "[Genkit] Synthesising Brand Voice parameters...",
  "[System] Encrypting identity matrix...",
  "[Success] Brand DNA activation complete. Ready for orchestration."
];

function TerminalStream() {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        if (prev.length < PROCESS_LOGS.length) {
          return [...prev, PROCESS_LOGS[prev.length]];
        }
        clearInterval(interval);
        return prev;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-950/80 backdrop-blur-md border border-indigo-500/20 rounded-xl p-4 font-mono text-xs overflow-y-auto h-48 shadow-inner shadow-indigo-500/5 mt-8 flex flex-col justify-end">
      {logs.map((log, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="mb-2 flex gap-2"
        >
          <span className="text-indigo-500">{'>'}</span>
          <span className={log.includes('[Success]') ? 'text-green-400' : 'text-slate-300'}>{log}</span>
        </motion.div>
      ))}
      {logs.length < PROCESS_LOGS.length && (
        <div className="flex gap-2">
          <span className="text-indigo-500">{'>'}</span>
          <div className="w-2 h-3.5 bg-indigo-500 animate-pulse mt-0.5" />
        </div>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Check } from 'lucide-react';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8, bounce: 0 } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const PRICING_DATA = (isYearly: boolean) => [
  {
    name: 'Entry Level',
    tagline: 'Single execution protocol.',
    price: '$6.99',
    period: '/run',
    cta: 'Initialize',
    featured: false,
    yearlyText: null,
    features: [
      '4 Static Visuals',
      '2 Animated Visuals',
      '4 Copy Variants',
      'Up to 3 Social Accounts',
      'Non-repeatable Execution',
    ],
  },
  {
    name: 'Regular Usage',
    tagline: 'Continuous structural automation.',
    price: isYearly ? '$4.99' : '$7.99',
    period: '/mo',
    cta: 'Subscribe',
    featured: true,
    yearlyText: isYearly ? 'Payable Yearly at $4.99/mo' : null,
    features: [
      '1 Campaign per Month',
      '4 Static / 2 Animated Assets',
      '4 Copy Variants Monthly',
      'Repeatable Swarm Logic',
      'Sentiment Analysis Feed',
    ],
  },
  {
    name: 'Agency Usage',
    tagline: 'Unrestricted orchestration limits.',
    price: isYearly ? '$369' : '$499',
    period: '/mo',
    cta: 'Contact Sales',
    featured: false,
    yearlyText: isYearly ? 'Payable Yearly at $369/mo' : null,
    features: [
      'Unlimited Campaigns',
      'Unlimited Social Accounts',
      'Multi-Brand DNA Architecture',
      'Full Asset Rights',
      'White-label Reporting',
      'Priority Agent Provisioning',
    ],
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 bg-white border-t border-slate-200">
      <motion.div className="max-w-6xl mx-auto" variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <motion.h2 variants={FADE_UP} className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 mb-4">Transparent Licensing.</motion.h2>
            <motion.p variants={FADE_UP} className="text-slate-600 text-lg">Predictable pricing models for single runs or continuous orchestration.</motion.p>
          </div>
          <motion.div variants={FADE_UP} className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-lg text-sm font-medium shadow-sm">
            <button onClick={() => setIsYearly(false)} className={`px-5 py-2 rounded-md transition-all ${!isYearly ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Monthly</button>
            <button onClick={() => setIsYearly(true)} className={`px-5 py-2 rounded-md transition-all ${isYearly ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Yearly</button>
          </motion.div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {PRICING_DATA(isYearly).map((plan) => (
            <motion.div key={plan.name} variants={FADE_UP} className={`p-8 rounded-xl border relative overflow-hidden transition-all ${plan.featured ? 'border-blue-600 bg-blue-50/20 shadow-xl shadow-blue-900/5 -translate-y-2' : 'border-slate-200 bg-white shadow-sm'}`}>
              {plan.featured && <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />}
              <div className="mb-4"><h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3><p className="text-sm text-slate-500 mt-1">{plan.tagline}</p></div>
              <div className="mb-2 flex items-baseline gap-1"><span className="text-4xl font-bold text-slate-900 tracking-tight">{plan.price}</span><span className="text-slate-500 text-sm font-medium">{plan.period}</span></div>
              <div className="h-5 mb-6">{isYearly && plan.yearlyText && <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">{plan.yearlyText}</p>}</div>
              <Link href="/os" className={`block w-full py-3.5 rounded text-center font-medium text-sm mb-8 transition-colors ${plan.featured ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-slate-50 border border-slate-200 text-slate-800 hover:shadow-sm'}`}>{plan.cta}</Link>
              <ul className="space-y-3">{plan.features.map((f) => (<li key={f} className="flex items-start gap-3 text-sm text-slate-600"><Check size={16} className={`shrink-0 mt-0.5 ${plan.featured ? 'text-blue-600' : 'text-slate-400'}`} />{f}</li>))}</ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

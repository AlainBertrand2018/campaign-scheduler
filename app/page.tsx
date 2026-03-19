'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Orchestration } from '@/components/landing/Orchestration';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { BuiltForScale } from '@/components/landing/BuiltForScale';
import { Pricing } from '@/components/landing/Pricing';
import { Footer } from '@/components/landing/Footer';

/**
 * LANDING PAGE - GRAVITY AI
 * Refactored for best practices:
 * 1. Atomic components in @/components/landing
 * 2. Optimized state for scrolling
 * 3. Consistent design system utility usage
 */
export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200 antialiased overflow-x-hidden">
      <Navbar scrolled={scrolled} />
      
      <main>
        <Hero />
        <Orchestration />
        <HowItWorks />
        <BuiltForScale />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}

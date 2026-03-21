'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
      ? 'bg-blue-600/90 backdrop-blur-md shadow-sm py-4 border-b border-blue-500'
      : 'bg-transparent py-6'
      }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-blue-600 text-lg shadow-sm">
            E
          </div>
          <span className="font-bold text-xl tracking-tight text-white uppercase">ENOLA.AI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-100">
          <a href="#micro-tools" className="hover:text-white transition-colors">Micro-Tools</a>
          <a href="#orchestration" className="hover:text-white transition-colors">OS Orchestration</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/os" className="text-blue-100 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/os" className="bg-white text-blue-600 px-5 py-2.5 rounded hover:bg-slate-50 transition-colors shadow-sm inline-flex items-center gap-2 font-bold">
            Launch OS <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Burger */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-600 border-t border-blue-500 px-6 py-6 space-y-4 shadow-lg absolute w-full top-full">
          <a href="#micro-tools" onClick={() => setMobileMenuOpen(false)} className="block text-white font-medium py-2">Micro-Tools</a>
          <a href="#orchestration" onClick={() => setMobileMenuOpen(false)} className="block text-white font-medium py-2">OS Orchestration</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-white font-medium py-2">How it Works</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-white font-medium py-2">Pricing</a>
          <hr className="border-blue-500 my-2" />
          <Link href="/os" className="block text-white font-medium py-2">Sign In</Link>
          <Link href="/os" className="block text-center bg-white text-blue-600 py-3 rounded mt-2 font-bold shadow-sm">Launch OS</Link>
        </div>
      )}
    </nav>
  );
}

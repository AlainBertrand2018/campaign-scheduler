'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const DynamicCanvasReport = dynamic(() => import('./CanvasReport'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white">
      <Loader2 className="animate-spin mr-2" /> Initializing Live Canvas...
    </div>
  ),
});

export default function Page() {
  return <DynamicCanvasReport />;
}

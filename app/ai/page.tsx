'use client';

import { useEffect, useState } from 'react';
import AIAssistant from '@/components/AIAssistant';

export default function AIPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6 h-screen md:h-auto">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Health Assistant 🤖</h1>
        <p className="text-gray-600">Get personalized health advice and suggestions</p>
      </div>
      <AIAssistant />
    </div>
  );
}

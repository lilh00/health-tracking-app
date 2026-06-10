'use client';

import { useEffect, useState } from 'react';
import HealthMetrics from '@/components/HealthMetrics';
import TodoSection from '@/components/TodoSection';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to HealthTrack 💪</h1>
        <p className="text-gray-600">Your all-in-one health and fitness companion</p>
      </div>

      <HealthMetrics />
      <TodoSection />
    </div>
  );
}

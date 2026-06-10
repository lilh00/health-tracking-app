'use client';

import { useEffect, useState } from 'react';
import WeightTracker from '@/components/WeightTracker';
import HealthMetrics from '@/components/HealthMetrics';

export default function WeightPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Weight Tracking ⚖️</h1>
        <p className="text-gray-600">Log and monitor your weight with detailed metrics</p>
      </div>
      <WeightTracker />
      <HealthMetrics />
    </div>
  );
}

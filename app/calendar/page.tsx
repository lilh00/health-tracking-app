'use client';

import { useEffect, useState } from 'react';
import CalendarView from '@/components/CalendarView';

export default function CalendarPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Calendar View 📅</h1>
        <p className="text-gray-600">See your weight logging history at a glance</p>
      </div>
      <CalendarView />
    </div>
  );
}

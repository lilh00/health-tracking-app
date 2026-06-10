'use client';

import { useEffect, useState } from 'react';
import TodoSection from '@/components/TodoSection';

export default function TodosPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Daily Tasks 📋</h1>
        <p className="text-gray-600">Manage your daily todos and track completion</p>
      </div>
      <TodoSection />
    </div>
  );
}

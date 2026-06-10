'use client';

import { useEffect, useState } from 'react';
import SettingsPanel from '@/components/SettingsPanel';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings ⚙️</h1>
        <p className="text-gray-600">Customize your health profile and preferences</p>
      </div>
      <SettingsPanel />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useHealthStore, HealthSettings } from '@/lib/store';

export default function SettingsPanel() {
  const [mounted, setMounted] = useState(false);
  const { settings, updateSettings } = useHealthStore();
  const [formData, setFormData] = useState<HealthSettings>(settings);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChange = (field: keyof HealthSettings, value: any) => {
    setFormData({ ...formData, [field]: value });
    updateSettings({ [field]: value });
  };

  const heightFeet = Math.floor(formData.height / 12);
  const heightInches = formData.height % 12;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ Settings</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-4">Personal Information</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value as 'male' | 'female')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Height: {heightFeet}'{heightInches}"
              </label>
              <input
                type="range"
                min="48"
                max="84"
                value={formData.height}
                onChange={(e) => handleChange('height', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-4">Health Goals</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Weight (lbs)</label>
              <input
                type="number"
                step="0.5"
                value={formData.goalWeight}
                onChange={(e) => handleChange('goalWeight', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Level</label>
              <select
                value={formData.activityLevel}
                onChange={(e) =>
                  handleChange(
                    'activityLevel',
                    e.target.value as
                      | 'sedentary'
                      | 'lightly_active'
                      | 'moderately_active'
                      | 'very_active'
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sedentary">Sedentary (little exercise)</option>
                <option value="lightly_active">Lightly Active (1-3 days/week)</option>
                <option value="moderately_active">Moderately Active (3-5 days/week)</option>
                <option value="very_active">Very Active (6-7 days/week)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maintenance Calories
              </label>
              <input
                type="number"
                value={formData.maintenanceCalories}
                onChange={(e) => handleChange('maintenanceCalories', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Adjust based on your preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 These settings affect BMR and TDEE calculations. Update as needed for accuracy.
        </p>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useHealthStore } from '@/lib/store';
import { getBMICategory, getBMIColor, heightInchesToString } from '@/lib/utils';

export default function HealthMetrics() {
  const [mounted, setMounted] = useState(false);
  const {
    weights,
    settings,
    calculateBMI,
    calculateBMR,
    calculateTDEE,
    calculateWeightProgress,
  } = useHealthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const bmi = calculateBMI();
  const bmr = calculateBMR();
  const tdee = calculateTDEE();
  const progress = calculateWeightProgress();
  const hasWeight = weights.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Health Metrics</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-semibold">Current Weight</p>
          <p className="text-3xl font-bold text-blue-600">
            {hasWeight ? `${progress.current.toFixed(1)} lbs` : '—'}
          </p>
          <p className="text-gray-500 text-xs mt-1">Height: {heightInchesToString(settings.height)}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-semibold">Goal Weight</p>
          <p className="text-3xl font-bold text-green-600">{settings.goalWeight} lbs</p>
          <p className="text-gray-500 text-xs mt-1">
            {hasWeight ? `${progress.remaining.toFixed(1)} lbs to go` : 'Log weight first'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-semibold">BMI</p>
          <p className={`text-3xl font-bold ${getBMIColor(bmi)}`}>
            {hasWeight ? bmi.toFixed(1) : '—'}
          </p>
          <p className="text-gray-500 text-xs mt-1">{hasWeight && getBMICategory(bmi)}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-semibold">Progress</p>
          <p className="text-3xl font-bold text-orange-600">
            {hasWeight ? `${progress.percentage.toFixed(0)}%` : '—'}
          </p>
          <p className="text-gray-500 text-xs mt-1">Towards goal</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <p className="text-gray-600 text-sm font-semibold">BMR</p>
          <p className="text-2xl font-bold text-red-600">
            {hasWeight ? `${bmr.toFixed(0)}` : '—'}
          </p>
          <p className="text-gray-500 text-xs mt-1">Calories (resting)</p>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
          <p className="text-gray-600 text-sm font-semibold">TDEE</p>
          <p className="text-2xl font-bold text-indigo-600">
            {hasWeight ? `${tdee.toFixed(0)}` : '—'}
          </p>
          <p className="text-gray-500 text-xs mt-1">Daily calories</p>
        </div>

        <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
          <p className="text-gray-600 text-sm font-semibold">Maintenance</p>
          <p className="text-2xl font-bold text-cyan-600">{settings.maintenanceCalories}</p>
          <p className="text-gray-500 text-xs mt-1">Custom setting</p>
        </div>
      </div>

      {!hasWeight && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          📌 Log your first weight entry to see all metrics
        </div>
      )}
    </div>
  );
}

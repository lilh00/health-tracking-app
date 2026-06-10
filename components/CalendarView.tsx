'use client';

import { useState, useEffect } from 'react';
import { useHealthStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const { weights } = useHealthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weightMap = new Map(weights.map((w) => [w.date, w]));

  const hasWeight = (day: number) => {
    const dateStr = formatDate(new Date(year, month, day));
    return weightMap.has(dateStr);
  };

  const getWeightColor = (day: number) => {
    const dateStr = formatDate(new Date(year, month, day));
    const entry = weightMap.get(dateStr);
    if (!entry) return 'bg-gray-50';
    return 'bg-green-200';
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📅 Weight Calendar</h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FiChevronLeft size={20} />
          </button>
          <div className="min-w-max">
            <p className="text-lg font-semibold text-gray-800">
              {new Date(year, month).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center rounded-lg font-semibold text-sm ${
              day === null
                ? 'bg-gray-100'
                : `${getWeightColor(day)} ${
                    hasWeight(day)
                      ? 'cursor-pointer hover:shadow-md transition border-2 border-green-400'
                      : 'border-2 border-gray-200'
                  }`
            }`}
          >
            {day && <span className="text-gray-800">{day}</span>}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">
          📊 <strong>{weights.length}</strong> weight entries logged
        </p>
      </div>
    </div>
  );
}

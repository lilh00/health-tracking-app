'use client';

import { useState, useEffect } from 'react';
import { useHealthStore } from '@/lib/store';
import { formatDate, formatDateDisplay } from '@/lib/utils';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function WeightTracker() {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(formatDate(new Date()));
  const [notes, setNotes] = useState('');
  const [mounted, setMounted] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { weights, addWeight, updateWeight, removeWeight, getWeightByDate } = useHealthStore();

  useEffect(() => {
    setMounted(true);
    const today = formatDate(new Date());
    const todayEntry = getWeightByDate(today);
    if (todayEntry) {
      setWeight(todayEntry.weight.toString());
      setNotes(todayEntry.notes || '');
      setEditingId(todayEntry.id);
    }
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && date) {
      if (editingId) {
        updateWeight(editingId, parseFloat(weight), notes);
        setEditingId(null);
      } else {
        addWeight(parseFloat(weight), date, notes);
      }
      setWeight('');
      setNotes('');
      setDate(formatDate(new Date()));
    }
  };

  const sortedWeights = [...weights].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">⚖️ Weight Tracker</h2>

      <form onSubmit={handleSubmit} className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            {editingId ? '✏️ Update' : '➕ Log Weight'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setWeight('');
                setNotes('');
                setDate(formatDate(new Date()));
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h3 className="font-semibold text-lg text-gray-700 mb-4">📜 Weight History</h3>
        {sortedWeights.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No weight entries yet. Start logging!</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sortedWeights.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{entry.weight} lbs</p>
                  <p className="text-sm text-gray-500">{formatDateDisplay(entry.date)}</p>
                  {entry.notes && <p className="text-sm text-gray-600 italic">{entry.notes}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setWeight(entry.weight.toString());
                      setDate(entry.date);
                      setNotes(entry.notes || '');
                      setEditingId(entry.id);
                    }}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => removeWeight(entry.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

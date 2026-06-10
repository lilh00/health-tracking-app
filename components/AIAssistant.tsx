'use client';

import { useState, useEffect, useRef } from 'react';
import { FiSend, FiLoader } from 'react-icons/fi';
import { useHealthStore } from '@/lib/store';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { weights, settings, calculateBMI, calculateBMR, calculateTDEE } = useHealthStore();

  useEffect(() => {
    setMounted(true);
    setMessages([
      {
        id: '0',
        role: 'assistant',
        content:
          "Hi! I'm your health assistant. Ask me about nutrition, fitness, or any health-related questions. I can also provide insights based on your current metrics.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!mounted) return null;

  const getContextData = () => {
    const bmi = calculateBMI();
    const bmr = calculateBMR();
    const tdee = calculateTDEE();
    const hasWeight = weights.length > 0;

    return {
      bmi: hasWeight ? bmi.toFixed(1) : 'not tracked',
      bmr: hasWeight ? bmr.toFixed(0) : 'not calculated',
      tdee: hasWeight ? tdee.toFixed(0) : 'not calculated',
      currentWeight: hasWeight ? weights[weights.length - 1].weight : 'not logged',
      goalWeight: settings.goalWeight,
      age: settings.age,
      activityLevel: settings.activityLevel,
    };
  };

  const generateAIResponse = (userMessage: string): string => {
    const context = getContextData();

    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('bmi') || lowerMessage.includes('weight')) {
      return `Your current BMI is ${context.bmi}. This is calculated based on your weight and height. If you're unsure about your BMI category, I can help explain what it means for your health. Your goal weight is ${context.goalWeight} lbs.`;
    }

    if (lowerMessage.includes('calorie') || lowerMessage.includes('calor')) {
      return `Based on your profile, your estimated BMR (resting calories) is about ${context.bmr} calories/day, and your TDEE (daily calorie burn) is around ${context.tdee} calories/day. This considers your ${context.activityLevel} activity level. To lose weight, aim for 300-500 calories below your TDEE.`;
    }

    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return `Great! For your activity level (${context.activityLevel}), I recommend:\n• 150 minutes of moderate cardio per week\n• 2-3 strength training sessions\n• Rest days are important too!\n\nConsistency matters more than intensity.`;
    }

    if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('nutrition')) {
      return `Good nutrition is key! Focus on:\n• Protein: ${Math.round(context.currentWeight * 0.8)}-${Math.round(context.currentWeight * 1.0)}g per day\n• Whole grains, fruits, and vegetables\n• Staying hydrated (8+ glasses of water)\n• Balanced meals throughout the day\n\nTrack your food to stay accountable.`;
    }

    if (lowerMessage.includes('progress') || lowerMessage.includes('how am i')) {
      return `You're doing great by tracking your health! Keep logging your weight regularly and staying consistent with your goals. Progress takes time, so be patient with yourself.`;
    }

    return `I'm here to help with health and fitness advice! Ask me about:\n• Calorie calculations\n• Workout routines\n• Nutrition tips\n• Weight loss strategies\n• Activity recommendations\n\nWhat would you like to know?`;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full h-screen md:h-auto md:max-h-96 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🤖 AI Health Assistant</h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
              <FiLoader className="animate-spin" size={20} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about health..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center gap-2"
        >
          {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
        </button>
      </form>
    </div>
  );
}

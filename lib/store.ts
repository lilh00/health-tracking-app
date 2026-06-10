import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  notes?: string;
}

export interface HealthSettings {
  height: number;
  goalWeight: number;
  maintenanceCalories: number;
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  gender: 'male' | 'female';
  age: number;
}

interface HealthStore {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompletedTodos: () => void;

  weights: WeightEntry[];
  addWeight: (weight: number, date: string, notes?: string) => void;
  updateWeight: (id: string, weight: number, notes?: string) => void;
  removeWeight: (id: string) => void;
  getWeightByDate: (date: string) => WeightEntry | undefined;

  settings: HealthSettings;
  updateSettings: (settings: Partial<HealthSettings>) => void;

  calculateBMI: () => number;
  calculateBMR: () => number;
  calculateTDEE: () => number;
  calculateWeightProgress: () => { current: number; goal: number; remaining: number; percentage: number };
}

const defaultSettings: HealthSettings = {
  height: 62,
  goalWeight: 130,
  maintenanceCalories: 2000,
  activityLevel: 'moderately_active',
  gender: 'female',
  age: 25,
};

export const useHealthStore = create<HealthStore>()(
  persist(
    (set, get) => ({
      todos: [],
      weights: [],
      settings: defaultSettings,

      addTodo: (text: string) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      removeTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      clearCompletedTodos: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),

      addWeight: (weight: number, date: string, notes?: string) =>
        set((state) => ({
          weights: [
            ...state.weights,
            {
              id: Date.now().toString(),
              date,
              weight,
              notes,
            },
          ],
        })),

      updateWeight: (id: string, weight: number, notes?: string) =>
        set((state) => ({
          weights: state.weights.map((w) =>
            w.id === id ? { ...w, weight, notes } : w
          ),
        })),

      removeWeight: (id: string) =>
        set((state) => ({
          weights: state.weights.filter((w) => w.id !== id),
        })),

      getWeightByDate: (date: string) => {
        const state = get();
        return state.weights.find((w) => w.date === date);
      },

      updateSettings: (newSettings: Partial<HealthSettings>) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      calculateBMI: () => {
        const state = get();
        if (state.weights.length === 0) return 0;
        const latestWeight = state.weights.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];
        return (latestWeight.weight / (state.settings.height * state.settings.height)) * 703;
      },

      calculateBMR: () => {
        const state = get();
        if (state.weights.length === 0) return 0;
        const latestWeight = state.weights.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];

        let bmr = 10 * latestWeight.weight + 6.25 * state.settings.height - 5 * state.settings.age;
        if (state.settings.gender === 'male') {
          bmr += 5;
        } else {
          bmr -= 161;
        }
        return bmr;
      },

      calculateTDEE: () => {
        const state = get();
        const bmr = get().calculateBMR();
        const activityMultipliers = {
          sedentary: 1.2,
          lightly_active: 1.375,
          moderately_active: 1.55,
          very_active: 1.725,
        };
        return bmr * activityMultipliers[state.settings.activityLevel];
      },

      calculateWeightProgress: () => {
        const state = get();
        if (state.weights.length === 0) {
          return { current: 0, goal: state.settings.goalWeight, remaining: state.settings.goalWeight, percentage: 0 };
        }
        const currentWeight = state.weights.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0].weight;
        const startWeight = state.weights.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )[0].weight;
        const remaining = Math.max(0, state.settings.goalWeight - currentWeight);
        const totalLoss = startWeight - state.settings.goalWeight;
        const currentProgress = startWeight - currentWeight;
        const percentage = totalLoss > 0 ? (currentProgress / totalLoss) * 100 : 0;
        return { current: currentWeight, goal: state.settings.goalWeight, remaining, percentage };
      },
    }),
    {
      name: 'health-tracker-storage',
    }
  )
);

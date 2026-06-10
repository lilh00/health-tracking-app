'use client';

import { useEffect, useState } from 'react';
import { useHealthStore } from '@/lib/store';
import { FiTrash2, FiCheck } from 'react-icons/fi';

export default function TodoSection() {
  const [input, setInput] = useState('');
  const [mounted, setMounted] = useState(false);
  const { todos, addTodo, toggleTodo, removeTodo, clearCompletedTodos } = useHealthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Todo List</h2>

      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Add
          </button>
        </div>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Pending ({pendingTodos.length})</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {pendingTodos.length === 0 ? (
              <p className="text-gray-400 text-sm">All tasks completed! 🎉</p>
            ) : (
              pendingTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex-shrink-0 w-6 h-6 rounded border-2 border-gray-300 hover:border-green-500 flex items-center justify-center transition"
                  >
                    <FiCheck size={18} className="text-transparent" />
                  </button>
                  <span className="flex-1 text-gray-800">{todo.text}</span>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg text-gray-700">
              Completed ({completedCount})
            </h3>
            {completedCount > 0 && (
              <button
                onClick={clearCompletedTodos}
                className="text-sm text-red-500 hover:text-red-700 transition"
              >
                Clear
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {completedTodos.length === 0 ? (
              <p className="text-gray-400 text-sm">No completed tasks yet</p>
            ) : (
              completedTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex-shrink-0 w-6 h-6 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center transition"
                  >
                    <FiCheck size={18} className="text-white" />
                  </button>
                  <span className="flex-1 text-gray-600 line-through">{todo.text}</span>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

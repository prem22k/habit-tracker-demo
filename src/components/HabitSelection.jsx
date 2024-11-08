import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Check, Plus, X, ChevronRight } from 'lucide-react';
import './HabitSelection.css';

const habitOptions = [
  { id: '1', name: 'Morning Meditation', description: 'Start your day with 10 minutes of mindfulness', frequency: 'Daily' },
  { id: '2', name: 'Read a Book', description: 'Read for 30 minutes to expand your knowledge', frequency: 'Daily' },
  { id: '3', name: 'Exercise', description: 'Get moving for at least 30 minutes', frequency: '3 times a week' },
  { id: '4', name: 'Healthy Eating', description: 'Prepare a nutritious meal', frequency: 'Daily' },
  { id: '5', name: 'Gratitude Journal', description: "Write down three things you're grateful for", frequency: 'Daily' },
  { id: '6', name: 'Learn a New Skill', description: 'Dedicate time to learning something new', frequency: 'Weekly' },
];

const HabitSelection = ({ onComplete }) => {
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [customHabit, setCustomHabit] = useState('');
  const [customHabitFrequency, setCustomHabitFrequency] = useState('Daily');

  const toggleHabit = (habit) => {
    setSelectedHabits(prev =>
      prev.some(h => h.id === habit.id)
        ? prev.filter(h => h.id !== habit.id)
        : [...prev, habit]
    );
  };

  const addCustomHabit = (e) => {
    e.preventDefault();
    if (customHabit.trim()) {
      const newHabit = {
        id: `custom-${Date.now()}`,
        name: customHabit,
        description: 'Custom habit',
        frequency: customHabitFrequency
      };
      setSelectedHabits(prev => [...prev, newHabit]);
      setCustomHabit('');
      setCustomHabitFrequency('Daily');
    }
  };

  const updateHabitFrequency = (habitId, newFrequency) => {
    setSelectedHabits(prev =>
      prev.map(habit =>
        habit.id === habitId ? { ...habit, frequency: newFrequency } : habit
      )
    );
  };

  const removeHabit = (habitId) => {
    setSelectedHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#006D5B] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="w-1/3 h-2 bg-[#5EEAD4] rounded-full"></div>
            <div className="w-1/3 h-2 bg-[#5EEAD4] rounded-full"></div>
            <div className="w-1/3 h-2 bg-gray-600 rounded-full"></div>
          </div>
          <div className="flex justify-between text-sm">
            <span>Onboarding</span>
            <span className="font-bold">Habit Selection</span>
            <span>Profile Setup</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-center text-white">Choose Your Habits</h1>
        <p className="text-xl mb-8 text-center text-gray-300">Select habits to develop and customize your routine.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {habitOptions.map(habit => (
            <div
              key={habit.id}
              className={`habit-card ${selectedHabits.some(h => h.id === habit.id) ? 'selected' : ''}`}
              onClick={() => toggleHabit(habit)}
            >
              <h3>{habit.name}</h3>
              <p>{habit.description}</p>
              <p className="frequency">{habit.frequency}</p>
              {selectedHabits.some(h => h.id === habit.id) && (
                <Check className="check-icon" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-black bg-opacity-50 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-semibold mb-4">Add Custom Habit</h3>
          <form onSubmit={addCustomHabit} className="space-y-4">
            <input
              type="text"
              className="w-full bg-gray-800 text-white p-3 rounded-md"
              placeholder="Enter your custom habit"
              value={customHabit}
              onChange={(e) => setCustomHabit(e.target.value)}
              required
            />
            <select
              className="w-full bg-gray-800 text-white p-3 rounded-md"
              value={customHabitFrequency}
              onChange={(e) => setCustomHabitFrequency(e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="3 times a week">3 times a week</option>
              <option value="Custom">Custom</option>
            </select>
            <Button
              type="submit"
              className="w-full"
            >
              <Plus className="inline mr-2" />
              Add Habit
            </Button>
          </form>
        </div>

        {selectedHabits.length > 0 && (
          <div className="bg-black bg-opacity-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Selected Habits</h2>
            {selectedHabits.map(habit => (
              <div key={habit.id} className="flex items-center justify-between mb-4 p-3 bg-gray-800 rounded-md">
                <div>
                  <h3 className="font-semibold">{habit.name}</h3>
                  <select
                    className="mt-1 bg-gray-700 text-white p-2 rounded-md"
                    value={habit.frequency}
                    onChange={(e) => updateHabitFrequency(habit.id, e.target.value)}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>3 times a week</option>
                    <option>Custom</option>
                  </select>
                </div>
                <Button
                  onClick={() => removeHabit(habit.id)}
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove habit"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button
            onClick={() => onComplete(selectedHabits)}
            size="lg"
            className="px-8 py-3 rounded-full"
          >
            Continue to Profile Setup
            <ChevronRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HabitSelection;
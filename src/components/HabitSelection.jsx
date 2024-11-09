import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Check, Plus, X, ChevronRight, Loader2, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoutButton from './ui/LogoutButton';

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
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete(selectedHabits);
    }, 2000);
  };

  if (isTransitioning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-teal-900 text-white flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="flex justify-center"
            >
              <Loader className="w-16 h-16 text-teal-400" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-xl text-white"
            >
              Preparing your profile setup...
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-teal-900 text-white p-6 relative">
      {/* Logout Button */}
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="w-1/3 h-2 bg-teal-400 rounded-full"></div>
            <div className="w-1/3 h-2 bg-teal-400 rounded-full"></div>
            <div className="w-1/3 h-2 bg-gray-600 rounded-full"></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Onboarding</span>
            <span className="font-bold text-teal-400">Habit Selection</span>
            <span className="text-gray-400">Profile Setup</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-center">Choose Your Habits</h1>
        <p className="text-xl mb-8 text-center text-gray-300">
          Select habits to develop and customize your routine.
        </p>

        {/* Habit Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {habitOptions.map(habit => (
            <motion.div
              key={habit.id}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300
                         ${selectedHabits.some(h => h.id === habit.id)
                           ? 'bg-teal-400/10 border-2 border-teal-400'
                           : 'bg-black/30 border border-teal-400/20 hover:border-teal-400/40'}
                         relative group`}
              onClick={() => toggleHabit(habit)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-xl font-semibold mb-2">{habit.name}</h3>
              <p className="text-gray-300 mb-3">{habit.description}</p>
              <p className="text-sm text-teal-400">{habit.frequency}</p>
              {selectedHabits.some(h => h.id === habit.id) && (
                <Check className="absolute top-4 right-4 text-teal-400 w-6 h-6" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Custom Habit Form */}
        <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-teal-400/20 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Add Custom Habit</h3>
          <form onSubmit={addCustomHabit} className="space-y-4">
            <input
              type="text"
              className="w-full bg-black/30 text-white p-3 rounded-md border border-teal-400/20
                         focus:border-teal-400 focus:outline-none"
              placeholder="Enter your custom habit"
              value={customHabit}
              onChange={(e) => setCustomHabit(e.target.value)}
              required
            />
            <select
              className="w-full bg-black/30 text-white p-3 rounded-md border border-teal-400/20
                         focus:border-teal-400 focus:outline-none"
              value={customHabitFrequency}
              onChange={(e) => setCustomHabitFrequency(e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="3 times a week">3 times a week</option>
              <option value="Custom">Custom</option>
            </select>
            <Button type="submit" className="w-full">
              <Plus className="w-5 h-5 mr-2" />
              Add Habit
            </Button>
          </form>
        </div>

        {/* Selected Habits List */}
        {selectedHabits.length > 0 && (
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-teal-400/20 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Selected Habits</h2>
            <div className="space-y-4">
              {selectedHabits.map(habit => (
                <div
                  key={habit.id}
                  className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-teal-400/20"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{habit.name}</h3>
                    <select
                      className="bg-black/30 text-white p-2 rounded-md border border-teal-400/20
                                focus:border-teal-400 focus:outline-none"
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
                    variant="ghost"
                    onClick={() => removeHabit(habit.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="text-center mt-8">
          <Button
            onClick={handleContinue}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full
                     inline-flex items-center space-x-2 transform transition-all duration-300
                     hover:scale-105"
            disabled={selectedHabits.length === 0}
          >
            <span>Continue to Profile Setup</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HabitSelection;
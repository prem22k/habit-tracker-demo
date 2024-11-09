import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Loader2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import LogoutButton from './ui/LogoutButton';

const UserProfile = ({ onComplete }) => {
  const [profile, setProfile] = useState({
    username: '',
    trackingFrequency: 'daily',
    preferredTime: '',
    notifications: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const handleProfileChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profile.username.trim()) {
      setSaveError('Please enter your name.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSetupComplete(true);
    } catch (error) {
      setSaveError('An error occurred while saving your profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isSetupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-teal-900 flex items-center justify-center p-4">
         {/* Logout Button */}
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-xl border border-teal-400/20 p-8"
        >
          <h2 className="text-2xl font-bold text-center text-teal-400 mb-6">
            Welcome, {profile.username}!
          </h2>
          <div className="space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-teal-400" />
            </div>
            <p className="text-center text-gray-300">
              Your profile has been saved successfully.
            </p>
            <Button 
              onClick={onComplete}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-center text-sm text-gray-400">
              Tip: Your dashboard is now ready to help you track your habits!
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-teal-900 text-white p-4 md:p-6">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="w-1/3 h-2 bg-teal-400 rounded-full"></div>
          <div className="w-1/3 h-2 bg-teal-400 rounded-full"></div>
          <div className="w-1/3 h-2 bg-teal-400 rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Onboarding</span>
          <span className="text-gray-400">Habit Selection</span>
          <span className="font-bold text-teal-400">Profile Setup</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Set Up Your Profile</h1>
        
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-teal-400/20 p-6 md:p-8 space-y-8">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-lg font-medium">
              What's your name?
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name..."
              value={profile.username}
              onChange={(e) => handleProfileChange('username', e.target.value)}
              className="w-full bg-black/30 border border-teal-400/20 rounded-lg px-4 py-3 
                         text-white placeholder-gray-400 focus:outline-none focus:border-teal-400
                         transition-colors"
            />
            <p className="text-sm text-gray-400">
              We'll use this to personalize your dashboard with a greeting.
            </p>
          </div>

          {/* Tracking Preferences */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-teal-400">Tracking Preferences</h3>
            
            {/* Frequency Selection */}
            <div className="space-y-3">
              <label className="block text-lg">Track habits</label>
              <div className="flex gap-4">
                {['daily', 'weekly'].map((freq) => (
                  <button
                    key={freq}
                    className={`px-6 py-2 rounded-lg border transition-all duration-200
                              ${profile.trackingFrequency === freq
                                ? 'bg-teal-400/10 border-teal-400 text-teal-400'
                                : 'border-teal-400/20 hover:border-teal-400/40'}`}
                    onClick={() => handleProfileChange('trackingFrequency', freq)}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Preference */}
            <div className="space-y-3">
              <label htmlFor="preferred-time" className="block text-lg">
                Preferred time of day
              </label>
              <select
                id="preferred-time"
                value={profile.preferredTime}
                onChange={(e) => handleProfileChange('preferredTime', e.target.value)}
                className="w-full bg-black/30 border border-teal-400/20 rounded-lg px-4 py-3
                           text-white focus:outline-none focus:border-teal-400 transition-colors"
              >
                <option value="">Select preferred time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="notifications"
                checked={profile.notifications}
                onChange={(e) => handleProfileChange('notifications', e.target.checked)}
                className="w-5 h-5 rounded border-teal-400/20 text-teal-400 
                           focus:ring-teal-400 focus:ring-offset-0 bg-black/30"
              />
              <label htmlFor="notifications" className="text-lg">
                Enable notifications
              </label>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSaveProfile}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 text-lg"
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Saving Profile...
              </div>
            ) : (
              'Save Profile'
            )}
          </Button>

          {/* Error Message */}
          <AnimatePresence>
            {saveError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{saveError}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
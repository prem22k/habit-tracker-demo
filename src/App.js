import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Onboarding from './components/Onboarding';
import HabitSelection from './components/HabitSelection';
import UserProfile from './components/UserProfile';
import Landing from './components/Landing';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [currentStep, setCurrentStep] = useState('onboarding'); // onboarding, habits, profile

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-teal-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-400 mx-auto"></div>
          <p className="mt-4 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  const handleOnboardingComplete = () => {
    setCurrentStep('habits');
  };

  const handleHabitSelectionComplete = () => {
    setCurrentStep('profile');
  };

  const handleProfileComplete = () => {
    // Navigate to dashboard or main app
    console.log('Profile complete, ready for dashboard');
  };

  // Render the appropriate component based on current step
  switch (currentStep) {
    case 'onboarding':
      return <Onboarding onComplete={handleOnboardingComplete} />;
    case 'habits':
      return <HabitSelection onComplete={handleHabitSelectionComplete} />;
    case 'profile':
      return <UserProfile onComplete={handleProfileComplete} />;
    default:
      return <Onboarding onComplete={handleOnboardingComplete} />;
  }
}

export default App; 
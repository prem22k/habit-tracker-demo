import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Landing from './components/Landing.jsx';
import Onboarding from './components/Onboarding.jsx';
import HabitSelection from './components/HabitSelection.jsx';
import './App.css';

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasSelectedHabits, setHasSelectedHabits] = useState(false);

  if (error) {
    return <div className="error">Authentication Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  const handleHabitSelectionComplete = (selectedHabits) => {
    // Here you would typically save the habits to your backend
    console.log('Selected habits:', selectedHabits);
    setHasSelectedHabits(true);
  };

  if (isAuthenticated) {
    if (!hasCompletedOnboarding) {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }
    
    if (!hasSelectedHabits) {
      return <HabitSelection onComplete={handleHabitSelectionComplete} />;
    }

    // This will be replaced with the main dashboard component later
    return <div className="dashboard">Dashboard coming soon!</div>;
  }

  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App; 
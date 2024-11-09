import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Landing from './components/Landing';
import Onboarding from './components/Onboarding';
import HabitSelection from './components/HabitSelection';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const { isLoading, error, isAuthenticated, logout } = useAuth0();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasSelectedHabits, setHasSelectedHabits] = useState(false);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const [selectedHabits, setSelectedHabits] = useState([]);

  // Reset states when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setHasCompletedOnboarding(false);
      setHasSelectedHabits(false);
      setHasCompletedProfile(false);
      setSelectedHabits([]);
    }
  }, [isAuthenticated]);

  if (error) {
    return <div className="error">Authentication Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  const handleHabitSelectionComplete = (habits) => {
    setSelectedHabits(habits);
    setHasSelectedHabits(true);
  };

  const handleProfileComplete = () => {
    setHasCompletedProfile(true);
  };

  // Show Landing page if not authenticated
  if (!isAuthenticated) {
    return <Landing />;
  }

  // Show appropriate component based on user's progress
  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }
  
  if (!hasSelectedHabits) {
    return <HabitSelection onComplete={handleHabitSelectionComplete} />;
  }

  if (!hasCompletedProfile) {
    return (
      <UserProfile 
        onComplete={handleProfileComplete}
        selectedHabits={selectedHabits}
      />
    );
  }

  return <div className="dashboard">Dashboard coming soon!</div>;
}

export default App; 
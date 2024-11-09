import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    goal: '',
    preferredTime: 'morning'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save user data and redirect to habit selection
      navigate('/habit-selection');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="onboarding-step"
          >
            <h2>Welcome! Let's get to know you</h2>
            <div className="input-group">
              <label htmlFor="name">What should we call you?</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="onboarding-input"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="onboarding-step"
          >
            <h2>Set Your Main Goal</h2>
            <div className="input-group">
              <label htmlFor="goal">What's your primary goal?</label>
              <textarea
                id="goal"
                name="goal"
                value={userData.goal}
                onChange={handleInputChange}
                placeholder="e.g., Build a consistent workout routine"
                className="onboarding-input"
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="onboarding-step"
          >
            <h2>Choose Your Preferred Time</h2>
            <div className="input-group">
              <label>When are you most productive?</label>
              <div className="time-options">
                <button
                  className={`time-option ${userData.preferredTime === 'morning' ? 'selected' : ''}`}
                  onClick={() => handleInputChange({ target: { name: 'preferredTime', value: 'morning' } })}
                >
                  Morning
                </button>
                <button
                  className={`time-option ${userData.preferredTime === 'afternoon' ? 'selected' : ''}`}
                  onClick={() => handleInputChange({ target: { name: 'preferredTime', value: 'afternoon' } })}
                >
                  Afternoon
                </button>
                <button
                  className={`time-option ${userData.preferredTime === 'evening' ? 'selected' : ''}`}
                  onClick={() => handleInputChange({ target: { name: 'preferredTime', value: 'evening' } })}
                >
                  Evening
                </button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        <div className="progress-indicator">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`progress-dot ${step >= num ? 'active' : ''}`}
            />
          ))}
        </div>

        {renderStep()}

        <motion.button
          className="next-button"
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={
            (step === 1 && !userData.name) ||
            (step === 2 && !userData.goal)
          }
        >
          {step === 3 ? 'Get Started' : 'Next'} <ArrowRight className="button-icon" />
        </motion.button>
      </div>
    </div>
  );
};

export default Onboarding; 
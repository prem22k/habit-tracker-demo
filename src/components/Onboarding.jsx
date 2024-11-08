import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowRight, CheckCircle, BarChart2, Calendar, Loader } from 'lucide-react';
import './Onboarding.css';

const slides = [
  {
    title: "Adaptive Tracking",
    description: "Customize your habit tracking to fit your unique lifestyle and goals.",
    icon: <Calendar className="feature-icon" />,
  },
  {
    title: "Performance Analysis",
    description: "Gain insights into your progress with detailed analytics and visualizations.",
    icon: <BarChart2 className="feature-icon" />,
  },
  {
    title: "Smart Rescheduling",
    description: "Automatically adjust your habits based on your performance and schedule.",
    icon: <CheckCircle className="feature-icon" />,
  },
];

const Onboarding = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setIsLoading(true);
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 2000);
  };

  const nextSlide = () => {
    if (currentSlide === slides.length) {
      handleComplete();
    } else {
      setCurrentSlide((prev) => (prev + 1) % (slides.length + 1));
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (slides.length + 1)) % (slides.length + 1));
  };

  return (
    <div className="onboarding-wrapper">
      {/* Add Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="w-1/3 h-2 bg-[#5EEAD4] rounded-full"></div>
          <div className="w-1/3 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-1/3 h-2 bg-gray-600 rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-bold">Onboarding</span>
          <span>Habit Selection</span>
          <span>Profile Setup</span>
        </div>
      </div>

      {/* Background Animation */}
      <div className="background-animation">
        <svg className="background-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,0 L100,0 L100,100 L0,100 Z"
            fill="none"
            stroke="rgba(20, 184, 166, 0.1)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          />
        </svg>
      </div>

      {/* Welcome Screen */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-screen"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="loading-icon" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="loading-text"
            >
              Preparing your habit journey...
            </motion.p>
          </motion.div>
        ) : (
          <>
            {currentSlide === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="welcome-screen"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="logo-container"
                >
                  <div className="logo-text">
                    <span>1</span>
                    <span className="percent-sign">
                      %
                      <motion.div
                        className="percent-line"
                        initial={{ height: 0 }}
                        animate={{ height: 32 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      />
                    </span>
                  </div>
                  <h1 className="app-name">Habit Tracker</h1>
                </motion.div>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="welcome-text"
                >
                  Build Habits, 1% at a Time
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button
                    size="lg"
                    onClick={nextSlide}
                    className="start-button"
                  >
                    Get Started
                    <ArrowRight className="button-icon" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Tutorial Slides */}
            {currentSlide > 0 && currentSlide <= slides.length && (
              <motion.div
                key={`slide-${currentSlide}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="slide-content"
              >
                <div className="slide-icon">{slides[currentSlide - 1].icon}</div>
                <h2>{slides[currentSlide - 1].title}</h2>
                <p>{slides[currentSlide - 1].description}</p>
                <div className="navigation-buttons">
                  <Button variant="outline" onClick={prevSlide}>
                    Back
                  </Button>
                  <Button onClick={nextSlide}>
                    {currentSlide === slides.length ? "Let's Begin" : "Next"}
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="progress-dots">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`progress-dot ${index + 1 === currentSlide ? 'active' : ''}`}
            initial={false}
            animate={{
              scale: index + 1 === currentSlide ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Onboarding; 
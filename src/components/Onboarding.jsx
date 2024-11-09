'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, BarChart2, Calendar, Loader2 } from "lucide-react"
import { Button } from "./ui/Button"
import LogoutButton from './ui/LogoutButton'

const slides = [
  {
    title: "Adaptive Tracking",
    description: "Customize your habit tracking to fit your unique lifestyle and goals.",
    icon: <Calendar className="w-16 h-16 text-teal-400" />,
  },
  {
    title: "Performance Analysis",
    description: "Gain insights into your progress with detailed analytics and visualizations.",
    icon: <BarChart2 className="w-16 h-16 text-teal-400" />,
  },
  {
    title: "Smart Rescheduling",
    description: "Automatically adjust your habits based on your performance and schedule.",
    icon: <CheckCircle className="w-16 h-16 text-teal-400" />,
  },
]

export default function Onboarding({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleComplete = () => {
    setIsLoading(true)
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false)
      onComplete()
    }, 2000)
  }

  const nextSlide = () => {
    if (currentSlide === slides.length) {
      handleComplete()
    } else {
      setCurrentSlide((prev) => (prev + 1) % (slides.length + 1))
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (slides.length + 1)) % (slides.length + 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-teal-900 text-white relative">
      {/* Logout Button */}
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>

      {/* Background graphic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q50,0 100,50 T0,50"
            fill="none"
            stroke="rgba(20, 184, 166, 0.1)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-[60vh]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-16 h-16 text-teal-400" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-xl"
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
                  className="flex flex-col items-center justify-center h-[60vh]"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-8"
                  >
                    <div className="text-6xl font-bold flex items-center justify-center mb-2">
                      <span>1</span>
                      <span className="relative">
                        %
                        <motion.div
                          className="absolute -right-1 top-0 h-12 w-0.5 bg-teal-400"
                          initial={{ height: 0 }}
                          animate={{ height: 48 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                        />
                      </span>
                    </div>
                    <h1 className="text-3xl font-semibold">Habit Tracker</h1>
                  </motion.div>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-2xl mb-8"
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
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
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
                  className="flex flex-col items-center justify-center h-[60vh]"
                >
                  <div className="mb-8">{slides[currentSlide - 1].icon}</div>
                  <h2 className="text-3xl font-semibold mb-4">
                    {slides[currentSlide - 1].title}
                  </h2>
                  <p className="text-xl mb-8 max-w-md text-center">
                    {slides[currentSlide - 1].description}
                  </p>
                  <div className="flex justify-between w-full max-w-xs">
                    <Button variant="outline" onClick={prevSlide}>
                      Back
                    </Button>
                    <Button
                      onClick={nextSlide}
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      {currentSlide === slides.length ? "Let's Begin" : "Next"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="flex justify-center items-center mt-8">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index + 1 === currentSlide ? 'bg-teal-400' : 'bg-gray-400'
              }`}
              initial={false}
              animate={{
                scale: index + 1 === currentSlide ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 
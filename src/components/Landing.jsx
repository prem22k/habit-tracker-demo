import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/Button';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Input } from './ui/Input';

const Landing = () => {
  const { loginWithRedirect, isLoading } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-teal-900 text-white relative overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background graphic */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: '#006D5B', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad)" />
          <path d="M0,50 Q50,0 100,50 T0,50" fill="none" stroke="#006D5B" strokeWidth="0.1" strokeOpacity="0.5" />
          <path d="M0,50 Q50,100 100,50 T0,50" fill="none" stroke="#006D5B" strokeWidth="0.1" strokeOpacity="0.5" />
        </svg>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black/80 backdrop-blur-md py-4' : 'py-6'
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <motion.div
              className="text-2xl font-bold flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span>1</span>
              <span className="relative">
                %
                <motion.div
                  className="absolute -right-0.5 top-0 w-0.5 h-6 bg-teal-400"
                  initial={{ height: 0 }}
                  animate={{ height: 24 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                />
              </span>
            </motion.div>
            <span className="text-lg font-medium">Habit Tracker</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollTo('features')} 
                    className="text-gray-300 hover:text-white transition-colors">
              Features
            </button>
            <button onClick={() => scrollTo('testimonials')} 
                    className="text-gray-300 hover:text-white transition-colors">
              Testimonials
            </button>
            <Button variant="outline" onClick={() => loginWithRedirect()} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Log In'}
            </Button>
            <Button onClick={() => loginWithRedirect()}>
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md py-4 px-4 space-y-4">
            <button 
              onClick={() => {
                scrollTo('features');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => {
                scrollTo('testimonials');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Testimonials
            </button>
            <div className="px-4 space-y-2">
              <Button 
                variant="outline" 
                onClick={() => loginWithRedirect()}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Log In'}
              </Button>
              <Button 
                onClick={() => loginWithRedirect()}
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build Habits{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">
                1% Better
              </span>
              {' '}Every Day
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Track your progress, stay motivated, and achieve your goals with our intuitive habit tracking app.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => loginWithRedirect()} className="w-full sm:w-auto">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Adaptive Tracking",
                description: "Customize your habit tracking to fit your unique lifestyle and goals."
              },
              {
                title: "Performance Analysis",
                description: "Gain insights into your progress with detailed analytics and visualizations."
              },
              {
                title: "Smart Rescheduling",
                description: "Automatically adjust your habits based on your performance and schedule."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-teal-400/20 hover:border-teal-400/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "This app has completely transformed my daily routine. I'm more productive and focused than ever!",
                author: "Sarah K., Entrepreneur"
              },
              {
                quote: "The 1% Habit Tracker made it easy for me to build consistent habits and achieve my fitness goals.",
                author: "Mike L., Fitness Enthusiast"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-teal-400/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-lg mb-4 text-gray-300 italic">"{testimonial.quote}"</p>
                <p className="text-teal-400">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-teal-900/50 to-black/50 backdrop-blur-md">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-8">Join 10,000+ users already building better habits.</p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button onClick={() => loginWithRedirect()}>
                Get Started
              </Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">1%</span>
              <span>Habit Tracker</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} 1% Habit Tracker. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
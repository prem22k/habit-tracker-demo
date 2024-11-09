import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: '/onboarding' }
      });
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="landing-page">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      <header className={`header ${isHeaderScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">
              1<span className="percent-sign">%</span>
            </span>
            <span className="logo-subtext">Habit Tracker</span>
          </div>

          <nav className="desktop-nav">
            <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
            <button onClick={() => scrollToSection('testimonials')} className="nav-link">Testimonials</button>
            <button onClick={handleGetStarted} className="nav-link">Get Started</button>
          </nav>

          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <ChevronDown />
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="mobile-nav">
            <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
            <button onClick={() => scrollToSection('testimonials')} className="nav-link">Testimonials</button>
            <button onClick={handleGetStarted} className="nav-link">Get Started</button>
          </nav>
        )}
      </header>

      <main>
        <motion.section 
          className="hero"
          style={{ opacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Build Better Habits
            <br />
            <span className="accent">One Day</span> at a Time
          </motion.h1>

          <motion.p
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Track your habits, build consistency, and transform your life with our
            science-backed habit tracking system.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="cta-button"
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <ArrowRight className="button-icon" />
            </motion.button>
          </motion.div>
        </motion.section>

        <section id="features" className="features">
          <h2>Why Choose 1% Habit Tracker?</h2>
          <motion.div 
            className="features-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="feature-card">
              <h3>Smart Tracking</h3>
              <p>Intelligent habit tracking that adapts to your schedule and lifestyle</p>
            </div>
            <div className="feature-card">
              <h3>Visual Progress</h3>
              <p>Beautiful visualizations of your progress to keep you motivated</p>
            </div>
            <div className="feature-card">
              <h3>Daily Insights</h3>
              <p>Get personalized insights and recommendations for improvement</p>
            </div>
          </motion.div>
        </section>

        <section id="testimonials" className="testimonials">
          <h2>What Our Users Say</h2>
          <motion.div 
            className="testimonials-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "This app has completely transformed how I approach my daily habits. The 1% improvement
                concept really works!"
              </p>
              <p className="testimonial-author">- Sarah J.</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "Simple, intuitive, and effective. Exactly what I needed to build better habits."
              </p>
              <p className="testimonial-author">- Michael R.</p>
            </div>
          </motion.div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Start Your Journey Today</h2>
            <p>Join thousands of others building better habits</p>
            <motion.button
              className="cta-button"
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now <ArrowRight className="button-icon" />
            </motion.button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">1%</span>
            <span className="logo-subtext">Habit Tracker</span>
          </div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#privacy">Privacy</a>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} 1% Habit Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
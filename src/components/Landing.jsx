import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/Button';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import './Landing.css';
import { Input } from './ui/Input';

const Landing = () => {
  const { loginWithRedirect } = useAuth0();
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
    <div className="landing-page">
      {/* Add progress bar */}
      <motion.div
        className="progress-bar"
        style={{ scaleX }}
      />

      {/* Background graphic */}
      <div className="background-graphic">
        <svg className="background-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
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

      <header className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo">
            <motion.div
              className="logo-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span>1</span>
              <span className="percent-sign">
                %
                <motion.div
                  className="percent-line"
                  initial={{ height: 0 }}
                  animate={{ height: 24 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                />
              </span>
            </motion.div>
            <span className="logo-subtext">Habit Tracker</span>
          </div>
          
          <nav className="desktop-nav">
            <button onClick={() => scrollTo('features')} className="nav-link">Features</button>
            <button onClick={() => scrollTo('testimonials')} className="nav-link">Testimonials</button>
            <Button 
              variant="outline" 
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
            <Button onClick={() => loginWithRedirect()}>
              Get Started
            </Button>
          </nav>

          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mobile-nav">
            <button 
              onClick={() => {
                scrollTo('features');
                setIsMenuOpen(false);
              }} 
              className="nav-link"
            >
              Features
            </button>
            <button 
              onClick={() => {
                scrollTo('testimonials');
                setIsMenuOpen(false);
              }} 
              className="nav-link"
            >
              Testimonials
            </button>
            <Button 
              variant="outline" 
              onClick={() => loginWithRedirect()}
              className="full-width"
            >
              Log In
            </Button>
            <Button 
              onClick={() => loginWithRedirect()}
              className="full-width"
            >
              Get Started
            </Button>
          </nav>
        )}
      </header>

      <main>
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>
              Build Habits <span className="accent">1% Better</span> Every Day
            </h1>
            <p className="hero-text">
              Track your progress, stay motivated, and achieve your goals with our intuitive habit tracking app.
            </p>
            <div className="hero-buttons">
              <Button size="lg" onClick={() => loginWithRedirect()}>
                Get Started Now
                <ArrowRight className="button-icon" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </section>

        <section id="features" className="features">
          <h2>Key Features</h2>
          <div className="features-grid">
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
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
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
                className="testimonial-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="testimonial-quote">{testimonial.quote}</p>
                <p className="testimonial-author">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join 10,000+ users already building better habits.</p>
          <form className="cta-form">
            <Input
              type="email"
              placeholder="Enter your email"
              className="cta-input"
            />
            <Button 
              onClick={() => loginWithRedirect()}
              className="cta-button"
            >
              Get Started
            </Button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">1%</span>
            <span>Habit Tracker</span>
          </div>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} 1% Habit Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
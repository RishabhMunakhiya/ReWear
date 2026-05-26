import { useState } from 'react';
import IntroSequence from './components/IntroSequence';
import PremiumBackground from './components/PremiumBackground';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import FeaturedItems from './components/FeaturedItems';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}
      
      <main className={`app-container ${!showIntro ? 'visible' : ''}`}>
        <PremiumBackground />

        <nav className="navbar">
          <div className="nav-brand">
            <div className="brand-logo"></div>
            <span>ReWear</span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#featured">Featured</a>
            <a href="#how-it-works">How It Works</a>
          </div>
          <button className="nav-waitlist">Join waitlist</button>
        </nav>

        <div className="scroll-content">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <FeaturedItems />
          <HowItWorks />
          <Testimonials />
          <Footer />
        </div>
      </main>
    </>
  )
}

export default App;

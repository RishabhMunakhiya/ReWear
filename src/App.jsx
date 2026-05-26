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
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}
      
      <main className={`app-container ${!showIntro ? 'visible' : ''}`}>
        <PremiumBackground />

        <Navbar />

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

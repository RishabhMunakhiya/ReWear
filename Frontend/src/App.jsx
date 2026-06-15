import { useState } from 'react';
import IntroSequence from './Components/IntroSequence';
import PremiumBackground from './Components/PremiumBackground';
import HeroSection from './Components/HeroSection';
import AboutSection from './Components/AboutSection';
import ServicesSection from './Components/ServicesSection';
import FeaturedItems from './Components/FeaturedItems';
import HowItWorks from './Components/HowItWorks';
import Testimonials from './Components/Testimonials';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import './Styles/App.css';

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

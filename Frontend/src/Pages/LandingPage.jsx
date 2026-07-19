import React, { useState } from 'react';
import IntroSequence from '../Components/IntroSequence';
import PremiumBackground from '../Components/PremiumBackground';
import HeroSection from '../Components/HeroSection';
import AboutSection from '../Components/AboutSection';
import ServicesSection from '../Components/ServicesSection';
import FeaturedItems from '../Components/FeaturedItems';
import HowItWorks from '../Components/HowItWorks';
import AIRecommendations from '../Components/AIRecommendations';
import Testimonials from '../Components/Testimonials';
import Footer from '../Components/Footer';

const LandingPage = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}
      <main className={`app-container ${!showIntro ? 'visible' : ''}`}>
        <PremiumBackground />
        <div className="scroll-content">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <FeaturedItems />
          <HowItWorks />
          <AIRecommendations />
          <Testimonials />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default LandingPage;

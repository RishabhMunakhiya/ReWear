import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Cinematic Dimensional Exit Transformations
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0.3, 1], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(40px)"]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div ref={containerRef} className="hero-scroll-container">
      <div className="hero-sticky-layer">
        <motion.div 
          className="hero-content"
          style={{
            scale,
            y,
            opacity,
            filter: blur,
            z: translateZ
          }}
        >
          <div className="hero-badge">NEW SPRING UPDATE</div>
          <h1 className="hero-title">
            Your wardrobe deserves<br />to stand out
          </h1>
          <p className="hero-subtitle">
            Upload your clothes and let our AI platform transform them into<br />
            polished, sustainable exchanges in seconds.
          </p>
          <button className="hero-btn">Watch video</button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

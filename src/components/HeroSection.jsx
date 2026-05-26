import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Premium SaaS Parallax Transformations
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(12px)"]);

  return (
    <div ref={containerRef} className="hero-scroll-container">
      <div className="hero-sticky-layer">
        <motion.div style={{ scale, y, opacity, filter: blur, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
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
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

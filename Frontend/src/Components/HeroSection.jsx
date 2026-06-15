import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import watchVideo from '../Assets/watch.mp4';
import '../Styles/HeroSection.css';

const HeroSection = () => {
  const containerRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
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
          <button className="hero-btn" onClick={() => setIsVideoOpen(true)}>Watch video</button>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div 
              className="video-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <button className="video-close-btn" onClick={() => setIsVideoOpen(false)}>×</button>
              <div className="video-wrapper">
                <video 
                  width="100%" 
                  height="100%" 
                  src={watchVideo} 
                  controls 
                  autoPlay 
                  playsInline
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;

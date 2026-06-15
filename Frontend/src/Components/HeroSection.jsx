import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
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
          <div className="hero-badge">AI-POWERED MATCHING</div>
          <h1 className="hero-title">
            The future of sustainable<br />fashion exchange
          </h1>
          <p className="hero-subtitle">
            Swap your premium clothing with our community. Upload items,<br />
            get AI-driven style matches, and reduce your carbon footprint instantly.
          </p>
          <div className="hero-actions">
            <button className="hero-btn" onClick={() => console.log('Navigate to Marketplace')}>Start Swapping</button>
            <button className="hero-btn secondary" onClick={() => console.log('Navigate to Upload Item')}>Upload Your First Item</button>
          </div>
          <button className="hero-video-link" onClick={() => setIsVideoOpen(true)}>
            <PlayCircle size={18} /> Watch how it works
          </button>
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

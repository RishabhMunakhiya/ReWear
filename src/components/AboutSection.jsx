import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import './AboutSection.css';

const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      animate(0, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1], // cinematic ease out
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest) + suffix;
          }
        }
      });
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title">The Future of Circular Fashion</h2>
          <p className="section-subtitle">
            We're building the world's most advanced AI-driven community exchange,
            where sustainable luxury meets seamless technology.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div 
            className="about-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="card-glow"></div>
            <h3 className="card-stat"><AnimatedNumber value={500} suffix="K+" /></h3>
            <p className="card-label">Items Exchanged</p>
          </motion.div>
          
          <motion.div 
            className="about-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-glow"></div>
            <h3 className="card-stat"><AnimatedNumber value={2} suffix="M lbs" /></h3>
            <p className="card-label">CO2 Prevented</p>
          </motion.div>

          <motion.div 
            className="about-card glass-card mission-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card-glow"></div>
            <h3>Our Mission</h3>
            <p>
              By leveraging machine learning to perfectly match tastes and sizes, 
              we ensure every piece of high-quality clothing finds a second life, 
              dramatically reducing the fashion industry's carbon footprint.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

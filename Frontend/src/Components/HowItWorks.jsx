import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../Styles/HowItWorks.css';

const steps = [
  { title: "Upload Item", desc: "Take a picture of the clothing you want to exchange." },
  { title: "AI Verification", desc: "Our system analyzes the brand, condition, and value." },
  { title: "Find Matches", desc: "Get matched with clothes that fit your exact style and size." },
  { title: "Exchange Clothing", desc: "Ship your item and receive your new wardrobe piece." },
  { title: "Earn Points", desc: "Gain sustainability points for reducing your carbon footprint." }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="hiw-section">
      <div className="hiw-container">
        <div className="hiw-header">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            How It Works
          </motion.h2>
        </div>

        <div className="hiw-timeline">
          <div className="timeline-line"></div>
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              className="timeline-step"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="step-marker">
                <div className="step-glow"></div>
                <span>{idx + 1}</span>
              </div>
              <div className="step-content glass-card">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

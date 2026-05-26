import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  { name: "Alex Chen", handle: "@alexc", review: "ReWear completely transformed how I cycle my wardrobe. The AI matches are eerie in their accuracy.", avatarClass: "avatar-1" },
  { name: "Sarah Jenkins", handle: "@sarahj", review: "Luxury fashion exchange has never felt so secure. The digital authentication is a game changer.", avatarClass: "avatar-2" },
  { name: "David Kim", handle: "@dkim", review: "I've reduced my carbon footprint by 30% this year alone just by trading through this platform.", avatarClass: "avatar-3" }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-center"
        >
          Community Voices
        </motion.h2>

        <div className="testimonials-grid">
          {testimonials.map((test, idx) => (
            <motion.div 
              key={idx}
              className="testimonial-card glass-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <div className="test-header">
                <div className={`test-avatar ${test.avatarClass}`}></div>
                <div className="test-meta">
                  <h4>{test.name}</h4>
                  <span>{test.handle}</span>
                </div>
              </div>
              <p className="test-review">"{test.review}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

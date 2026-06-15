import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle, RefreshCcw } from 'lucide-react';
import '../Styles/AIRecommendations.css';

const AIRecommendations = () => {
  return (
    <section id="ai-showcase" className="ai-section">
      <div className="ai-container">
        <div className="ai-content">
          <motion.div 
            className="ai-text-panel"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={14} /> AI ENGINE V2.0
            </div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Perfect Matches,<br/>Zero Guesswork</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>
              Our proprietary neural network analyzes over 50 data points from your uploaded items 
              to find perfect 1:1 exchanges. We guarantee the fit, style, and value.
            </p>
            <ul className="ai-feature-list">
              <li><CheckCircle size={18} className="ai-icon"/> 99% Size Matching Accuracy</li>
              <li><CheckCircle size={18} className="ai-icon"/> Personalized Style Curations</li>
              <li><CheckCircle size={18} className="ai-icon"/> Automated Value Authentication</li>
            </ul>
            <button className="hero-btn secondary" style={{ marginTop: '20px' }} onClick={() => console.log('Navigate to AI Match Info')}>
              Learn about our AI
            </button>
          </motion.div>

          <motion.div 
            className="ai-visual-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="ai-match-card glass-card">
              <div className="ai-card-glow"></div>
              <div className="match-header">
                <span className="match-score">98% Match</span>
                <span className="match-status">Ready to Swap</span>
              </div>
              <div className="match-items">
                <div className="item-box">
                  <span className="item-label">Your Item</span>
                  <div className="item-img-placeholder user-item"></div>
                  <span className="item-name">Vintage Denim</span>
                </div>
                <div className="swap-icon-container">
                  <RefreshCcw size={24} className="swap-icon" />
                </div>
                <div className="item-box">
                  <span className="item-label">Suggested Match</span>
                  <div className="item-img-placeholder match-item"></div>
                  <span className="item-name">Oversized Hoodie</span>
                </div>
              </div>
              <div className="match-metrics">
                <div className="metric"><span className="metric-val">100%</span> Size Match</div>
                <div className="metric"><span className="metric-val">95%</span> Style Match</div>
                <div className="metric"><span className="metric-val">+200</span> Impact Score</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;

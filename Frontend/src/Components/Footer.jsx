import React from 'react';
import { MessageCircle, Globe, Mail } from 'lucide-react';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-glow"></div>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">ReWear</h2>
            <p>Redefining circular fashion through artificial intelligence and community.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); console.log('Navigate to Marketplace'); }}>Explore</a>
              <a href="#" onClick={(e) => { e.preventDefault(); console.log('Navigate to Upload Form'); }}>Upload Item</a>
              <a href="#" onClick={(e) => { e.preventDefault(); console.log('Navigate to Community Page'); }}>Community</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#how-it-works">How It Works</a>
              <a href="#about">About</a>
            </div>
            <div className="link-group">
              <h4>Connect</h4>
              <div className="social-icons">
                <a href="#" className="social-icon"><MessageCircle size={20} /></a>
                <a href="#" className="social-icon"><Globe size={20} /></a>
                <a href="#" className="social-icon"><Mail size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ReWear Inc. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" onClick={(e) => { e.preventDefault(); console.log('Navigate to Privacy Page'); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); console.log('Navigate to Terms Page'); }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

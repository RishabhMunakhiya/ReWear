import React from 'react';
import { motion } from 'framer-motion';
import './FeaturedItems.css';

const items = [
  { name: "Cyberpunk Jacket v2", condition: "Near Mint", price: "120 RX", tag: "Premium" },
  { name: "Neon Sneakers", condition: "Good", price: "85 RX", tag: "Trending" },
  { name: "Holographic Visor", condition: "Mint", price: "250 RX", tag: "Rare" },
];

const FeaturedItems = () => {
  return (
    <section id="featured" className="featured-section">
      <div className="featured-container">
        <div className="featured-header">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Curated Collection
          </motion.h2>
        </div>

        <div className="featured-grid">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className="featured-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div className="featured-image-placeholder">
                <span className="featured-tag">{item.tag}</span>
                <div className="placeholder-shape"></div>
              </div>
              <div className="featured-info">
                <h3 className="featured-name">{item.name}</h3>
                <p className="featured-condition">{item.condition}</p>
                <div className="featured-footer">
                  <span className="featured-price">{item.price}</span>
                  <button className="trade-btn">Trade</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;

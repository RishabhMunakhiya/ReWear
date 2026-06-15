import React from 'react';
import { motion } from 'framer-motion';
import '../Styles/FeaturedItems.css';

const items = [
  { name: "Vintage Denim Jacket", condition: "Excellent", size: "Medium", category: "Outerwear", points: "150 Pts", owner: "AlexM" },
  { name: "Oversized Minimalist Hoodie", condition: "Like New", size: "Large", category: "Streetwear", points: "80 Pts", owner: "SamStyles" },
  { name: "Classic Formal Shirt", condition: "Good", size: "Small", category: "Formal", points: "60 Pts", owner: "Jordan99" },
  { name: "Y2K Cargo Pants", condition: "Excellent", size: "32", category: "Streetwear", points: "120 Pts", owner: "TaylorV" },
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
                <span className="featured-tag">{item.category}</span>
                <div className="placeholder-shape"></div>
              </div>
              <div className="featured-info">
                <h3 className="featured-name">{item.name}</h3>
                <div className="featured-meta">
                  <span className="meta-badge">Size: {item.size}</span>
                  <span className="meta-badge">Cond: {item.condition}</span>
                  <span className="meta-badge">By: {item.owner}</span>
                </div>
                <div className="featured-footer">
                  <span className="featured-price">{item.points}</span>
                  <div className="featured-actions">
                    <button className="view-btn" onClick={() => console.log('Navigate to Item Details')}>Details</button>
                    <button className="trade-btn" onClick={() => console.log('Open Exchange Request Modal')}>Request</button>
                  </div>
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

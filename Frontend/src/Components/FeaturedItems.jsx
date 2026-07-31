import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../Contexts/ModalContext';
import '../Styles/FeaturedItems.css';

const fallbackItems = [
  { title: "Vintage Denim Jacket", condition: "Excellent", size: "Medium", category: "Outerwear", rewearPointsValue: "150", owner: { name: "AlexM" } },
  { title: "Oversized Minimalist Hoodie", condition: "Like New", size: "Large", category: "Streetwear", rewearPointsValue: "80", owner: { name: "SamStyles" } },
  { title: "Classic Formal Shirt", condition: "Good", size: "Small", category: "Formal", rewearPointsValue: "60", owner: { name: "Jordan99" } },
  { title: "Y2K Cargo Pants", condition: "Excellent", size: "32", category: "Streetwear", rewearPointsValue: "120", owner: { name: "TaylorV" } },
];

const FeaturedItems = () => {
  const { openModal } = useModal();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/items');
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setItems(data);
          } else {
            setItems(fallbackItems);
          }
        } else {
          setItems(fallbackItems);
        }
      } catch (err) {
        setItems(fallbackItems);
      }
    };
    fetchItems();
  }, []);

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
                {item.image && (
                  <img 
                    src={item.image.startsWith('http') ? item.image : `http://localhost:5000/${item.image.replace(/\\/g, '/')}`} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
                  />
                )}
                <span className="featured-tag" style={{ zIndex: 2 }}>{item.category}</span>
                {!item.image && <div className="placeholder-shape"></div>}
              </div>
              <div className="featured-info">
                <h3 className="featured-name">{item.title || item.name}</h3>
                <div className="featured-meta">
                  <span className="meta-badge">Size: {item.size}</span>
                  <span className="meta-badge">Cond: {item.condition}</span>
                  <span className="meta-badge">By: {item.owner?.name || item.owner}</span>
                </div>
                <div className="featured-footer">
                  <span className="featured-price">{item.rewearPointsValue || item.points} Pts</span>
                  <div className="featured-actions">
                    <button className="view-btn" onClick={() => openModal('itemDetails', item)}>Details</button>
                    <button className="trade-btn" onClick={() => openModal('exchangeRequest', item)}>Request</button>
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

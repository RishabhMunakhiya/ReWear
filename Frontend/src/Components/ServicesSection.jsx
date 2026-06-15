import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, RefreshCcw, Cpu, Leaf, Users } from 'lucide-react';
import '../Styles/ServicesSection.css';

const services = [
  { icon: UploadCloud, title: "Upload Clothes", desc: "Digitize your wardrobe in seconds with our AI scanning tool." },
  { icon: RefreshCcw, title: "Exchange System", desc: "Frictionless peer-to-peer trading with verified authenticity." },
  { icon: Cpu, title: "AI Recommendations", desc: "Machine learning curates perfect matches for your style and size." },
  { icon: Leaf, title: "Sustainable Fashion", desc: "Reduce carbon footprint through extended garment lifecycles." },
  { icon: Users, title: "Community Marketplace", desc: "Connect with like-minded fashion enthusiasts globally." }
];

const ServicesSection = () => {
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Ecosystem Features
          </motion.h2>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="service-card glass-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="service-icon-wrapper">
                <service.icon size={32} className="service-icon" />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-hover-glow"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

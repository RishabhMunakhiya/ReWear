import React, { useMemo } from 'react';
import './PremiumBackground.css';

const PremiumBackground = () => {
  // Generate a few floating particles to create depth and atmosphere
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 50,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="premium-bg-container">
      {/* Deep black base with center teal glow */}
      <div className="bg-base-gradient"></div>

      {/* Floating Light Particles */}
      <div className="bg-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="bg-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Top Center Main Light Bloom */}
      <div className="bg-top-bloom"></div>

      {/* Smooth Glass Frosted Overlay */}
      <div className="bg-glass-pane"></div>

      {/* Cinematic vignette for deep black corners */}
      <div className="bg-vignette"></div>

      {/* Fine film grain noise */}
      <div className="bg-noise-overlay"></div>
    </div>
  );
};

export default PremiumBackground;

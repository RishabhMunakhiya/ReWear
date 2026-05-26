import React, { useEffect, useState, useRef } from 'react';
import './IntroSequence.css';

const IntroSequence = ({ onComplete }) => {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Mouse parallax effect
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      containerRef.current.style.setProperty('--mouse-x', x);
      containerRef.current.style.setProperty('--mouse-y', y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation sequence progression
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Pulse appears
      setTimeout(() => setPhase(2), 2500), // Portal opens
      setTimeout(() => setPhase(3), 4500), // Text emerges & sharpens
      setTimeout(() => setPhase(4), 7000), // Transition to landing
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 8500) // End intro
    ];

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  // Generate random particles
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const style = {
      '--x': Math.random() * 100 + 'vw',
      '--y': Math.random() * 100 + 'vh',
      '--z': (Math.random() * 600 - 300) + 'px',
      '--duration': (Math.random() * 3 + 2) + 's',
      '--delay': Math.random() * 2 + 's',
      '--size': (Math.random() * 4 + 1) + 'px',
      '--opacity': Math.random() * 0.5 + 0.2
    };
    return <div key={i} className="particle" style={style} />;
  });

  return (
    <div 
      className={`intro-container phase-${phase}`} 
      ref={containerRef}
    >
      <div className="ambient-background">
        <div className="gradient-mesh"></div>
        <div className="noise-overlay"></div>
      </div>
      
      <div className="particles-container">
        {particles}
      </div>

      <div className="portal-container">
        <div className="portal-crack"></div>
        <div className="portal-glow"></div>
      </div>

      <div className="text-container">
        <h1 className="logo-text" data-text="ReWear">
          ReWear
        </h1>
        <div className="text-reflection">ReWear</div>
      </div>
      
      <div className="glass-overlay"></div>
    </div>
  );
};

export default IntroSequence;

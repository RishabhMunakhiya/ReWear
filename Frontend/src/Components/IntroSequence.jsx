import React, { useEffect, useState } from 'react';
import '../Styles/IntroSequence.css';

const IntroSequence = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Keep loader on screen for 1.5 seconds, then fade out
    const timer = setTimeout(() => {
      setFading(true);
      // Wait for the fade-out CSS transition (0.8s) to finish before unmounting
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`simple-loader ${fading ? 'fade-out' : ''}`}>
      <h1 className="loader-logo">ReWear</h1>
    </div>
  );
};

export default IntroSequence;

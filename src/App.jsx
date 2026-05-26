import { useState } from 'react'
import IntroSequence from './components/IntroSequence'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}
      
      <main className={`landing-page ${!showIntro ? 'visible' : ''}`}>
        <nav className="glass-nav">
          <div className="nav-logo">ReWear</div>
          <div className="nav-links">
            <a href="#explore">Explore</a>
            <a href="#exchange">Exchange</a>
            <a href="#community">Community</a>
          </div>
          <button className="nav-cta">Connect Wallet</button>
        </nav>

        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">The Future of <span className="text-gradient">Fashion Exchange</span></h1>
            <p className="hero-subtitle">
              Join the next-generation community-driven clothing exchange platform. 
              Sustainable, premium, and seamless.
            </p>
            <div className="hero-actions">
              <button className="primary-btn">Start Trading</button>
              <button className="secondary-btn">View Collection</button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="glass-card main-card">
              <div className="card-image-placeholder"></div>
              <div className="card-info">
                <h3>Cyberpunk Jacket v2</h3>
                <p>Authentic • Near Mint</p>
                <div className="card-footer">
                  <span className="price">120 RX</span>
                  <button className="trade-btn">Trade</button>
                </div>
              </div>
            </div>
            <div className="glass-card floating-card-1">
              <div className="card-image-placeholder small"></div>
              <div className="card-info">
                <h4>Neon Sneakers</h4>
                <span className="price">85 RX</span>
              </div>
            </div>
          </div>
        </section>

        <div className="background-glows">
          <div className="glow glow-1"></div>
          <div className="glow glow-2"></div>
        </div>
      </main>
    </>
  )
}

export default App

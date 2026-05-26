import { useState } from 'react'
import IntroSequence from './components/IntroSequence'
import PremiumBackground from './components/PremiumBackground'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}
      
      <main className={`landing-page ${!showIntro ? 'visible' : ''}`}>
        <PremiumBackground />

        <nav className="navbar">
          <div className="nav-brand">
            <div className="brand-logo"></div>
            <span>ReWear</span>
          </div>
          <div className="nav-links">
            <a href="#blog">Blog</a>
            <a href="#changelog">Changelog</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
          </div>
          <button className="nav-waitlist">Join waitlist</button>
        </nav>

        <section className="hero">
          <div className="hero-badge">NEW SPRING UPDATE</div>
          <h1 className="hero-title">
            Your wardrobe deserves<br />to stand out
          </h1>
          <p className="hero-subtitle">
            Upload your clothes and let our platform transform them into<br />
            polished, sustainable exchanges in seconds.
          </p>
          <button className="hero-btn">Watch video</button>
        </section>

        <div className="dashboard-mockup">
          <div className="dashboard-header">
            <div className="dash-brand">
              <div className="dash-logo"></div>
              <span>ReWear</span>
            </div>
            <div className="dash-tabs">
              <span className="dash-tab active"><span className="icon">◫</span> Documents</span>
            </div>
          </div>
          <div className="dashboard-content">
            <div className="dash-sidebar">
              <div className="dash-menu-item active"><span className="icon">⊕</span> Quick Create</div>
              <div className="dash-menu-item"><span className="icon">⌂</span> Dashboard</div>
            </div>
            <div className="dash-main">
              <div className="dash-stats">
                <div className="stat-card">
                  <span className="stat-label">Total Revenue</span>
                  <span className="stat-badge green">↗ +2%</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">New Customers</span>
                  <span className="stat-badge yellow">↘ -20%</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Active Accounts</span>
                  <span className="stat-badge green">↗ +12.6%</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Growth Rate</span>
                  <span className="stat-badge green">↗ +4.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App

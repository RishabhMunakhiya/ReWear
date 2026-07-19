import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User as UserIcon, ChevronDown } from 'lucide-react';
import { useModal } from '../Contexts/ModalContext';
import { useAuth } from '../Contexts/AuthContext';
import { scrollToSection } from '../Utils/ScrollUtil';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';

const navLinks = [
  { name: 'Explore', target: 'featured' },
  { name: 'Exchange', target: 'how-it-works' },
  { name: 'Community', target: 'testimonials' },
  { name: 'About', target: 'about' },
];

const Navbar = () => {
  const { openModal } = useModal();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(target), 100);
    } else {
      scrollToSection(target);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar-premium ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-container">
        <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }}>
          <div className="brand-logo"></div>
          <span>ReWear</span>
        </Link>

        {/* Desktop Links with Magnetic Pill Hover */}
        <div className="nav-links-desktop">
          {navLinks.map((link, idx) => (
            <a 
              key={idx}
              href={`/#${link.target}`}
              className="nav-link"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => handleNavClick(e, link.target)}
            >
              <span className="nav-link-text">{link.name}</span>
              {hoveredIndex === idx && (
                <motion.div
                  className="nav-hover-pill"
                  layoutId="navPill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="auth-user-info" style={{ position: 'relative' }} onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
              <span className="auth-user-name" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserIcon size={16} /> {user.name} <ChevronDown size={14} />
              </span>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: 'var(--bg-glass)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0.5rem', display: 'flex', flexDirection: 'column', minWidth: '150px', zIndex: 100, gap: '0.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  >
                    <Link to="/dashboard" className="nav-link" style={{ padding: '0.5rem', textDecoration: 'none' }}>Profile</Link>
                    <Link to="/my-uploads" className="nav-link" style={{ padding: '0.5rem', textDecoration: 'none' }}>My Uploads</Link>
                    <Link to="/my-exchanges" className="nav-link" style={{ padding: '0.5rem', textDecoration: 'none' }}>My Exchanges</Link>
                    <Link to="/my-points" className="nav-link" style={{ padding: '0.5rem', textDecoration: 'none' }}>My Points</Link>
                    <button className="nav-link" onClick={() => { logout(); navigate('/'); }} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '0.5rem', textAlign: 'left', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.5rem' }}>Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="auth-buttons" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginRight: '1rem' }}>
              <button className="nav-link" onClick={() => openModal('login')} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.5rem' }}>Login</button>
              <button className="nav-link" onClick={() => openModal('register')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '0.5rem' }}>Register</button>
            </div>
          )}

          <button className="nav-waitlist" onClick={() => user ? openModal('upload') : openModal('login')}>
            <span>Upload Item</span>
            <div className="waitlist-glow"></div>
          </button>
          
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link, idx) => (
              <motion.a 
                key={idx}
                href={`/#${link.target}`}
                className="mobile-link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.target);
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

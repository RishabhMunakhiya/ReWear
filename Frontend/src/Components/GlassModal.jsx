import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../Contexts/ModalContext';
import { useAuth } from '../Contexts/AuthContext';
import { X, UploadCloud, CheckCircle, Cpu, RefreshCcw } from 'lucide-react';
import '../Styles/GlassModal.css';

const GlassModal = () => {
  const { activeModal, modalData, closeModal } = useModal();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (activeModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeModal, closeModal]);

  if (!activeModal) return null;

  const renderContent = () => {
    switch (activeModal) {
      case 'login':
        return <LoginModal closeModal={closeModal} />;
      case 'register':
        return <RegisterModal closeModal={closeModal} />;
      case 'upload':
        return <UploadItemModal closeModal={closeModal} />;
      case 'itemDetails':
        return <ItemDetailsModal data={modalData} closeModal={closeModal} />;
      case 'exchangeRequest':
        return <ExchangeRequestModal data={modalData} closeModal={closeModal} />;
      case 'aiInfo':
        return <AIInfoModal closeModal={closeModal} />;
      case 'exchangeProcess':
        return <ExchangeProcessModal closeModal={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="glass-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div 
          className="glass-modal-content"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="glass-modal-close" onClick={closeModal}>
            <X size={24} />
          </button>
          {renderContent()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* --- Sub Modals --- */

const LoginModal = ({ closeModal }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      closeModal();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="modal-inner">
      <h2>Login</h2>
      <p className="modal-desc">Welcome back to ReWear.</p>
      {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} className="glass-input full-width" />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="glass-input full-width" />
        <button type="submit" className="primary-modal-btn" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>Login</button>
      </form>
    </div>
  );
};

const RegisterModal = ({ closeModal }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res.success) {
      closeModal();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="modal-inner">
      <h2>Register</h2>
      <p className="modal-desc">Join the sustainable fashion community.</p>
      {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} className="glass-input full-width" />
        <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} className="glass-input full-width" />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="glass-input full-width" />
        <button type="submit" className="primary-modal-btn" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>Create Account</button>
      </form>
    </div>
  );
};

const UploadItemModal = ({ closeModal }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({ title: '', category: '', size: '', condition: '', description: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please select an image.');
    setLoading(true);
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('size', formData.size);
    data.append('condition', formData.condition);
    data.append('description', formData.description);
    data.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });
      const result = await res.json();
      if (res.ok) {
        alert('Item uploaded successfully!');
        closeModal();
        window.location.reload(); // Refresh preview
      } else {
        setError(result.message || 'Upload failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="modal-inner">
      <h2>Upload Item</h2>
      <p className="modal-desc">Add a new piece to your digital wardrobe for exchange.</p>
      {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="upload-dropzone" style={{ position: 'relative' }}>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
          <UploadCloud size={40} className="upload-icon" />
          <span>{file ? file.name : 'Drag & drop clothing image'}</span>
          <span className="upload-sub">or click to browse</span>
        </div>

        <div className="form-grid">
          <input type="text" placeholder="Item Title (e.g., Vintage Denim Jacket)" required className="glass-input full-width" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <select className="glass-input" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="" disabled>Category</option>
            <option>Outerwear</option>
            <option>Streetwear</option>
            <option>Formal</option>
          </select>
          <select className="glass-input" required value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})}>
            <option value="" disabled>Size</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>OS</option>
          </select>
          <select className="glass-input full-width" required value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}>
            <option value="" disabled>Condition</option>
            <option>Brand New</option>
            <option>Like New</option>
            <option>Excellent</option>
            <option>Good</option>
          </select>
          <textarea placeholder="Description" required className="glass-input full-width" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>

        <button type="submit" className="primary-modal-btn" style={{ marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload to Wardrobe'}
        </button>
      </form>
    </div>
  );
};

const ItemDetailsModal = ({ data, closeModal }) => {
  if (!data) return null;
  return (
    <div className="modal-inner">
      <div className="details-layout">
        <div className="details-image-placeholder" style={{ position: 'relative', overflow: 'hidden' }}>
          {data.image ? (
            <img 
              src={data.image.startsWith('http') ? data.image : `http://localhost:5000/${data.image.replace(/\\/g, '/')}`} 
              alt={data.title || data.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
            />
          ) : (
            <span>{data.category} Image</span>
          )}
        </div>
        <div className="details-info">
          <h2>{data.title || data.name}</h2>
          <div className="details-meta-grid">
            <div className="meta-item"><span>Size</span><strong>{data.size}</strong></div>
            <div className="meta-item"><span>Condition</span><strong>{data.condition}</strong></div>
            <div className="meta-item"><span>Owner</span><strong>{data.owner?.name || data.owner || 'Unknown'}</strong></div>
            <div className="meta-item"><span>Value</span><strong>{data.rewearPointsValue || data.points}</strong></div>
            <div className="meta-item highlight"><span>Sust. Score</span><strong>+45</strong></div>
          </div>
          <p className="details-desc">This premium item has been verified by our AI matching engine for authenticity and quality.</p>
          <button className="primary-modal-btn">Request Exchange</button>
        </div>
      </div>
    </div>
  );
};

const ExchangeRequestModal = ({ data, closeModal }) => {
  const [step, setStep] = useState(1);

  if (!data) data = { name: "Selected Item" };

  if (step === 2) {
    return (
      <div className="modal-inner success-state">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <CheckCircle size={80} className="success-icon" />
        </motion.div>
        <h2>Exchange Requested!</h2>
        <p className="modal-desc">The owner has been notified. We will alert you once they accept the swap.</p>
        <button className="primary-modal-btn" onClick={closeModal}>Back to Explore</button>
      </div>
    );
  }

  return (
    <div className="modal-inner">
      <h2>Confirm Exchange</h2>
      <p className="modal-desc">You are requesting to trade for <strong>{data.title || data.name}</strong>.</p>
      
      <div className="exchange-selection">
        <h3>Select an item from your wardrobe to offer:</h3>
        <div className="wardrobe-options">
          <div className="wardrobe-item selected">Your Yeezy Boost 350</div>
          <div className="wardrobe-item">Your Vintage Leather Jacket</div>
        </div>
      </div>

      <button className="primary-modal-btn" onClick={() => setStep(2)}>Confirm & Send Request</button>
    </div>
  );
};

const AIInfoModal = ({ closeModal }) => {
  return (
    <div className="modal-inner">
      <div className="modal-header-icon"><Cpu size={32} /></div>
      <h2>AI Recommendation Engine</h2>
      <p className="modal-desc">Our proprietary V2.0 Engine takes the guesswork out of sustainable fashion.</p>
      
      <div className="ai-info-grid">
        <div className="ai-info-card">
          <h4>Style Matching</h4>
          <p>We analyze the color palette, fabric texture, and brand affinity to suggest items that perfectly complement your existing wardrobe.</p>
        </div>
        <div className="ai-info-card">
          <h4>Size Matching</h4>
          <p>Our algorithms compare specific garment measurements across different brands to guarantee a 99% fit accuracy.</p>
        </div>
        <div className="ai-info-card">
          <h4>Sustainability Scoring</h4>
          <p>Every exchange calculates the exact carbon footprint and water usage saved compared to buying retail.</p>
        </div>
      </div>
      <button className="primary-modal-btn" onClick={closeModal}>Got it</button>
    </div>
  );
};

const ExchangeProcessModal = ({ closeModal }) => {
  return (
    <div className="modal-inner">
      <div className="modal-header-icon"><RefreshCcw size={32} /></div>
      <h2>Frictionless Exchange System</h2>
      <p className="modal-desc">How our secure peer-to-peer trading network operates.</p>
      
      <ul className="process-list">
        <li><strong>1. Mutual Agreement:</strong> Both parties agree to the swap via our instant messaging.</li>
        <li><strong>2. Digital Authentication:</strong> Items are digitally verified using uploaded macro photos.</li>
        <li><strong>3. Secure Shipping:</strong> Generate pre-paid, tracked shipping labels instantly.</li>
        <li><strong>4. Escrow Protection:</strong> Any exchange points or collateral is held safely until both parties receive their items.</li>
      </ul>
      <button className="primary-modal-btn" onClick={closeModal}>Close</button>
    </div>
  );
};

export default GlassModal;

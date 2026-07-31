import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { motion } from 'framer-motion';

const MyExchanges = () => {
  const { user, token } = useAuth();
  const [exchanges, setExchanges] = useState({ incoming: [], outgoing: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExchanges();
  }, [user, token]);

  const fetchExchanges = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/exchange`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setExchanges(data);
      }
    } catch (err) {
      console.error('Failed to fetch exchanges', err);
    }
    setLoading(false);
  };

  const handleAction = async (action, requestId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/exchange/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ requestId })
      });
      if (res.ok) {
        alert(`Exchange ${action}ed successfully!`);
        fetchExchanges();
      } else {
        alert('Action failed');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  if (!user || loading) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '8rem 2rem 4rem 2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Exchanges</h1>
      
      <h2 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Incoming Requests</h2>
      {exchanges.incoming.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>No incoming requests.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {exchanges.incoming.map((req, idx) => (
            <motion.div key={req._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>Someone wants your {req.item?.title}</h3>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Offered Item: {req.offeredItem?.title}</p>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', marginTop: '0.5rem', display: 'inline-block' }}>Status: {req.status}</span>
              </div>
              {req.status === 'pending' && (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => handleAction('accept', req._id)} className="primary-modal-btn" style={{ padding: '0.5rem 1rem', width: 'auto' }}>Accept</button>
                  <button onClick={() => handleAction('reject', req._id)} style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid #ff6b6b', padding: '0.5rem 1rem', borderRadius: '8px', color: '#ff6b6b', cursor: 'pointer' }}>Reject</button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <h2 style={{ marginBottom: '1rem', color: '#4caf50' }}>My Outgoing Requests</h2>
      {exchanges.outgoing.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No outgoing requests.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {exchanges.outgoing.map((req, idx) => (
            <motion.div key={req._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>You requested {req.item?.title}</h3>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Offered Item: {req.offeredItem?.title}</p>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', marginTop: '0.5rem', display: 'inline-block' }}>Status: {req.status}</span>
              </div>
              {req.status === 'accepted' && (
                <button onClick={() => handleAction('complete', req._id)} className="primary-modal-btn" style={{ padding: '0.5rem 1rem', width: 'auto', background: '#4caf50' }}>Complete Exchange</button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyExchanges;

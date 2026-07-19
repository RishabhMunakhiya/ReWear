import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MyPoints = () => {
  const { user, token } = useAuth();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/points', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPoints(data.rewearPoints || 0);
        }
      } catch (err) {
        console.error('Failed to fetch points', err);
      }
    };
    if (user) fetchPoints();
  }, [user, token]);

  if (!user) return null;

  // Mock history since transaction logging isn't fully implemented in the backend yet
  const history = [
    { type: 'earn', title: 'Upload Item Bonus', amount: 150, date: 'Today' },
    { type: 'earn', title: 'Successful Exchange', amount: 50, date: 'Yesterday' },
    { type: 'spend', title: 'Requested Vintage Jacket', amount: 120, date: '3 days ago' },
    { type: 'earn', title: 'Sustainability Bonus', amount: 20, date: '1 week ago' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '8rem 2rem 4rem 2rem' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>My Points Ledger</h1>
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '3rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))', border: '1px solid var(--accent)' }}>
        <Star color="var(--accent)" size={60} style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0' }}>Current Balance</h2>
        <p style={{ fontSize: '4rem', fontWeight: 'bold', margin: 0, color: 'white', textShadow: '0 0 20px var(--accent)' }}>{points} RWP</p>
      </motion.div>

      <h2 style={{ marginBottom: '1.5rem' }}>Transaction History</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {history.map((tx, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '50%', background: tx.type === 'earn' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 107, 107, 0.1)' }}>
                {tx.type === 'earn' ? <ArrowUpRight color="#4caf50" size={24} /> : <ArrowDownRight color="#ff6b6b" size={24} />}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{tx.title}</h3>
                <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{tx.date}</p>
              </div>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: tx.type === 'earn' ? '#4caf50' : '#ff6b6b' }}>
              {tx.type === 'earn' ? '+' : '-'}{tx.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyPoints;

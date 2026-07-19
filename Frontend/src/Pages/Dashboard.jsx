import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { User, Droplet, Leaf, RefreshCcw, Box, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({ points: 0, items: 0, exchanges: 0, carbon: 0, water: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pointsRes, sustRes, itemsRes] = await Promise.all([
          fetch('http://localhost:5000/api/users/points', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('http://localhost:5000/api/users/sustainability', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('http://localhost:5000/api/items', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        
        const pointsData = pointsRes.ok ? await pointsRes.json() : { rewearPoints: 0 };
        const sustData = sustRes.ok ? await sustRes.json() : { carbonSaved: 0, waterSaved: 0 };
        const itemsData = itemsRes.ok ? await itemsRes.json() : [];
        const myItems = itemsData.filter(i => i.owner?._id === user?._id || i.owner === user?._id);

        setStats({
          points: pointsData.rewearPoints || 0,
          items: myItems.length,
          exchanges: pointsData.totalExchanges || 0,
          carbon: sustData.carbonSaved || 0,
          water: sustData.waterSaved || 0,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };
    if (user) fetchStats();
  }, [user, token]);

  if (!user) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '8rem 2rem 4rem 2rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #6dd5ed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'white' }}>
          <User size={50} />
        </div>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>{user.name}</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.2rem' }}>{user.email}</p>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <StatCard icon={<Star color="var(--accent)" size={32} />} title="ReWear Points" value={stats.points} />
        <StatCard icon={<Box color="#4caf50" size={32} />} title="Uploaded Items" value={stats.items} />
        <StatCard icon={<RefreshCcw color="#ff9800" size={32} />} title="Total Exchanges" value={stats.exchanges} />
        <StatCard icon={<Leaf color="#4caf50" size={32} />} title="Carbon Saved" value={`${stats.carbon} lbs`} />
        <StatCard icon={<Droplet color="#2196f3" size={32} />} title="Water Saved" value={`${stats.water} gal`} />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>{icon}</div>
    <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{title}</h3>
    <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{value}</p>
  </motion.div>
);

export default Dashboard;

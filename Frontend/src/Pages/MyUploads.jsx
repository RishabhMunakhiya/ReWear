import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { motion } from 'framer-motion';
import { Trash2, Edit2 } from 'lucide-react';

const MyUploads = () => {
  const { user, token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [user, token]);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/items', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const myItems = data.filter(i => i.owner?._id === user?._id || i.owner === user?._id);
        setItems(myItems);
      }
    } catch (err) {
      console.error('Failed to fetch items', err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/items/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setItems(items.filter(item => item._id !== id));
        } else {
          alert('Failed to delete item');
        }
      } catch (err) {
        alert('Network error');
      }
    }
  };

  if (!user || loading) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '8rem 2rem 4rem 2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Uploads</h1>
      {items.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>You haven't uploaded any items yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {items.map((item, idx) => (
            <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                {item.image && (
                  <img 
                    src={`http://localhost:5000/${item.image.replace(/\\/g, '/')}`} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
                  />
                )}
                <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--accent)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 2 }}>{item.category}</span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <h3 style={{ margin: 0 }}>{item.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>Size: {item.size}</span>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>Cond: {item.condition}</span>
                </div>
                <p style={{ margin: 0, color: 'var(--accent)', fontWeight: 'bold', marginTop: '0.5rem' }}>{item.rewearPointsValue} Pts</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem' }}>
                  <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Edit2 size={16} /> Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid #ff6b6b', padding: '0.5rem 1rem', borderRadius: '8px', color: '#ff6b6b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyUploads;

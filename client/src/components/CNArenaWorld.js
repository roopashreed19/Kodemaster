import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Network, ChevronRight, Zap, Shield, Globe, Lock, Cpu, Router } from 'lucide-react';
import api from '../utils/api';

const CNArenaWorld = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
       
        const res = await api.get('/cn/all');
        setTopics(res.data);
      } catch (err) {
        console.error("Failed to map the network:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  if (loading) return <div className="loading-screen">Scanning Network Ports...</div>;

  return (
    <div className="cn-world-container" style={{ padding: '60px 40px', background: '#020617', minHeight: '100vh', color: '#f8fafc' }}>
      
      
      <header style={{ maxWidth: '1200px', margin: '0 auto 60px' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="sticky-nav">
            <button 
              onClick={() => navigate('/dashboard')} 
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Back to Dashboard
            </button>
          </div>
          <h1 style={{ fontSize: '3.5rem', display: 'flex', alignItems: 'center', gap: '20px', color: '#818cf8' }}>
            <Network size={50} /> CN ARENA MAP
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', marginTop: '10px' }}>
            Initialize your connection. Select a protocol floor to master the architecture of the modern internet.
          </p>
        </motion.div>
      </header>

     
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '25px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {topics.map((topic, index) => (
          <motion.div
            key={topic.topicId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8, borderColor: '#6366f1', boxShadow: '0 10px 30px -10px rgba(99, 102, 241, 0.4)' }}
            onClick={() => navigate(`/world/cn/${topic.topicId}`)}
            style={{
              background: '#0f172a',
              padding: '30px',
              borderRadius: '24px',
              border: '2px solid #1e293b',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            
            <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '100px', height: '100px', background: '#6366f1', filter: 'blur(60px)', opacity: 0.1 }}></div>

            <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', marginBottom: '20px' }}>
              <Router size={24} />
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{topic.title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '25px' }}>{topic.conceptTitle}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fbbf24', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <Zap size={14} fill="#fbbf24" /> +300 XP
              </div>
              <div style={{ color: '#6366f1', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                ENTER FLOOR <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CNArenaWorld;
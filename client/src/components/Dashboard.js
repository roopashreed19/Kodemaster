import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Database, Cpu, Globe, Trophy, Zap, Coins, Code2, Flame, Box } from 'lucide-react';
import ContestTimer from './ContestTimer';
import { Network } from 'lucide-react';
import api from '../utils/api';


const subjects = [
  { id: 'dsa', name: 'DSA Dungeon', icon: <BookOpen size={40} />, color: '#f87171', lore: 'Master the ancient art of Algorithms.' },
  {
    id: 'dbms',
    name: 'DBMS Kingdom',
    icon: <Database size={40} />,
    color: '#60a5fa',
    lore: 'Conquer the Relational schemas.',
    path: '/world/dbms'
  },
  { id: 'oops', name: 'OOPs Oasis', icon: <Box size={40} />, color: '#c084fc', lore: 'Master the principles of Object-Oriented Design.' },
  {
    id: 'cn',
    name: 'CN Arena',
    icon: <Network size={32} />,
    color: '#2dd4bf',
    lore: 'Route your way through the layers of the web.', // Updated lore
    path: '/world/cn'
  },
  { id: 'os', name: 'OS Outpost', icon: <Cpu size={40} />, color: '#4ade80', lore: 'Navigate the threads of scheduling.' },
  { id: 'aptitude', name: 'Aptitude Arena', icon: <Globe size={40} />, color: '#fbbf24', lore: 'Sharpen your logic for the final battle.' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ xp: 0, level: 1, coins: 0 });

  const calculateLevel = (xp) => Math.floor(Math.sqrt(xp / 100)) + 1;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/auth/me'); 
        const currentXP = res.data.xp || 0;
        
        setStats({
          xp: currentXP,
          level: calculateLevel(currentXP),
          coins: res.data.coins || 0
        });
      } catch (err) {
        console.error("Error fetching player stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-wrapper" style={{ position: 'relative', minHeight: '100vh', background: '#020617' }}>
      <div className="bg-glow"></div>

      <header className="main-nav">
        <div className="logo-section">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Zap className="logo-icon" />
          </motion.div>
          <h2>KODEMASTER</h2>
        </div>
      </header>

      <main className="hero-section">
        <div className="layout-grid" style={{ gridTemplateColumns: '1fr' }}>
          <section className="main-content">
            
            {/* 🎮 ARCADE / REST ZONE BANNER */}
            <motion.div 
              onClick={() => navigate('/arcade')}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                background: 'linear-gradient(90deg, #1e1b4b, #312e81)', 
                padding: '20px 30px', 
                borderRadius: '16px', 
                marginBottom: '40px',
                cursor: 'pointer',
                border: '1px solid #4338ca',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 10px 30px -10px rgba(67, 56, 202, 0.5)'
              }}
            >
              <div>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🎮</span> Enter the Rest Zone
                </h3>
                <p style={{ color: '#a5b4fc', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                  Bored of coding? Play mini-games and earn bonus coins!
                </p>
              </div>
              <Trophy color="#fbbf24" size={28} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-text"
              style={{ textAlign: 'center', marginBottom: '40px' }}
            >
              <h1><Flame className="inline-icon" /> CHOOSE YOUR REALM</h1>
              <p>Solve challenges to gain XP. Next rank unlocks as your logic strengthens.</p>
            </motion.div>

            <div className="world-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
              {subjects.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="world-card-premium"
                  onClick={() => navigate(`/world/${sub.id}`)}
                >
                  <div className="card-glass">
                    <div className="icon-box" style={{ background: `${sub.color}22`, color: sub.color }}>
                      {sub.icon}
                    </div>
                    <h3>{sub.name}</h3>
                    <p>{sub.lore}</p>
                    <div className="card-footer">
                      <div className="progress-bar-bg">
                        <div className="progress-fill" style={{ backgroundColor: sub.color, width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
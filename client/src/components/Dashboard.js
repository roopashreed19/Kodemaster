import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Database, Cpu, Globe, Trophy, Zap, Coins, Code2, Flame, Box } from 'lucide-react';
import ContestTimer from './ContestTimer';
import { Network } from 'lucide-react';


const subjects = [
  { id: 'dsa', name: 'DSA Dungeon', icon: <BookOpen size={40} />, color: '#f87171', lore: 'Master the ancient art of Algorithms.' },
  { id: 'dbms', name: 'DBMS Kingdom', icon: <Database size={40} />, color: '#60a5fa', lore: 'Conquer the Relational schemas.' },
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

  return (
    <div className="dashboard-wrapper">
      <div className="bg-glow"></div>
      
      <header className="main-nav">
        <div className="logo-section">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Zap className="logo-icon" />
          </motion.div>
          <h2>KODEMASTER</h2>
        </div>
        <div className="player-stats">
          <div className="stat-item"><Trophy size={18} /> <span>LVL 1</span></div>
          <div className="stat-item"><Zap size={18} /> <span>450 XP</span></div>
          <div className="stat-item"><Coins size={18} /> <span>120</span></div>
        </div>
      </header>

      <main className="hero-section">
        <div className="layout-grid">
          {/* Main Content */}
          <section className="main-content">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-text"
            >
              <h1><Flame className="inline-icon" /> CHOOSE YOUR REALM</h1>
              <p>The journey to mastery begins with a single line of code.</p>
            </motion.div>

            <div className="world-grid">
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

          <aside className="side-panel">
            <ContestTimer />
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="panel-card">

              <h3><Trophy size={20} color="#fbbf24" /> Leaderboard</h3>
              <div className="leader-list">
                <div className="leader-item"><span>1. Player_One</span> <span>2500 XP</span></div>
                <div className="leader-item"><span>2. CodeWiz</span> <span>2100 XP</span></div>
                <div className="leader-item highlight"><span>3. You</span> <span>450 XP</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="panel-card mt-20">
              <h3><Zap size={20} color="#38bdf8" /> Live Activity</h3>
              <div className="activity-feed">
                <div className="feed-item">User_42 cleared <b>Binary Search</b></div>
                <div className="feed-item">Alice reached <b>Level 5</b></div>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
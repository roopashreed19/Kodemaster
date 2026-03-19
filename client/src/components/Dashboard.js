import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Database,
  Cpu,
  Globe,
  Trophy,
  Zap,
  Coins,
  Flame,
  Box,
  Network,
  User as UserIcon,
  X,
  LogOut,
  Clock
} from 'lucide-react';
import ContestTimer from './ContestTimer';
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
  const [userData, setUserData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, leaderRes] = await Promise.all([
          api.get('/user/me'),
          api.get('/user/leaderboard')
        ]);
        setUserData(userRes.data);
        setLeaderboard(leaderRes.data);
      } catch (err) {
        console.error("Failed to sync with the Neural Network", err);
      } finally {
        // Data sync complete
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
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
            <div className="stat-item"><Trophy size={18} /> <span>LVL {userData?.user?.level || 1}</span></div>
            <div className="stat-item"><Zap size={18} /> <span>{userData?.user?.xp || 0} XP</span></div>
            <div className="stat-item"><Coins size={18} /> <span>{userData?.user?.coins || 0}</span></div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowProfile(true)}
              className="profile-trigger"
              style={{ marginLeft: '15px', cursor: 'pointer', color: '#60a5fa' }}
            >
              <UserIcon size={24} />
            </motion.div>
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
                  {leaderboard.map((player, index) => (
                    <div key={player._id} className={`leader-item ${player._id === userData?.user?._id ? 'highlight' : ''}`}>
                      <span>{index + 1}. {player.username}</span>
                      <span>{player.xp} XP</span>
                    </div>
                  ))}
                  {leaderboard.length === 0 && <div className="feed-item">Scanning rankings...</div>}
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

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, overflowY: 'auto', padding: '40px 20px' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              style={{ background: '#0f172a', border: '1px solid #1e40af', borderRadius: '32px', width: '100%', maxWidth: '600px', overflow: 'hidden', boxShadow: '0 0 50px rgba(37, 99, 235, 0.2)', margin: '40px auto' }}
            >
              {/* Profile Header */}
              <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)', padding: '40px', position: 'relative' }}>
                <button
                  onClick={() => setShowProfile(false)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: 'white', padding: '8px', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '24px', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
                    {userData?.user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '2.2rem', marginBottom: '5px' }}>{userData?.user?.username}</h2>
                    <p style={{ color: '#93c5fd', fontSize: '1.1rem' }}>User</p>
                  </div>
                </div>
              </div>

              {/* Profile Body */}
              <div style={{ padding: '40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div style={{ color: '#60a5fa', fontSize: '0.9rem', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Experience</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Zap size={24} color="#fbbf24" fill="#fbbf24" /> {userData?.user?.xp}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(192, 132, 252, 0.1)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(192, 132, 252, 0.2)' }}>
                    <div style={{ color: '#c084fc', fontSize: '0.9rem', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Level</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Trophy size={24} color="#fbbf24" fill="#fbbf24" /> {userData?.user?.level}
                    </div>
                  </div>
                </div>

                {/* Next Level Progress */}
                <div style={{ marginBottom: '35px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1rem', color: '#f8fafc', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Trophy size={18} color="#fbbf24" /> LEVEL {userData?.user?.level}
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{userData?.user?.xp % 50} / 50 XP</span>
                  </div>
                  <div style={{ height: '12px', background: '#1e293b', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((userData?.user?.xp % 50) / 50) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
                    />
                  </div>
                </div>



                <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={20} color="#3b82f6" /> RECENT ACTIVITY
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '180px', overflowY: 'auto', paddingRight: '5px' }}>
                  {userData?.recentSubmissions?.length > 0 ? (
                    userData.recentSubmissions.map((sub, i) => (
                      <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '15px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', border: '1px solid #1e293b', animation: 'fadeIn 0.5s ease-out' }}>
                        <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px', color: '#60a5fa' }}>
                          {sub.subject.toLowerCase() === 'dbms' ? <Database size={18} /> : 
                           sub.subject.toLowerCase() === 'aptitude' ? <Globe size={18} /> :
                           sub.subject.toLowerCase() === 'oops' ? <Box size={18} /> : <Zap size={18} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#f8fafc' }}>{sub.questId.replace(/-/g, ' ').toUpperCase()}</div>
                          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{sub.subject.toUpperCase()} • Score: {sub.score || 0}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: sub.status === 'success' ? '#22c55e' : '#ef4444', fontWeight: 'bold', fontSize: '0.8rem' }}>
                            {sub.status.toUpperCase()}
                          </div>
                          <div style={{ color: '#475569', fontSize: '0.7rem' }}>{new Date(sub.submittedAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '15px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', border: '1px solid #1e293b' }}>
                      <div style={{ padding: '10px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '10px', color: '#22c55e' }}>
                        <BookOpen size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>JOURNEY STARTED</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Welcome to Kodemaster!</div>
                      </div>
                      <div style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '0.8rem' }}>INITIATED</div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  style={{ width: '100%', marginTop: '40px', padding: '18px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  <LogOut size={20} /> TERMINATE SESSION
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, Globe, Zap, Code2, Monitor, Shield, Box, Trophy, LayoutDashboard } from 'lucide-react'; // Added LayoutDashboard
import api from '../../utils/api';

const icons = [
  { icon: <Database size={40} />, name: 'db' },
  { icon: <Cpu size={40} />, name: 'cpu' },
  { icon: <Globe size={40} />, name: 'web' },
  { icon: <Zap size={40} />, name: 'power' },
  { icon: <Code2 size={40} />, name: 'code' },
  { icon: <Monitor size={40} />, name: 'ui' },
  { icon: <Shield size={40} />, name: 'secure' },
  { icon: <Box size={40} />, name: 'pkg' },
];

const MemoryMatch = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setCards(deck);
  }, []);

  const handleCardClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(cards[id].name)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;
      if (cards[first].name === cards[second].name) {
        setSolved([...solved, cards[first].name]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (solved.length === icons.length && icons.length > 0) {
      setShowVictory(true);
    }
  }, [solved]);

  const claimXPRewards = async () => {
    try {
      await api.put('/user/add-xp', { xpToAdd: 30 });
      alert("🏆 Sync Successful! +30 XP");
      navigate('/arcade'); 
    } catch (err) {
      console.error("XP sync failed, returning to arcade anyway.", err);
      navigate('/arcade');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '20px', position: 'relative' }}>
      
      {/* --- BACK TO DASHBOARD BUTTON --- */}
      <button 
        onClick={() => navigate('/dashboard')} 
        style={{ 
          position: 'absolute', top: '20px', left: '20px', 
          background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', 
          color: '#94a3b8', padding: '10px 15px', borderRadius: '10px', 
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '0.9rem', transition: '0.2s', zIndex: 10
        }}
        onMouseEnter={(e) => e.target.style.background = '#1e293b'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(30, 41, 59, 0.5)'}
      >
        <LayoutDashboard size={18} /> Exit Game
      </button>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#60a5fa', margin: 0, letterSpacing: '4px', fontWeight: '900' }}>MEMORY SYNC</h1>
        <p style={{ color: '#94a3b8' }}>Match all system nodes to stabilize the core.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', maxWidth: '500px' }}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(card.name);
          return (
            <motion.div
              key={index}
              whileHover={{ scale: disabled ? 1 : 1.05 }}
              onClick={() => handleCardClick(index)}
              style={{ width: '100px', height: '100px', cursor: 'pointer', perspective: '1000px' }}
            >
              <div style={{
                width: '100%', height: '100%', position: 'relative', transition: 'transform 0.6s',
                transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'
              }}>
                <div style={{
                  position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                  background: '#1e293b', border: '2px solid #334155', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}>
                  <Zap size={20} color="#334155" />
                </div>
                <div style={{
                  position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                  background: '#3b82f6', color: '#fff', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotateY(180deg)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                }}>
                  {card.icon}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showVictory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(8px)' }}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              style={{ background: '#1e293b', padding: '50px', borderRadius: '32px', border: '1px solid #3b82f6', textAlign: 'center', maxWidth: '400px', boxShadow: '0 0 50px rgba(59, 130, 246, 0.3)' }}
            >
              <Trophy size={80} color="#fbbf24" style={{ marginBottom: '20px' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>SYSTEM STABLE</h2>
              <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Memory nodes successfully synced. Rewards authorized.</p>
              
              <div style={{ padding: '15px', background: '#0f172a', borderRadius: '12px', marginBottom: '30px' }}>
                <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.2rem' }}>+30 XP EARNED</span>
              </div>

              <button 
                onClick={claimXPRewards}
                style={{ width: '100%', padding: '16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                CLAIM & RETURN
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryMatch;
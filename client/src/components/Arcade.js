import React from 'react';
import { motion } from 'framer-motion';
// Added LayoutDashboard for the button and BrainCircuit for variety
import { Gamepad2, Grid3X3, BrainCircuit, LayoutDashboard, Zap } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

const games = [
  { id: '2048', name: 'Logic 2048', icon: <Gamepad2 />, color: '#fbbf24', xp: '50 XP for 512' },
  { id: 'tictactoe', name: 'Neural Tic-Tac-Toe', icon: <Grid3X3 />, color: '#60a5fa', xp: '20 XP for Win' },
];

const Arcade = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#020617', padding: '60px', position: 'relative' }}>
      
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
        <LayoutDashboard size={18} /> Exit Arcade
      </button>

      <h1 style={{ color: '#fff', fontSize: '3.5rem', textAlign: 'center', fontWeight: '900', letterSpacing: '-1px' }}>
        THE GAMES SECTION
      </h1>
      <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '60px', fontSize: '1.1rem' }}>
        Sharpen your reflexes. Earn small XP rewards while you rest.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {games.map((game) => (
          <motion.div 
            key={game.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              background: '#0f172a', 
              padding: '40px', 
              borderRadius: '32px', 
              border: `2px solid ${game.color}`,
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: `0 0 20px ${game.color}11`
            }}
            onClick={() => navigate(`/games/${game.id}`)}
          >
            <div style={{ color: game.color, marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              {React.cloneElement(game.icon, { size: 48 })}
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '10px' }}>{game.name}</h2>
            <div style={{ background: `${game.color}22`, padding: '8px', borderRadius: '12px', display: 'inline-block' }}>
                <span style={{ color: game.color, fontWeight: 'bold', fontSize: '0.9rem' }}>{game.xp}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Arcade;
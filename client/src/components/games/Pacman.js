import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ghost, LogOut } from 'lucide-react'; // Added LogOut icon
import api from '../../utils/api';

const GRID_SIZE = 15;
const CELL_SIZE = 30; 
const INITIAL_PACMAN = { x: 1, y: 1, dir: 0 };
const INITIAL_GHOST = { x: 13, y: 13 };

const MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,1,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,1,0,1,0,1,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const Pacman = () => {
  const [pacman, setPacman] = useState(INITIAL_PACMAN);
  const [ghost, setGhost] = useState(INITIAL_GHOST);
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); 
  const navigate = useNavigate();
  
  const pacmanRef = useRef(pacman);
  useEffect(() => { pacmanRef.current = pacman; }, [pacman]);

  useEffect(() => {
    let newDots = [];
    MAP.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 0) newDots.push(`${x}-${y}`);
      });
    });
    setDots(newDots);
  }, []);

  const isValidMove = (x, y) => MAP[y] && MAP[y][x] === 0;

  const handleKeyDown = useCallback((e) => {
    if (gameState !== 'playing') return;
    let dx = 0, dy = 0, rotation = 0;

    if (e.key === 'ArrowUp') { dy = -1; rotation = -90; }
    else if (e.key === 'ArrowDown') { dy = 1; rotation = 90; }
    else if (e.key === 'ArrowLeft') { dx = -1; rotation = 180; }
    else if (e.key === 'ArrowRight') { dx = 1; rotation = 0; }

    if (dx !== 0 || dy !== 0) {
      setPacman(prev => {
        const nx = prev.x + dx;
        const ny = prev.y + dy;
        if (isValidMove(nx, ny)) {
          const posKey = `${nx}-${ny}`;
          if (dots.includes(posKey)) {
            setDots(d => d.filter(key => key !== posKey));
            setScore(s => s + 10);
          }
          return { x: nx, y: ny, dir: rotation };
        }
        return prev;
      });
    }
  }, [dots, gameState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const ghostInterval = setInterval(() => {
      setGhost(prev => {
        const target = pacmanRef.current;
        const moves = [
          { x: prev.x + 1, y: prev.y },
          { x: prev.x - 1, y: prev.y },
          { x: prev.x, y: prev.y + 1 },
          { x: prev.x, y: prev.y - 1 },
        ].filter(m => isValidMove(m.x, m.y));

        if (moves.length === 0) return prev;

        return moves.reduce((best, curr) => {
          const dBest = Math.abs(best.x - target.x) + Math.abs(best.y - target.y);
          const dCurr = Math.abs(curr.x - target.x) + Math.abs(curr.y - target.y);
          return dCurr < dBest ? curr : best;
        });
      });
    }, 450);
    return () => clearInterval(ghostInterval);
  }, [gameState]);

  useEffect(() => {
    if (pacman.x === ghost.x && pacman.y === ghost.y) setGameState('lost');
    if (dots.length === 0 && score > 0) {
      setGameState('won');
      handleXP();
    }
  }, [pacman, ghost, dots, score]);

  const handleXP = async () => {
    try {
      await api.post('/user/add-xp', { 
        xp: 60,
        coins: 40,
        subject: 'Arcade', 
        topicId: 'pacman_core',
        status: 'success'
      });
    } catch (e) { console.error(e); }
  };

  // Shared button styles for consistency
  const btnStyle = {
    padding: '10px 25px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: '0.2s opacity'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', padding: '20px' }}>
      
      {/* Top Exit Button */}
      <button 
        onClick={() => navigate('/arcade')} 
        style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', color: '#94a3b8', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <LayoutDashboard size={18} /> Exit to Arcade
      </button>

      <h1 style={{ color: '#facc15', letterSpacing: '4px', marginBottom: '10px' }}>PACMAN.SYS</h1>
      <div style={{ fontSize: '1.2rem', color: '#60a5fa', marginBottom: '20px', fontWeight: 'bold' }}>DATA COLLECTED: {score}</div>

      <div style={{ 
        position: 'relative', 
        display: 'grid', 
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`, 
        gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        background: '#020617', 
        border: '4px solid #1e40af', 
        borderRadius: '8px', 
        boxShadow: '0 0 30px rgba(30, 64, 175, 0.3)',
        boxSizing: 'content-box',
        overflow: 'hidden'
      }}>
        {MAP.map((row, y) => row.map((cell, x) => (
          <div key={`${x}-${y}`} style={{ 
            width: `${CELL_SIZE}px`, 
            height: `${CELL_SIZE}px`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: cell === 1 ? '#1e3a8a' : 'transparent', 
            border: cell === 1 ? '1px solid #1e40af' : 'none',
            boxSizing: 'border-box'
          }}>
            {dots.includes(`${x}-${y}`) && <div style={{ width: '6px', height: '6px', background: '#fcd34d', borderRadius: '50%' }} />}
          </div>
        )))}

        <div style={{ 
          position: 'absolute', 
          width: `${CELL_SIZE}px`, 
          height: `${CELL_SIZE}px`, 
          left: pacman.x * CELL_SIZE, 
          top: pacman.y * CELL_SIZE, 
          transition: '0.1s all linear', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 3,
          transform: `rotate(${pacman.dir}deg)` 
        }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            background: '#facc15', 
            borderRadius: '50%', 
            clipPath: 'polygon(100% 0%, 100% 35%, 50% 50%, 100% 65%, 100% 100%, 0% 100%, 0% 0%)' 
          }} />
        </div>

        <div style={{ 
          position: 'absolute', 
          width: `${CELL_SIZE}px`, 
          height: `${CELL_SIZE}px`, 
          left: ghost.x * CELL_SIZE, 
          top: ghost.y * CELL_SIZE, 
          transition: '0.4s all linear', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 2 
        }}>
          <Ghost size={22} color="#f87171" fill="#f87171" />
        </div>
      </div>

      {/* Enhanced Game State Overlay */}
      {gameState !== 'playing' && (
        <div style={{ 
          marginTop: '30px', 
          background: 'rgba(15, 23, 42, 0.95)', 
          padding: '20px 40px', 
          borderRadius: '16px', 
          border: `2px solid ${gameState === 'won' ? '#22c55e' : '#f87171'}`, 
          textAlign: 'center', 
          boxShadow: '0 0 20px rgba(0,0,0,0.5)' 
        }}>
          <h2 style={{ color: gameState === 'won' ? '#22c55e' : '#f87171', marginBottom: '20px' }}>
            {gameState === 'won' ? 'SYSTEM PURGED' : 'CORE BREACHED'}
          </h2>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              onClick={() => window.location.reload()} 
              style={{ ...btnStyle, background: '#facc15', color: '#020617' }}
            >
              REBOOT SYSTEM
            </button>
            
            <button 
              onClick={() => navigate('/arcade')} 
              style={{ ...btnStyle, background: '#1e293b', color: '#f87171', border: '1px solid #f87171' }}
            >
              <LogOut size={18} /> TERMINATE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pacman;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Circle, RotateCcw, LayoutDashboard, Trophy, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [showVictory, setShowVictory] = useState(false);
  const navigate = useNavigate();

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (i) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  // Simple AI move for 'O'
  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
        if (emptyIndices.length > 0) {
          const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = board.slice();
          newBoard[randomMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner, isDraw]);

  const handleWin = () => {
    setShowVictory(true);
  };

  const claimXPRewards = async () => {
    try {
      await api.post('/user/add-xp', { 
        xp: 20, 
        coins: 30,
        subject: 'Arcade', 
        topicId: 'tictactoe',
        status: 'success',
        score: 100
      });
      navigate('/arcade');
    } catch (err) {
      console.error('Reward claim failed:', err);
      navigate('/arcade');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative' }}>
      
      {/* --- BACK TO DASHBOARD OPTION --- */}
      <button 
        onClick={() => navigate('/dashboard')} 
        style={{ 
          position: 'absolute', top: '20px', left: '20px', 
          background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', 
          color: '#94a3b8', padding: '10px 15px', borderRadius: '10px', 
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '0.9rem', transition: '0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = '#1e293b'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(30, 41, 59, 0.5)'}
      >
        <LayoutDashboard size={18} /> Exit Game
      </button>

      <h1 style={{ color: '#60a5fa', marginBottom: '20px', letterSpacing: '2px' }}>NEURAL TIC-TAC-TOE</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px' }}>
        {board.map((square, i) => (
          <div 
            key={i} 
            onClick={() => handleClick(i)} 
            style={{ 
              width: '100px', height: '100px', background: '#1e293b', 
              border: '2px solid #334155', borderRadius: '12px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: 'pointer', transition: '0.2s' 
            }}
          >
            {square === 'X' && <X size={48} color="#60a5fa" />}
            {square === 'O' && <Circle size={48} color="#f87171" />}
          </div>
        ))}
      </div>

      <div style={{ height: '80px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        {winner === 'X' && !showVictory && (
          <button onClick={handleWin} style={{ padding: '12px 24px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}>
            CLAIM XP
          </button>
        )}
        
        {(winner === 'O' || isDraw) && (
          <button onClick={() => setBoard(Array(9).fill(null))} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
            <RotateCcw size={20} /> RETRY SYSTEM
          </button>
        )}
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
              style={{ background: '#1e293b', padding: '50px', borderRadius: '32px', border: '1px solid #22c55e', textAlign: 'center', maxWidth: '400px', boxShadow: '0 0 50px rgba(34, 197, 94, 0.3)' }}
            >
              <Trophy size={80} color="#fbbf24" style={{ marginBottom: '20px' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>NEURAL LINK SYNCED</h2>
              <p style={{ color: '#94a3b8', marginBottom: '30px' }}>AI algorithm neutralized. Rewards authorized.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                <div style={{ padding: '15px', background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.2rem' }}>+20 XP EARNED</span>
                </div>
                <div style={{ padding: '15px', background: '#0f172a', borderRadius: '12px', border: '1px solid #fbbf24' }}>
                  <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    +30 COINS EARNED <Coins size={20} fill="#fbbf24" stroke="none" />
                  </span>
                </div>
              </div>

              <button 
                onClick={claimXPRewards}
                style={{ width: '100%', padding: '16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}
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

export default TicTacToe;
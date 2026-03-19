import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Circle, RotateCcw, LayoutDashboard, Trophy, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [showVictory, setShowVictory] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState('');
  const navigate = useNavigate();

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  // --- MINIMAX ALGORITHM LOGIC ---
  const minimax = (tempBoard, depth, isMaximizing) => {
    const result = calculateWinner(tempBoard);
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (tempBoard.every(s => s !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!tempBoard[i]) {
          tempBoard[i] = 'O';
          let score = minimax(tempBoard, depth + 1, false);
          tempBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!tempBoard[i]) {
          tempBoard[i] = 'X';
          let score = minimax(tempBoard, depth + 1, true);
          tempBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const findBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const handleClick = (i) => {
    if (winner || board[i] || !isXNext) return;
    const newBoard = board.slice();
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const bestMove = findBestMove([...board]);
        if (bestMove !== -1) {
          const newBoard = board.slice();
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 600);
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
        topicId: 'tictactoe_hard',
        status: 'success',
        score: 100
      });
      setPopupText("Grandmaster Victory! +20 XP +30 COINS awarded.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2200);
      navigate('/arcade');
    } catch (err) {
      console.error('Reward claim failed:', err);
      navigate('/arcade');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative', fontFamily: 'Inter, sans-serif' }}>
      
      <button 
        onClick={() => navigate('/arcade')} 
        style={{ 
          position: 'absolute', top: '20px', left: '20px', 
          background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', 
          color: '#94a3b8', padding: '10px 15px', borderRadius: '10px', 
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
        }}
      >
        <LayoutDashboard size={18} /> Exit
      </button>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#60a5fa', marginBottom: '5px', letterSpacing: '4px', fontSize: '2rem' }}>NEURAL CORE</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Difficulty: Impossible</p>
      </div>

      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#0f172a', border: '2px solid #22c55e', borderRadius: '12px', padding: '16px 20px', textAlign: 'center', boxShadow: '0 0 18px rgba(34, 197, 94, 0.5)' }}>
            <p style={{ margin: 0, color: '#fbbf24', fontWeight: 'bold', fontSize: '1rem' }}>{popupText}</p>
          </div>
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 110px)', gap: '15px', padding: '20px', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '24px', border: '1px solid #1e293b' }}>
        {board.map((square, i) => (
          <div 
            key={i} 
            onClick={() => handleClick(i)} 
            style={{ 
              width: '110px', height: '110px', background: '#0f172a', 
              border: '2px solid #1e293b', borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: square || winner ? 'default' : 'pointer', transition: '0.3s all'
            }}
          >
            {square === 'X' && <X size={54} color="#60a5fa" strokeWidth={2.5} />}
            {square === 'O' && <Circle size={54} color="#f87171" strokeWidth={2.5} />}
          </div>
        ))}
      </div>

      <div style={{ height: '100px', marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        {winner === 'X' && !showVictory && (
          <button onClick={handleWin} style={{ padding: '15px 40px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
            CLAIM 50 XP
          </button>
        )}
        
        {winner === 'O' && <p style={{ color: '#f87171', fontWeight: 'bold' }}>SYSTEM OVERRIDE: YOU LOST</p>}
        {isDraw && <p style={{ color: '#94a3b8' }}>NEURAL STALEMATE</p>}

        {(winner === 'O' || isDraw) && (
          <button onClick={() => {setBoard(Array(9).fill(null)); setIsXNext(true);}} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', background: 'rgba(96, 165, 250, 0.1)', padding: '10px 20px', borderRadius: '8px', border: '1px solid #60a5fa', cursor: 'pointer' }}>
            <RotateCcw size={18} /> REBOOT MATCH
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
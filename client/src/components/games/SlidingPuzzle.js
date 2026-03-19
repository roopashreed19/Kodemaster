import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, RotateCcw, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const SlidingPuzzle = () => {
  const [nodes, setNodes] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const navigate = useNavigate();

  // Initialize a solvable 3x3 puzzle
  const initGame = () => {
    let newNodes = [1, 2, 3, 4, 5, 6, 7, 8, null];
    // Shuffle logic (must be a sequence of valid moves to ensure solvability)
    for (let i = 0; i < 100; i++) {
      const emptyIdx = newNodes.indexOf(null);
      const neighbors = getNeighbors(emptyIdx);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      [newNodes[emptyIdx], newNodes[randomNeighbor]] = [newNodes[randomNeighbor], newNodes[emptyIdx]];
    }
    setNodes(newNodes);
    setMoves(0);
    setIsWon(false);
  };

  const getNeighbors = (idx) => {
    const neighbors = [];
    if (idx % 3 > 0) neighbors.push(idx - 1); // Left
    if (idx % 3 < 2) neighbors.push(idx + 1); // Right
    if (idx >= 3) neighbors.push(idx - 3);    // Top
    if (idx <= 5) neighbors.push(idx + 3);    // Bottom
    return neighbors;
  };

  const handleMove = (idx) => {
    if (isWon) return;
    const emptyIdx = nodes.indexOf(null);
    const neighbors = getNeighbors(emptyIdx);

    if (neighbors.includes(idx)) {
      const newNodes = [...nodes];
      [newNodes[emptyIdx], newNodes[idx]] = [newNodes[idx], newNodes[emptyIdx]];
      setNodes(newNodes);
      setMoves(prev => prev + 1);
      checkWin(newNodes);
    }
  };

  const checkWin = (currentNodes) => {
    const winState = [1, 2, 3, 4, 5, 6, 7, 8, null];
    if (currentNodes.every((val, i) => val === winState[i])) {
      setIsWon(true);
      handleXpReward();
    }
  };

  const handleXpReward = async () => {
    try {
      await api.post('/user/add-xp', { 
        xp: 35, 
        subject: 'Arcade', 
        topicId: 'sliding_puzzle',
        status: 'success' 
      });
      alert("Puzzle Deciphered! +35 XP.");
    } catch (e) { console.error(e); }
  };

  useEffect(() => { initGame(); }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
      
      <button onClick={() => navigate('/arcade')} style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', color: '#94a3b8', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LayoutDashboard size={18} /> Exit
      </button>

      <h1 style={{ color: '#fbbf24', letterSpacing: '4px', marginBottom: '10px' }}>LOGIC SLIDE</h1>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>Moves: {moves}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px', background: '#1e293b', padding: '15px', borderRadius: '16px' }}>
        {nodes.map((node, i) => (
          <motion.div
            key={node || 'empty'}
            layout
            onClick={() => handleMove(i)}
            style={{
              width: '100px', height: '100px',
              background: node ? '#0f172a' : 'transparent',
              border: node ? '2px solid #fbbf24' : 'none',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24',
              cursor: node ? 'pointer' : 'default'
            }}
          >
            {node}
          </motion.div>
        ))}
      </div>

      {isWon && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '30px', textAlign: 'center' }}>
          <h2 style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy color="#fbbf24" /> SEQUENCE COMPLETE
          </h2>
          <button onClick={initGame} style={{ marginTop: '15px', background: '#fbbf24', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            PLAY AGAIN
          </button>
        </motion.div>
      )}

      {!isWon && (
        <button onClick={initGame} style={{ marginTop: '30px', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <RotateCcw size={16} /> Reset Board
        </button>
      )}
    </div>
  );
};

export default SlidingPuzzle;
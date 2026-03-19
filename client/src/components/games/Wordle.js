import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, RotateCcw, Delete, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
// You can expand this list or fetch it from an API later
const WORDS = ['REACT', 'NODEJS', 'QUERY', 'LOGIC', 'CLOUD', 'DEBUG', 'ARRAY', 'INDEX', 'PROXY', 'CACHE'];

const Wordle = () => {
  const [solution] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const navigate = useNavigate();

  const handleKeyUp = (e) => {
    if (gameState !== 'playing') return;

    if (e.key === 'Enter') {
      if (currentGuess.length !== WORD_LENGTH) return;
      
      const newGuesses = [...guesses];
      newGuesses[currentRow] = currentGuess.toUpperCase();
      setGuesses(newGuesses);
      
      if (currentGuess.toUpperCase() === solution) {
        setGameState('won');
        handleWin();
      } else if (currentRow === MAX_GUESSES - 1) {
        setGameState('lost');
      } else {
        setCurrentRow(prev => prev + 1);
        setCurrentGuess('');
      }
    }

    if (e.key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + e.key.toUpperCase());
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [currentGuess, gameState]);

  const handleWin = async () => {
    try {
      await api.post('/user/add-xp', { 
        xp: 40, 
        subject: 'Arcade', 
        topicId: 'wordle_master',
        status: 'success' 
      });
      alert("Word Master! +40 XP added.");
    } catch (err) {
      console.error("XP update failed", err);
    }
  };

  const getLetterStyle = (letter, index, rowIdx) => {
    if (rowIdx >= currentRow) return { border: '2px solid #334155', background: 'transparent' };
    
    if (solution[index] === letter) return { background: '#22c55e', border: 'none' }; // Green
    if (solution.includes(letter)) return { background: '#eab308', border: 'none' }; // Yellow
    return { background: '#334155', border: 'none' }; // Gray
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      
      <button onClick={() => navigate('/arcade')} style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', color: '#94a3b8', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LayoutDashboard size={18} /> Back to Arcade
      </button>

      <h1 style={{ color: '#60a5fa', letterSpacing: '5px', marginBottom: '30px' }}>WORDLE.CORE</h1>

      <div style={{ display: 'grid', gridTemplateRows: `repeat(${MAX_GUESSES}, 1fr)`, gap: '10px' }}>
        {guesses.map((guess, i) => {
          const isCurrent = i === currentRow;
          const displayWord = isCurrent ? currentGuess.padEnd(WORD_LENGTH, ' ') : guess.padEnd(WORD_LENGTH, ' ');

          return (
            <div key={i} style={{ display: 'flex', gap: '10px' }}>
              {displayWord.split('').map((letter, j) => (
                <motion.div
                  key={j}
                  initial={false}
                  animate={letter !== ' ' ? { scale: [1, 1.1, 1] } : {}}
                  style={{
                    width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.8rem', fontWeight: 'bold', borderRadius: '8px', textTransform: 'uppercase',
                    ...getLetterStyle(letter.trim(), j, i)
                  }}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        {gameState === 'won' && <h2 style={{ color: '#22c55e' }}>ACCESS GRANTED</h2>}
        {gameState === 'lost' && <h2 style={{ color: '#f87171' }}>LOCKOUT: {solution}</h2>}
        {gameState !== 'playing' && (
          <button onClick={() => window.location.reload()} style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer' }}>
            <RotateCcw size={20} /> RETRY SEQUENCE
          </button>
        )}
      </div>
    </div>
  );
};

export default Wordle;
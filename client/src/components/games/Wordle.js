import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, RotateCcw, Delete } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const WORDS = [
  'REACT', 'QUERY', 'LOGIC', 'CLOUD', 'DEBUG', 'ARRAY', 'INDEX', 'PROXY', 'CACHE', 'STACK',
  'NODES', 'BLOCK', 'CYBER', 'DRIVE', 'EMAIL', 'FRAME', 'GHOST', 'GRAPH', 'INPUT', 'LEVEL',
  'LOGIN', 'PATCH', 'PHONE', 'QUEUE', 'SHELL', 'SHIFT', 'TABLE', 'TOKEN', 'TOUCH', 'WRITE',
  'BINARY', 'BUFFER', 'CHIPS', 'CLICK', 'CODES', 'ERROR', 'FILES', 'FORGE', 'LINKS', 'MEDIA',
  'MOUSE', 'PIXEL', 'PORTS', 'ROBOT', 'SERVE', 'TRACK', 'VOICE', 'WIRES', 'ADMIN', 'BUILD',
  'CORES', 'CRASH', 'FLASK', 'IMAGE', 'MOUNT', 'PINGS', 'SITES', 'SNAKE', 'TOOLS', 'USAGE'
];
const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

const Wordle = () => {
  const [solution] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const navigate = useNavigate();

  const handleInput = (key) => {
    if (gameState !== 'playing') return;

    if (key === 'ENTER') {
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
    } else if (key === 'BACKSPACE' || key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key.toUpperCase());
    }
  };

  useEffect(() => {
    const onKeyUp = (e) => handleInput(e.key.toUpperCase());
    window.addEventListener('keyup', onKeyUp);
    return () => window.removeEventListener('keyup', onKeyUp);
  }, [currentGuess, gameState]);

  const handleWin = async () => {
    try {
      await api.post('/user/add-xp', { xp: 40, subject: 'Arcade', topicId: 'wordle_master', status: 'success' });
    } catch (err) { console.error("XP update failed", err); }
  };

  // Logic to determine colors for Grid and Keyboard
  const getStatus = (letter, index, rowIdx) => {
    const upperLetter = letter.toUpperCase();
    if (rowIdx >= currentRow && gameState === 'playing') return 'default';
    if (solution[index] === upperLetter) return 'correct';
    if (solution.includes(upperLetter)) return 'present';
    return 'absent';
  };

  const getStyle = (status) => {
    switch (status) {
      case 'correct': return { background: '#538d4e', border: 'none' }; // Green
      case 'present': return { background: '#b59f3b', border: 'none' }; // Yellow
      case 'absent': return { background: '#3a3a3c', border: 'none' };  // Dark Gray
      default: return { border: '2px solid #3a3a3c', background: 'transparent' };
    }
  };

  const getKeyState = (key) => {
    let state = 'default';
    guesses.forEach((guess, rowIdx) => {
      if (rowIdx >= currentRow) return;
      guess.split('').forEach((letter, i) => {
        if (letter !== key) return;
        if (solution[i] === key) state = 'correct';
        else if (solution.includes(key) && state !== 'correct') state = 'present';
        else if (state === 'default') state = 'absent';
      });
    });
    return state;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#121213', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <header style={{ width: '100%', borderBottom: '1px solid #3a3a3c', paddingBottom: '10px', marginBottom: '30px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <button onClick={() => navigate('/arcade')} style={{ position: 'absolute', left: 0, background: 'none', border: 'none', color: '#818384', cursor: 'pointer' }}><LayoutDashboard /></button>
        <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>CODEQUEST</h1>
      </header>

      {/* --- GRID --- */}
      <div style={{ display: 'grid', gridTemplateRows: `repeat(${MAX_GUESSES}, 1fr)`, gap: '5px', marginBottom: '40px' }}>
        {guesses.map((guess, i) => (
          <div key={i} style={{ display: 'flex', gap: '5px' }}>
            {Array.from({ length: WORD_LENGTH }).map((_, j) => {
              const letter = i === currentRow ? currentGuess[j] : guess[j];
              const status = getStatus(letter || '', j, i);
              return (
                <motion.div
                  key={j}
                  animate={letter ? { scale: [1, 1.1, 1] } : {}}
                  style={{
                    width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', fontWeight: 'bold', border: '2px solid #3a3a3c', textTransform: 'uppercase',
                    ...getStyle(status)
                  }}
                >
                  {letter}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* --- VIRTUAL KEYBOARD --- */}
      <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {KEYS.map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {row.map((key) => {
              const state = getKeyState(key);
              const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
              return (
                <button
                  key={key}
                  onClick={() => handleInput(key)}
                  style={{
                    height: '58px',
                    padding: isSpecial ? '0 15px' : '0',
                    minWidth: isSpecial ? '65px' : '40px',
                    borderRadius: '4px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: isSpecial ? '12px' : '14px',
                    background: state === 'default' ? '#818384' : getStyle(state).background,
                    color: '#fff'
                  }}
                >
                  {key === 'BACKSPACE' ? <Delete size={20} /> : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {gameState !== 'playing' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2 style={{ color: gameState === 'won' ? '#538d4e' : '#f87171' }}>{gameState === 'won' ? 'PERFECT' : `SOLUTION: ${solution}`}</h2>
          <button onClick={() => window.location.reload()} style={{ background: '#538d4e', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>PLAY AGAIN</button>
        </motion.div>
      )}
    </div>
  );
};

export default Wordle;
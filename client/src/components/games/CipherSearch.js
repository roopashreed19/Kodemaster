import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, RotateCcw, Search, ShieldCheck } from 'lucide-react';
import api from '../../utils/api';

const GRID_SIZE = 10;

// 1. Expanded Library - You can add as many words as you want here!
const WORD_LIBRARY = [
  'REACT', 'NODE', 'MONGODB', 'EXPRESS', 'GITHUB', 'DEBUG', 'SCRIPT',
  'ARRAY', 'OBJECT', 'RENDER', 'HOOKS', 'PROPS', 'STATE', 'CONST',
  'QUERY', 'FETCH', 'SERVER', 'CLIENT', 'BINARY', 'CYBER', 'ROUTER',
  'MATRIX', 'SIGNAL', 'BUFFER', 'STACK', 'PYTHON', 'JAVA', 'KOTLIN',
  'CSS', 'HTML', 'PROMISE', 'ASYNC', 'AWAIT', 'MAP', 'REDUCE', 'FILTER'
];

const CipherSearch = () => {
  const [grid, setGrid] = useState([]);
  const [currentWords, setCurrentWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selection, setSelection] = useState([]); // Stores [{r, c}, ...]
  const [isDragging, setIsDragging] = useState(false);
  const [gameState, setGameState] = useState('playing');
  const navigate = useNavigate();

  // Helper to check if a word can fit in the grid
  const canPlace = (g, w, r, c, d) => {
    if (d === 0 && c + w.length > GRID_SIZE) return false; // Horizontal
    if (d === 1 && r + w.length > GRID_SIZE) return false; // Vertical
    if (d === 2 && (r + w.length > GRID_SIZE || c + w.length > GRID_SIZE)) return false; // Diagonal

    for (let i = 0; i < w.length; i++) {
      let nr = r + (d === 1 || d === 2 ? i : 0);
      let nc = c + (d === 0 || d === 2 ? i : 0);
      if (g[nr][nc] !== '' && g[nr][nc] !== w[i]) return false;
    }
    return true;
  };

  // 2. Randomized Grid Generation
  const generateGrid = useCallback(() => {
    // Pick 7 unique random words from the library
    const shuffledLib = [...WORD_LIBRARY].sort(() => 0.5 - Math.random());
    const selected = shuffledLib.slice(0, 7);
    setCurrentWords(selected);

    let newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    
    selected.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 150) {
        const dir = Math.floor(Math.random() * 3); 
        const r = Math.floor(Math.random() * GRID_SIZE);
        const c = Math.floor(Math.random() * GRID_SIZE);

        if (canPlace(newGrid, word, r, c, dir)) {
          for (let i = 0; i < word.length; i++) {
            let nr = r + (dir === 1 || dir === 2 ? i : 0);
            let nc = c + (dir === 0 || dir === 2 ? i : 0);
            newGrid[nr][nc] = word[i];
          }
          placed = true;
        }
        attempts++;
      }
    });

    // Fill noise
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === '') {
          newGrid[r][c] = alpha[Math.floor(Math.random() * 26)];
        }
      }
    }

    setGrid(newGrid);
    setFoundWords([]);
    setSelection([]);
    setGameState('playing');
  }, []);

  useEffect(() => {
    generateGrid();
  }, [generateGrid]);

  // 3. Pointer Handlers for Drag Selection
  const handlePointerDown = (r, c) => {
    if (gameState !== 'playing') return;
    setIsDragging(true);
    setSelection([{ r, c }]);
  };

  const handlePointerEnter = (r, c) => {
    if (!isDragging || gameState !== 'playing') return;
    const last = selection[selection.length - 1];
    if (last.r !== r || last.c !== c) {
      setSelection(prev => [...prev, { r, c }]);
    }
  };

  const handlePointerUp = async () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const selectedString = selection.map(cell => grid[cell.r][cell.c]).join('');
    
    if (currentWords.includes(selectedString) && !foundWords.includes(selectedString)) {
      const newFound = [...foundWords, selectedString];
      setFoundWords(newFound);
      
      if (newFound.length === currentWords.length) {
        setGameState('won');
        try {
          await api.post('/user/add-xp', { xp: 45, subject: 'Arcade', topicId: 'cipher_search' });
        } catch (err) { console.error(err); }
      }
    }
    setSelection([]);
  };

  return (
    <div 
      style={{ minHeight: '100vh', background: '#020617', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', fontFamily: 'monospace', userSelect: 'none' }}
      onPointerUp={handlePointerUp}
    >
      <button onClick={() => navigate('/arcade')} style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', color: '#94a3b8', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10 }}>
        <LayoutDashboard size={18} /> Exit
      </button>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#22c55e', letterSpacing: '6px', textShadow: '0 0 10px #22c55e44', margin: 0 }}>CIPHER_SEARCH.SYS</h1>
        <p style={{ color: '#475569', marginTop: '5px' }}>Drag to highlight and decrypt data strings.</p>
      </div>

      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
        {/* GRID SECTION */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 42px)`, gap: '5px', background: '#0f172a', padding: '15px', borderRadius: '12px', border: '1px solid #1e293b', touchAction: 'none' }}>
          {grid.map((row, r) => row.map((letter, c) => {
            const isSelected = selection.some(s => s.r === r && s.c === c);
            const isFound = false; // We reset selection on found, but you can add persistent highlight if you want
            
            return (
              <div
                key={`${r}-${c}`}
                onPointerDown={() => handlePointerDown(r, c)}
                onPointerEnter={() => handlePointerEnter(r, c)}
                style={{
                  width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isSelected ? '#22c55e' : '#1e293b',
                  color: isSelected ? '#020617' : '#94a3b8',
                  borderRadius: '4px', fontWeight: 'bold', cursor: 'crosshair', transition: '0.1s',
                  fontSize: '1.2rem', border: isSelected ? 'none' : '1px solid #0f172a'
                }}
              >
                {letter}
              </div>
            );
          }))}
        </div>

        {/* LIST SECTION */}
        <div style={{ background: '#0f172a', padding: '30px', borderRadius: '20px', border: '1px solid #1e293b', minWidth: '240px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <h3 style={{ color: '#60a5fa', marginBottom: '20px', letterSpacing: '2px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>TARGET_KEYS</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentWords.map(word => (
              <div key={word} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: foundWords.includes(word) ? '#22c55e' : '#475569', transition: '0.3s' }}>
                {foundWords.includes(word) ? <ShieldCheck size={20} /> : <Search size={20} />}
                <span style={{ fontSize: '1.1rem', textDecoration: foundWords.includes(word) ? 'line-through' : 'none', fontWeight: foundWords.includes(word) ? 'normal' : 'bold' }}>
                  {word}
                </span>
              </div>
            ))}
          </div>

          {gameState === 'won' && (
            <div style={{ marginTop: '30px', textAlign: 'center', animation: 'fadeIn 0.5s' }}>
              <p style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '15px' }}>DECRYPTION SUCCESSFUL!</p>
              <button 
                onClick={generateGrid} 
                style={{ width: '100%', padding: '12px', background: '#22c55e', color: '#020617', border: 'none', borderRadius: '10px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <RotateCcw size={18} /> NEXT LEVEL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CipherSearch;
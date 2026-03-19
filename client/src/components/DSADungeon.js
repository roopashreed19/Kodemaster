import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Play, X, Star, Loader2, LayoutDashboard } from 'lucide-react';
import { challenges as localChallenges } from '../data/challenges'; 
import api from '../utils/api'; 
import { handleQuestVictory } from '../utils/questHelper';

const floors = [
  { id: 1, name: "Array Abyss", status: "unlocked", difficulty: "Easy", color: "#f87171" },
  { id: 2, name: "String Sanctum", status: "unlocked", difficulty: "Easy", color: "#60a5fa" },
  { id: 3, name: "Pointer Peak", status: "unlocked", difficulty: "Medium", color: "#4ade80" },
  { id: 4, name: "Linker’s Lodge", status: "unlocked", difficulty: "Medium", color: "#c084fc" },
  { id: 5, name: "Stack Summit", status: "unlocked", difficulty: "Medium", color: "#fbbf24" },
  { id: 6, name: "Recursion Rift", status: "unlocked", difficulty: "Medium", color: "#f472b6" },
  { id: 7, name: "Tree Temple", status: "unlocked", difficulty: "Hard", color: "#2dd4bf" },
  { id: 8, name: "Heap Hollow", status: "unlocked", difficulty: "Hard", color: "#a78bfa" },
  { id: 9, name: "Graph Grotto", status: "unlocked", difficulty: "Hard", color: "#fb923c" },
  { id: 10, name: "DP Citadel", status: "unlocked", difficulty: "Insane", color: "#e11d48" },
];

const DSADungeon = () => {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [currentQuests, setCurrentQuests] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const [showVictory, setShowVictory] = useState(false);
  const [completedFloor, setCompletedFloor] = useState(null);


  const checkFloorCompletion = async (floorId) => {
    try {
      const response = await api.get(`/user/progress/${floorId}`);
      if (response.data.allCleared) {
        setCompletedFloor(floors.find(f => `floor${f.id}` === floorId));
        setShowVictory(true);
      }
    } catch (err) {
      console.error("Could not verify legends...", err);
    }
  };

  const handleFloorClick = async (floor) => {
    if (floor.status === "locked") {
      alert("This floor is magically sealed! Complete previous levels to unlock.");
      return;
    }

    setSelectedFloor(floor);
    setLoading(true);

    if (floor.id === 1) {
      setCurrentQuests(localChallenges.dsa.floor1.questions);
      setLoading(false);
    } else {
      try {
        const response = await api.get(`/challenges/dsa/floor${floor.id}`);
        setCurrentQuests(response.data);
      } catch (err) {
        console.error("The Archive is sealed!", err);
        setCurrentQuests([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="dungeon-container">
     
      <button 
        className="back-to-dashboard" 
        onClick={() => navigate('/dashboard')}
        style={{
          position: 'fixed',
          top: '25px',
          left: '25px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#94a3b8',
          padding: '12px 18px',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderColor = '#60a5fa';
          e.currentTarget.style.transform = 'translateX(5px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#94a3b8';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <LayoutDashboard size={18} />
        <span>Return to Dashboard</span>
      </button>

      <header className="dungeon-header">
        <h1>FLOOR SELECTOR</h1>
        <p>Ascend the tower to become a Kodemaster</p>
      </header>

      <div className="floor-path">
        {floors.map((floor, index) => (
          <motion.div 
            key={floor.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`floor-node ${floor.status} ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            {index !== floors.length - 1 && <div className="connection-line"></div>}
            <div className="portal-wrapper">
              <div 
                className="portal-circle" 
                style={{ borderColor: floor.color }}
                onClick={() => handleFloorClick(floor)}
              >
                {floor.status === "locked" ? <Lock size={30} /> : <Play size={30} />}
              </div>
            </div>
            
            <div className="floor-details">
              <span className="floor-number">FLOOR {floor.id}</span>
              <h3>{floor.name}</h3>
              <div className="floor-meta">
                <span className="diff-badge">{floor.difficulty}</span>
                {floor.status === "completed" && <span className="cleared-tag">CLEARED</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedFloor && (
          <div className="quest-modal-overlay">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="quest-modal"
              style={{ borderTop: `4px solid ${selectedFloor.color}` }}
            >
              <div className="modal-header">
                <h2>{selectedFloor.name} Quests</h2>
                <button className="close-btn" onClick={() => setSelectedFloor(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className="quest-list">
                {loading ? (
                  <div className="loading-state" style={{ textAlign: 'center', padding: '40px' }}>
                    <Loader2 className="animate-spin" size={32} style={{ margin: '0 auto', color: selectedFloor.color }} />
                    <p style={{ marginTop: '15px', color: '#94a3b8' }}>Unlocking the Archives...</p>
                  </div>
                ) : (
                  currentQuests.length > 0 ? (
                    currentQuests.map((q) => (
                      <div 
                        key={q.id} 
                        className="quest-card" 
                        onClick={() => navigate(`/arena/dsa/floor${selectedFloor.id}/${q.id}`)}
                      >
                        <div className="quest-info">
                          <h4>{q.title}</h4>
                          <div className="quest-stats">
                            <span className={`diff-tag ${q.difficulty?.toLowerCase()}`}>
                              {q.difficulty}
                            </span>
                            <span className="xp-tag"><Star size={12} /> {q.xp} XP</span>
                          </div>
                        </div>
                        <button className="battle-btn">BATTLE</button>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>No quests found in this floor.</p>
                  )
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    
      <AnimatePresence>
        {showVictory && completedFloor && (
          <div className="victory-overlay">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="victory-card"
              style={{ boxShadow: `0 0 50px ${completedFloor.color}44` }}
            >
              <div className="victory-icon-wrapper">
                <Star size={60} color={completedFloor.color} fill={completedFloor.color} className="animate-pulse" />
              </div>
              <h2>FLOOR CLEARED!</h2>
              <p>You have mastered the secrets of <strong>{completedFloor.name}</strong>.</p>
              <div className="reward-badge">
                <span>+500 BONUS XP</span>
              </div>
              <button 
                className="continue-btn" 
                style={{ background: completedFloor.color }}
                onClick={() => setShowVictory(false)}
              >
                ASCEND FURTHER
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DSADungeon;
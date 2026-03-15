import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { motion } from 'framer-motion';
import { Lock, Play } from 'lucide-react';

const floors = [
  { id: 1, name: "Array Abyss", status: "unlocked", difficulty: "Easy", color: "#f87171" },
  { id: 2, name: "String Sanctum", status: "locked", difficulty: "Easy", color: "#60a5fa" },
  { id: 3, name: "Pointer Peak", status: "locked", difficulty: "Medium", color: "#4ade80" },
  { id: 4, name: "Linker’s Lodge", status: "locked", difficulty: "Medium", color: "#c084fc" },
  { id: 5, name: "Stack Summit", status: "locked", difficulty: "Medium", color: "#fbbf24" },
  { id: 6, name: "Recursion Rift", status: "locked", difficulty: "Medium", color: "#f472b6" },
  { id: 7, name: "Tree Temple", status: "locked", difficulty: "Hard", color: "#2dd4bf" },
  { id: 8, name: "Heap Hollow", status: "locked", difficulty: "Hard", color: "#a78bfa" },
  { id: 9, name: "Graph Grotto", status: "locked", difficulty: "Hard", color: "#fb923c" },
  { id: 10, name: "DP Citadel", status: "locked", difficulty: "Insane", color: "#e11d48" },
];

const DSADungeon = () => {
  const navigate = useNavigate(); // 2. Initialize navigate

  return (
    <div className="dungeon-container">
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
              {/* 3. Added the onClick logic to the portal-circle */}
              <div 
                className="portal-circle" 
                style={{ borderColor: floor.color }}
                onClick={() => {
                  if (floor.status !== "locked") {
                    navigate(`/arena/dsa/floor${floor.id}`);
                  } else {
                    alert("This floor is magically sealed! Complete previous levels to unlock.");
                  }
                }}
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
    </div>
  );
};

export default DSADungeon;
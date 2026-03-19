import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Cpu, ChevronLeft, Shield, Terminal } from 'lucide-react';

const OSOutpost = () => {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOSData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/challenges/os');
        
        const grouped = res.data.reduce((acc, q) => {
          if (!acc[q.floorId]) {
            acc[q.floorId] = { 
              floorId: q.floorId, 
              floorName: q.floorName, 
              floorBrief: q.floorBrief,
              questions: [] 
            };
          }
          acc[q.floorId].questions.push(q);
          return acc;
        }, {});

        const sorted = Object.values(grouped).sort((a, b) => {
          const numA = parseInt(a.floorId.replace('floor', ''));
          const numB = parseInt(b.floorId.replace('floor', ''));
          return numA - numB;
        });
        
        setFloors(sorted);
      } catch (err) {
        console.error("Linker Error: Data bus failed.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOSData();
  }, []);

  if (loading) return (
    <div className="loading-screen" style={{ color: '#10b981', background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      [ INITIALIZING ALL SECTORS... ]
    </div>
  );

  return (
    <div className="dashboard-wrapper os-theme">
      <div className="bg-glow"></div>
      
      <nav className="main-nav">
        <div className="logo-section" style={{ color: '#10b981' }}>
          <Shield size={24} />
          <h2 onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>KODEMASTER // OS</h2>
        </div>
        <button onClick={() => navigate('/dashboard')} className="stat-item">
          <ChevronLeft size={18} /> BACK TO HUB
        </button>
      </nav>

      <header className="hero-section text-center">
        <h1 className="glitch-text">OPERATING <span style={{ color: '#10b981' }}>SYSTEMS</span></h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontFamily: 'monospace' }}>
          {">"} status: all_sectors_decrypted | total_modules: {floors.length}
        </p>
      </header>

      <div className="floor-path">
        {floors.map((floor, index) => {
          const floorNumber = index + 1;
          return (
            <motion.div 
              key={floor.floorId}
              whileHover={{ scale: 1.02 }}
              className={`floor-node ${index % 2 === 0 ? 'left' : 'right'}`}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/briefing/os/${floor.floorId}`)}
            >
              <div className="portal-circle active-pulse">
                <Cpu color="#10b981" size={35} />
              </div>

              <div className="floor-details">
                <span className="sector-tag">SECTOR_0{floorNumber}</span>
                <h3 className="floor-name">{floor.floorName}</h3>
                <div className="system-ready">
                  <span className="blink-dot"></span> ARCHIVE READY
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .os-theme { background: #020617; min-height: 100vh; font-family: 'Fira Code', monospace; color: white; }
        .main-nav { display: flex; justify-content: space-between; padding: 20px 40px; border-bottom: 1px solid #1e293b; }
        .logo-section { display: flex; align-items: center; gap: 10px; }
        .stat-item { background: none; border: 1px solid #1e293b; color: #94a3b8; padding: 8px 15px; cursor: pointer; border-radius: 5px; display: flex; align-items: center; gap: 5px; }
        
        .floor-path {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding: 60px 0;
        }

        .floor-path::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          border-left: 2px dashed rgba(16, 185, 129, 0.2);
          transform: translateX(-50%);
        }

        .floor-node { display: flex; align-items: center; width: 100%; margin-bottom: 100px; z-index: 2; transition: all 0.3s ease; }
        .floor-node.left { flex-direction: row; padding-left: 20%; }
        .floor-node.right { flex-direction: row-reverse; padding-right: 20%; text-align: right; }

        .portal-circle {
          width: 80px; height: 80px;
          background: #020617;
          border: 3px solid #10b981;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 40px;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }

        .active-pulse {
          animation: pulse-ring 2s infinite;
        }

        .sector-tag { color: #10b981; font-size: 0.7rem; font-weight: 900; letter-spacing: 2px; }
        .floor-name { color: #fff; font-size: 1.6rem; margin: 5px 0; font-weight: 700; text-transform: uppercase; }

        .system-ready { color: #10b981; font-size: 0.8rem; font-weight: bold; margin-top: 5px; }
        .blink-dot { height: 8px; width: 8px; background: #10b981; border-radius: 50%; display: inline-block; margin-right: 8px; animation: blink 1.5s infinite; }
        
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .text-center { text-align: center; margin-top: 40px; }
        .glitch-text { font-size: 3rem; font-weight: 900; margin: 0; letter-spacing: 5px; }
      `}</style>
    </div>
  );
};

export default OSOutpost;
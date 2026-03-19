import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Layers, Zap, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const OSOutpost = () => {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOSData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/challenges/os');
        
        // Group 300 questions into 10 floors
        const grouped = res.data.reduce((acc, q) => {
          if (!acc[q.floorId]) {
            acc[q.floorId] = { 
              floorId: q.floorId, 
              floorName: q.floorName, 
              questions: [] 
            };
          }
          acc[q.floorId].questions.push(q);
          return acc;
        }, {});

        // Sort floors numerically
        const sorted = Object.values(grouped).sort((a, b) => {
          const numA = parseInt(a.floorId.replace('floor', ''));
          const numB = parseInt(b.floorId.replace('floor', ''));
          return numA - numB;
        });
        
        setFloors(sorted);
      } catch (err) {
        console.error("Linker Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOSData();
  }, []);

  if (loading) return (
    <div className="loading-screen" style={{ color: '#a78bfa', background: '#030712', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      [ INITIALIZING ALL SECTORS... ]
    </div>
  );

  return (
    // Applied the OOPS Oasis theme colors and font
    <div className="os-outpost-theme" style={{ background: '#030712', minHeight: '100vh', color: '#fff', fontFamily: "'Inter', sans-serif", padding: '40px' }}>
      
      {/* HEADER: Matching OOPS style */}
      <header style={{ marginBottom: '60px', position: 'relative', z-index: 2 }}>
        <button 
          onClick={() => navigate('/dashboard')} 
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', marginBottom: '30px' }}
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <ShieldCheck size={48} color="#a78bfa" /> {/* OOPS Purple */}
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', textTransform: 'uppercase', margin: 0, letterSpacing: '2px', color: '#fff' }}>
            OS <span style={{ color: '#a78bfa' }}>OUTPOST</span>
          </h1>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Navigate through the core modules of modern Operating Systems. Secure each sector to finalize your system audit.
        </p>
      </header>

      {/* BACKGROUND GLOW */}
      <div style={{ position: 'fixed', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', z-index: 1 }}></div>

      {/* GRID: 3 columns matching image 5 */}
      <div className="world-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', position: 'relative', z-index: 2 }}>
        {floors.map((floor, index) => (
          <motion.div 
            key={floor.floorId}
            whileHover={{ y: -5, borderColor: '#a78bfa' }}
            style={{
              background: '#0f172a', /* OOPS Card BG */
              border: '2px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '40px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '320px',
              transition: 'border-color 0.3s'
            }}
            onClick={() => navigate(`/briefing/os/${floor.floorId}`)}
          >
            <div>
              {/* OOPS style icon box */}
              <div style={{ background: 'rgba(167, 139, 250, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '30px' }}>
                <Layers color="#a78bfa" size={30} />
              </div>

              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', margin: '0 0 10px 0' }}>
                {floor.floorName}
              </h3>
              
              <p style={{ color: '#64748b', fontSize: '1rem' }}>
                SECTOR_0{index + 1} // KERNEL // PRIVILEGED
              </p>
            </div>

            {/* OOPS style card footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fbbf24', fontWeight: 'bold' }}>
                <Zap size={18} /> +30 UNITS
              </div>
              <div style={{ color: '#a78bfa', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                ENTER SECTOR <ChevronRight size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OSOutpost;
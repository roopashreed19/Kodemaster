import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Skull, Loader2, Trophy } from 'lucide-react';
import api from '../utils/api';

const DSADungeon = () => {
  const navigate = useNavigate();
  const [dungeonData, setDungeonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDungeon = async () => {
      try {
        const response = await api.get('/challenges/dsa');
        setDungeonData(response.data);
      } catch (err) {
        console.error("Dungeon Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDungeon();
  }, []);

  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
      <Loader2 className="animate-spin" size={48} />
      <p style={{ marginTop: '20px', letterSpacing: '2px' }}>BREACHING THE ARCHIVES...</p>
    </div>
  );

  return (
    <div className="dungeon-wrapper" style={{ padding: '60px 20px', background: '#020617', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <Skull color="#ef4444" size={36} /> DSA_DUNGEON.LOG
        </h1>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {dungeonData.map((floor) => (
          <motion.div 
            key={floor.floorId} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: '#0f172a', borderRadius: '24px', padding: '30px', border: `1px solid ${floor.color}44` }}
          >
            <h2 style={{ color: floor.color, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={20} fill={floor.color} /> {floor.name}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '15px' }}>
              {floor.questions.map((q) => (
                <motion.div
                  key={q._id}
                  whileHover={{ scale: 1.03, backgroundColor: '#1e293b' }}
                  onClick={() => navigate(`/arena/dsa/${floor.floorId}/${q.id}`)}

                  style={{ background: '#1e293b66', padding: '20px', borderRadius: '16px', cursor: 'pointer', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <div style={{ color: '#f8fafc', fontWeight: 'bold' }}>{q.title}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{q.difficulty} • {q.xp} XP</div>
                  </div>
                  <ChevronRight size={18} color={floor.color} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DSADungeon;
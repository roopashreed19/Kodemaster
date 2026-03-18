import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, LayoutDashboard, Zap, ChevronRight, Lock } from 'lucide-react';
import api from '../utils/api';

const AptitudeWorld = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {

        const response = await api.get('/aptitude/all');
        setTopics(response.data);
      } catch (err) {
        console.error("Failed to fetch aptitude topics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  return (
    <div className="aptitude-world-container" style={{ minHeight: '100vh', background: '#020617', padding: '40px' }}>
      <button
        onClick={() => navigate('/dashboard')}
        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Back to Dashboard
      </button>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '10px' }}>APTITUDE ARENA</h1>
        <p style={{ color: '#94a3b8' }}>Sharpen your logical blades for the final interview battle.</p>
      </header>

      {loading ? (
        <div style={{ color: '#fff', textAlign: 'center' }}>Opening the Scroll of Knowledge...</div>
      ) : (
        <div className="topic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
          {topics.map((topic) => (
            <motion.div
              key={topic.topicId}
              whileHover={{ scale: 1.03, translateY: -5 }}
              onClick={() => navigate(`/aptitude-arena/${topic.topicId}`)}
              style={{
                background: '#1e293b',
                padding: '30px',
                borderRadius: '20px',
                border: '1px solid #334155',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ background: '#fbbf2422', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Brain color="#fbbf24" />
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>{topic.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>{topic.questions.length} Challenges</p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: 'bold' }}>+ {topic.questions.length * 10} XP</span>
                <ChevronRight color="#fbbf24" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AptitudeWorld;
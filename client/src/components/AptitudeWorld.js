import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, LayoutDashboard, Zap, ChevronRight,ChevronLeft, Sparkles } from 'lucide-react';
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
    <div style={{ 
      minHeight: '100vh', 
      background: '#020617', 
      padding: '40px 60px', 
      position: 'relative', 
      overflowX: 'hidden' 
    }}>
      
      {/* Background Ambient Glow */}
      <div style={{ 
        position: 'absolute', 
        top: '-10%', 
        right: '-10%', 
        width: '40%', 
        height: '40%', 
        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', 
        filter: 'blur(80px)', 
        pointerEvents: 'none' 
      }} />

      {/* Navigation - Left Aligned */}
<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ 
            color: '#94a3b8', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', // Tighter gap
            fontWeight: '500', 
            fontSize: '0.9rem',
            transition: '0.3s',
            padding: '0'
          }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>
      </div>

      {/* Header - Left Aligned to match DBMS screen */}
      <header style={{ textAlign: 'left', marginBottom: '60px', maxWidth: '1200px', margin: '0 auto 60px' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '12px', 
            fontSize: '2.8rem', 
            fontWeight: '900', 
            color: '#fff', 
            letterSpacing: '-1px',
            marginBottom: '15px' 
          }}>
            <Brain size={45} color="#6366f1" />
            <h1 style={{ margin: 0 }}>APTITUDE <span style={{ color: '#6366f1' }}>ARENA</span></h1>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '700px', lineHeight: '1.6' }}>
            Initialize your cognitive connection. Master the logical patterns and quantitative reasoning required for the final interview battle.
          </p>
        </motion.div>
      </header>

      {loading ? (
        <div style={{ 
          color: '#6366f1', 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          fontWeight: '600',
          marginTop: '100px' 
        }}>
          Opening the Scroll of Knowledge...
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '25px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          {topics.map((topic, index) => (
            <motion.div
              key={topic.topicId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5, borderColor: '#6366f1' }}
              onClick={() => navigate(`/aptitude-arena/${topic.topicId}`)}
              style={{
                background: 'rgba(30, 41, 59, 0.4)',
                padding: '35px',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                position: 'relative',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ 
                background: 'rgba(99,102,241,0.15)', 
                width: '50px', 
                height: '50px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '25px', 
                color: '#6366f1' 
              }}>
                <BoxIcon size={24} /> {/* Placeholder for a dynamic icon */}
                <Brain size={24} />
              </div>

              <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '700', marginBottom: '10px' }}>{topic.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '25px' }}>{topic.questions?.length || 0} Challenges</p>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                paddingTop: '20px', 
                borderTop: '1px solid rgba(255,255,255,0.05)' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: '#fbbf24', 
                  fontSize: '0.85rem', 
                  fontWeight: '800' 
                }}>
                  <Zap size={14} fill="#fbbf24" /> +{(topic.questions?.length || 0) * 10} XP
                </div>
                <div style={{ 
                  color: '#6366f1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold' 
                }}>
                  ENTER ARENA <ChevronRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple internal helper for the icons
const BoxIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);

export default AptitudeWorld;
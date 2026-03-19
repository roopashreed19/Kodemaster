import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, LayoutGrid, ChevronRight, Share2, Award } from 'lucide-react';

const FloorSummary = () => {
  const { subject, floorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 30 } = location.state || {};
  const percentage = Math.round((score / total) * 100);
  const xpEarned = score * 10;

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: '#0f172a',
          padding: '60px 40px',
          borderRadius: '24px',
          border: '1px solid rgba(167, 139, 250, 0.2)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ marginBottom: '30px' }}>
          <Star size={80} color="#fbbf24" fill="#fbbf24" style={{ filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.4))' }} />
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          OUTPOST FINISHED
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '40px' }}>
          You scored {score} out of {total}
        </p>

        <div style={{
          background: '#1e293b',
          padding: '15px 30px',
          borderRadius: '12px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '50px',
          border: '1px solid rgba(167, 139, 250, 0.3)'
        }}>
          <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '1.2rem' }}>+{xpEarned} XP EARNED</span>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          <button
            onClick={() => navigate('/world/os')}
            style={{
              padding: '18px',
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#fff',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#334155'}
            onMouseOut={(e) => e.target.style.background = '#1e293b'}
          >
            RETURN TO OS OUTPOST
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '18px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.05)',
              color: '#94a3b8',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            RETURN TO DASHBOARD
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default FloorSummary;
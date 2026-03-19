import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, RefreshCcw, LayoutDashboard, ShieldCheck, ShieldAlert, ChevronRight } from 'lucide-react';

const FloorSummary = () => {
  const { subject, floorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 30 } = location.state || {};
  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= 70;

  const handleReattempt = () => {
    navigate(`/arena/${subject}/${floorId}/q1`);
  };

  return (
    <div className="summary-container" style={{ minHeight: '100vh', background: '#020617', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="bg-glow"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
          background: 'rgba(15, 23, 42, 0.8)', 
          padding: '50px', 
          borderRadius: '24px', 
          border: `2px solid ${isPassed ? '#10b981' : '#ef4444'}`,
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          boxShadow: `0 0 50px ${isPassed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`
        }}
      >
        <div style={{ marginBottom: '20px', display: 'inline-block' }}>
          {isPassed ? (
            <ShieldCheck size={80} color="#10b981" />
          ) : (
            <ShieldAlert size={80} color="#ef4444" />
          )}
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>
          {isPassed ? "SECTOR SECURED" : "CRITICAL FAILURE"}
        </h1>
        <p style={{ color: '#94a3b8', fontFamily: 'monospace', marginBottom: '40px' }}>
          DEBRIEFING_LOG // {floorId?.toUpperCase()} // COMPLETED
        </p>

        <div className="score-circle">
          <span className="score-val" style={{ color: isPassed ? '#10b981' : '#ef4444' }}>{score}</span>
          <span className="score-label">OUT OF {total}</span>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{percentage}% ACCURACY</h2>
          <p style={{ color: '#64748b' }}>
            {isPassed 
              ? "Optimization successful. All kernel instructions executed within safety parameters." 
              : "Logic errors detected. Sector integrity compromised. Re-calibration recommended."}
          </p>
        </div>

        <div className="summary-actions">
          <button onClick={handleReattempt} className="btn-reattempt">
            <RefreshCcw size={18} /> RE-ATTEMPT SECTOR
          </button>
  
          <div className="secondary-actions">
            <button onClick={() => navigate(`/world/${subject}`)} className="btn-secondary">
              <Award size={16} /> SECTOR MAP
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-secondary">
              <LayoutDashboard size={16} /> HUB
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FloorSummary;
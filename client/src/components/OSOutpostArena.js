import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, CheckCircle2, XCircle, LayoutGrid, Terminal, AlertTriangle } from 'lucide-react';
import api from '../utils/api';

const OSOutpostArena = () => {
  const { subject, floorId, questionId } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const currentNum = parseInt(questionId?.replace(/\D/g, '') || "1");

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        setIsAnswered(false);
        setSelectedOption(null);
        const res = await api.get(`/os/${floorId}/${questionId}`);
        setChallenge(res.data);
      } catch (err) {
        console.error("OS Access Failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [floorId, questionId]);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === challenge.expected) {
      setScore(prev => prev + 1);
    }
  };

  const saveProgress = useCallback(async (finalScore) => {
    try {
      const xpEarned = finalScore * 10;
      await api.post('/user/add-xp', {
        xp: xpEarned,
        topicId: floorId,
        subject: 'os',
        status: finalScore > 0 ? 'success' : 'failed',
        score: finalScore
      });
    } catch (err) {
      console.error("Failed to sync XP:", err);
    }
  }, [floorId]);

  const handleNextTask = () => {
    if (currentNum < 30) {
      navigate(`/arena/os/${floorId}/q${currentNum + 1}`);
    } else {
      setShowFinishModal(true);
    }
  };

  const finalizeOutpost = async () => {
    setIsSyncing(true);
    await saveProgress(score);
    setIsSyncing(false);
    navigate(`/summary/os/${floorId}`, {
      state: { score: score, total: 30 }
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', fontFamily: 'monospace' }}>
        [ INITIALIZING SECTOR_CORE... ]
      </div>
    );
  }

  if (!challenge) {
    return (
      <div style={{ minHeight: '100vh', background: '#020617', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Sector Archive Not Found</h2>
        <button onClick={() => navigate('/world/os')} style={{ marginTop: '20px', background: 'none', border: '1px solid #a78bfa', color: '#a78bfa', padding: '10px 20px', cursor: 'pointer' }}>
          Return to Map
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', padding: '40px' }}>

      {/* TOP NAVIGATION */}
      <div className="sticky-nav" style={{ maxWidth: '1200px', margin: '0 auto 40px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigate('/world/os')}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
        >
          <ChevronLeft size={20} /> Back to OS Outpost
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
        >
          <LayoutGrid size={20} /> Return to Dashboard
        </button>
      </div>

      <div className="content-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* HEADER: PROGRESS */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold' }}>
            QUESTION {currentNum} OF 30
          </span>
          <div style={{ width: '100%', height: '6px', background: 'rgba(167, 139, 250, 0.1)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentNum / 30) * 100}%` }}
              style={{ height: '100%', background: '#a78bfa' }}
            />
          </div>
        </div>

        {/* QUESTION AREA */}
        <motion.div
          key={questionId}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ marginBottom: '40px' }}
        >
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '20px', color: '#fff' }}>
            {challenge.title}
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#cbd5e1', marginBottom: '40px' }}>
            {challenge.description}
          </p>

          {/* OPTIONS GRID */}
          <div style={{ display: 'grid', gap: '15px' }}>
            {challenge.options.map((opt, idx) => {
              const isCorrect = opt === challenge.expected;
              const isSelected = selectedOption === opt;

              let borderColor = 'rgba(255,255,255,0.1)';
              let bg = '#0f172a';
              if (isAnswered) {
                if (isCorrect) {
                  borderColor = '#22c55e';
                  bg = 'rgba(34, 197, 94, 0.1)';
                } else if (isSelected) {
                  borderColor = '#ef4444';
                  bg = 'rgba(239, 68, 68, 0.1)';
                }
              } else if (isSelected) {
                borderColor = '#a78bfa';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  disabled={isAnswered}
                  style={{
                    padding: '20px 25px',
                    background: bg,
                    border: `2px solid ${borderColor}`,
                    borderRadius: '12px',
                    color: '#fff',
                    textAlign: 'left',
                    cursor: isAnswered ? 'default' : 'pointer',
                    fontSize: '1.1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 size={24} color="#22c55e" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle size={24} color="#ef4444" />}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* FEEDBACK & FOOTER */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '40px',
                padding: '30px',
                background: '#0f172a',
                borderRadius: '16px',
                borderLeft: '4px solid #fbbf24'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fbbf24', marginBottom: '15px' }}>
                <Terminal size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: '900', letterSpacing: '2px' }}>EXPLANATION</span>
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1rem' }}>
                {challenge.logic}
              </p>

              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleNextTask}
                  style={{
                    background: '#fbbf24',
                    color: '#020617',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {currentNum < 30 ? 'Next Question' : 'Finish Outpost'} <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FINALIZE MODAL */}
        <AnimatePresence>
          {showFinishModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                style={{ background: '#1e293b', border: '1px solid #fbbf24', borderRadius: '24px', padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
              >
                <div style={{ background: 'rgba(251, 191, 36, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px', color: '#fbbf24' }}>
                  <AlertTriangle size={40} />
                </div>
                <h2 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '15px' }}>Finalize Outpost?</h2>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '35px' }}>
                  You are about to submit your findings to the Great Library history. This will finalize your XP and score.
                </p>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button
                    onClick={() => setShowFinishModal(false)}
                    style={{ flex: 1, padding: '15px', background: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    WAIT
                  </button>
                  <button
                    onClick={finalizeOutpost}
                    disabled={isSyncing}
                    style={{ flex: 1, padding: '15px', background: '#fbbf24', border: 'none', color: '#020617', borderRadius: '12px', cursor: isSyncing ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                  >
                    {isSyncing ? 'SYNCING...' : 'FINISH'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default OSOutpostArena;
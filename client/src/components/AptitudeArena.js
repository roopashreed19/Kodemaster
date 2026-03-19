import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sword, CheckCircle2, XCircle, ChevronRight, LayoutDashboard, Star, AlertTriangle } from 'lucide-react';
import api from '../utils/api';


import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const AptitudeArena = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();


  const [topicData, setTopicData] = useState(null);
  const [activePhase, setActivePhase] = useState('study');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);


  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await api.get(`/aptitude/${topicId}`);
        setTopicData(response.data);
      } catch (err) {
        console.error("The Library is closed!", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [topicId]);


  const saveProgress = useCallback(async (finalScore) => {
    try {
      const xpEarned = finalScore * 10;

      await api.post('/user/add-xp', {
        xp: xpEarned,
        topicId: topicId,
        subject: 'Aptitude',
        status: finalScore > 0 ? 'success' : 'failed',
        score: finalScore
      });
      console.log(`Added ${xpEarned} XP to the hero's journey!`);
    } catch (err) {
      console.error("Failed to sync XP with the Citadel:", err);
    }
  }, [topicId]);

  // --- HANDLERS ---
  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === topicData.questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = async () => {
    if (currentQuestionIndex < topicData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowFinishModal(true);
    }
  };

  const finalizeTest = async () => {
    setShowFinishModal(false);
    setIsSyncing(true);
    await saveProgress(score);
    setIsSyncing(false);
    setActivePhase('result');
  };

  if (loading) return <div className="loading-screen">Consulting the Sages...</div>;
  if (!topicData) return <div>Topic not found in the archives.</div>;

  return (
    <div className="aptitude-container" style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', padding: '40px' }}>


      <div className="sticky-nav">
        <button className="back-btn" onClick={() => navigate('/world/aptitude')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LayoutDashboard size={20} /> Back to Aptitude Arena
        </button>
        <button className="back-btn" onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LayoutDashboard size={20} /> Return to Dashboard
        </button>
      </div>

      <div className="content-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>


        {activePhase === 'study' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="scroll-of-knowledge" style={{ background: '#1e293b', padding: '40px', borderRadius: '24px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fbbf24', marginBottom: '20px' }}>
              <BookOpen size={28} />
              <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>KNOWLEDGE SCROLL</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{topicData.conceptTitle}</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '30px' }}>{topicData.conceptDescription}</p>

            <div className="formula-box" style={{ background: '#0f172a', padding: '25px', borderRadius: '12px', marginBottom: '40px' }}>
              <h4 style={{ color: '#94a3b8', marginBottom: '15px', fontSize: '0.9rem', letterSpacing: '1px' }}>CORE FORMULAS</h4>
              {topicData.formulas.map((f, i) => (
                <div key={i} className="formula" style={{ fontSize: '1.4rem', color: '#60a5fa', margin: '15px 0' }}>
                  <InlineMath math={f} />
                </div>
              ))}
            </div>

            <button onClick={() => setActivePhase('battle')} className="enter-battle-btn" style={{ width: '100%', padding: '16px', background: '#fbbf24', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Sword size={20} /> ENTER BATTLE
            </button>
          </motion.div>
        )}


        {activePhase === 'battle' && (
          <div className="battle-quiz">
            <div className="quiz-header" style={{ marginBottom: '40px', textAlign: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Question {currentQuestionIndex + 1} of {topicData.questions.length}</span>
              <div className="progress-bar-bg" style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px', marginTop: '10px' }}>
                <div className="progress-fill" style={{ width: `${(currentQuestionIndex / topicData.questions.length) * 100}%`, height: '100%', background: '#fbbf24', borderRadius: '4px', transition: 'width 0.3s' }}></div>
              </div>
            </div>

            <motion.h3 key={currentQuestionIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
              {topicData.questions[currentQuestionIndex].questionText}
            </motion.h3>

            <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              {topicData.questions[currentQuestionIndex].options.map((option, idx) => {
                const isCorrect = option === topicData.questions[currentQuestionIndex].correctAnswer;
                const isSelected = selectedOption === option;

                let borderColor = '#334155';
                if (isAnswered) {
                  if (isCorrect) borderColor = '#22c55e';
                  else if (isSelected) borderColor = '#ef4444';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    style={{
                      padding: '20px',
                      background: isSelected ? '#1e293b' : '#0f172a',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '12px',
                      color: '#fff',
                      textAlign: 'left',
                      cursor: isAnswered ? 'default' : 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    {option}
                    {isAnswered && isCorrect && <CheckCircle2 size={20} color="#22c55e" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={20} color="#ef4444" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '30px', padding: '20px', background: '#0f172a', borderRadius: '12px', borderLeft: '4px solid #fbbf24' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>EXPLANATION</p>
                <p>{topicData.questions[currentQuestionIndex].explanation}</p>
                <button 
                  onClick={nextQuestion} 
                  disabled={isSyncing}
                  style={{ marginTop: '20px', background: isSyncing ? '#475569' : '#fbbf24', color: isSyncing ? 'white' : '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: isSyncing ? 'not-allowed' : 'pointer', float: 'right', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  {isSyncing ? 'Syncing...' : (currentQuestionIndex < topicData.questions.length - 1 ? 'Next Question' : 'Finish Test')} <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

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
                    <h2 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '15px' }}>Finalize Gauntlet?</h2>
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
                        onClick={finalizeTest}
                        style={{ flex: 1, padding: '15px', background: '#fbbf24', border: 'none', color: '#000', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        FINISH
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* PHASE 3: RESULT */}
        {activePhase === 'result' && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '60px', background: '#1e293b', borderRadius: '24px' }}>
            <Star size={80} color="#fbbf24" fill="#fbbf24" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '2rem' }}>GAUNTLET FINISHED</h2>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', margin: '10px 0 30px' }}>You scored {score} out of {topicData.questions.length}</p>
            <div style={{ padding: '20px', background: '#0f172a', borderRadius: '12px', display: 'inline-block', marginBottom: '30px' }}>
              <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>+{score * 10} XP EARNED</span>
            </div>
            <button onClick={() => navigate('/world/aptitude')} style={{ display: 'block', width: '100%', padding: '15px', background: '#334155', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>
              RETURN TO APTITUDE ARENA
            </button>
            <button onClick={() => navigate('/dashboard')} style={{ display: 'block', width: '100%', padding: '15px', background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#94a3b8', fontWeight: 'bold', cursor: 'pointer' }}>
              RETURN TO DASHBOARD
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AptitudeArena;
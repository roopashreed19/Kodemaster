import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  ChevronRight,
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  Trophy,
  Info,
  Hammer
} from 'lucide-react';
import api from '../utils/api';

const OOPSArenaQuest = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [phase, setPhase] = useState('briefing'); // 'briefing', 'battle', 'result'
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const response = await api.get(`/oops/${topicId}`);
        setData(response.data);
      } catch (err) {
        console.error("Connection Refused!", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuest();
  }, [topicId]);

  const saveXP = useCallback(async (finalScore) => {
    try {
      const xpPoints = finalScore * 20;
      await api.post('/user/add-xp', {
        xp: xpPoints,
        topicId: topicId,
        type: 'OOPS_QUEST'
      });
    } catch (err) {
      console.error("Failed to sync XP", err);
    }
  }, [topicId]);

  const handleAnswer = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === data.questions[currentQ].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextStep = () => {
    if (currentQ < data.questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      saveXP(score);
      setPhase('result');
    }
  };

  if (loading) return <div className="terminal-loader">Loading Class Schematics...</div>;
  if (!data) return <div className="error">404: Object Instance Not Found</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', padding: '40px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button onClick={() => navigate('/world/oops')} style={{ background: 'none', border: 'none', color: '#c084fc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LayoutDashboard size={18} /> Return to Oasis
        </button>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LayoutDashboard size={18} /> Return to Dashboard
        </button>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">

          {phase === 'briefing' && (
            <motion.div key="briefing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ background: '#2e1065', border: '1px solid #7e22ce', borderRadius: '24px', padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#c084fc', marginBottom: '15px' }}>
                  <Box size={32} />
                  <span style={{ fontWeight: 'bold', letterSpacing: '3px' }}>CLASS BLUEPRINT</span>
                </div>

                <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{data.conceptTitle}</h1>
                <p style={{ color: '#d8b4fe', fontSize: '1.2rem', marginBottom: '30px' }}>Domain: {data.topicId}</p>

                <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '25px', borderRadius: '16px', borderLeft: '5px solid #fbbf24', marginBottom: '30px' }}>
                  <h4 style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Info size={20} /> REAL-WORLD ANALOGY
                  </h4>
                  <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6' }}>{data.realWorldScenario}</p>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <h4 style={{ color: '#c084fc', marginBottom: '10px' }}>TECHNICAL DEEP DIVE</h4>
                  <p style={{ lineHeight: '1.8', color: '#e9d5ff' }}>{data.technicalDeepDive}</p>
                </div>

                <button onClick={() => setPhase('battle')} style={{ width: '100%', padding: '20px', background: '#a855f7', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '1.1rem' }}>
                  <Hammer size={22} fill="white" /> COMPILE AND RUN QUIZ
                </button>
              </div>
            </motion.div>
          )}

          {phase === 'battle' && (
            <motion.div key="battle" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span style={{ color: '#94a3b8' }}>Evaluating Instance {currentQ + 1} / {data.questions.length}</span>
                <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', marginTop: '15px' }}>
                  <div style={{ width: `${((currentQ + 1) / data.questions.length) * 100}%`, height: '100%', background: '#a855f7', borderRadius: '3px', transition: 'width 0.4s' }}></div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.8rem', marginBottom: '40px', textAlign: 'center' }}>
                {data.questions[currentQ].questionText}
              </h3>

              <div style={{ display: 'grid', gap: '15px' }}>
                {data.questions[currentQ].options.map((opt, i) => {
                  const isCorrect = opt === data.questions[currentQ].correctAnswer;
                  const isSelected = selectedOption === opt;
                  let border = '2px solid #3b0764';
                  let bg = '#1e1b4b';

                  if (isAnswered) {
                    if (isCorrect) border = '2px solid #22c55e';
                    else if (isSelected) border = '2px solid #ef4444';
                  } else {
                    bg = '#2e1065';
                  }

                  return (
                    <button key={i} onClick={() => handleAnswer(opt)} style={{ padding: '20px', background: bg, border, borderRadius: '15px', color: 'white', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: isAnswered ? 'default' : 'pointer' }}>
                      {opt}
                      {isAnswered && isCorrect && <CheckCircle2 size={20} color="#22c55e" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle size={20} color="#ef4444" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ marginTop: '30px', padding: '25px', background: '#3b0764', borderRadius: '15px', border: '1px solid #7e22ce' }}>
                  <p style={{ color: '#d8b4fe', fontWeight: 'bold', marginBottom: '10px' }}>COMPILER ANALYSIS:</p>
                  <p style={{ lineHeight: '1.6' }}>{data.questions[currentQ].explanation}</p>
                  <button onClick={nextStep} style={{ float: 'right', marginTop: '15px', background: '#a855f7', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Next Question <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'result' && (
            <motion.div key="result" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '80px 40px', background: '#2e1065', borderRadius: '30px', border: '2px solid #a855f7' }}>
              <Trophy size={80} color="#fbbf24" style={{ marginBottom: '20px' }} />
              <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>BUILD SUCCESSFUL</h1>
              <p style={{ fontSize: '1.4rem', color: '#d8b4fe' }}>Class instantiation complete. Accuracy: {Math.round((score / data.questions.length) * 100)}%</p>

              <div style={{ margin: '40px 0', fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>
                +{score * 20} XP ALLOCATED
              </div>

              <button onClick={() => navigate('/world/oops')} style={{ width: '100%', padding: '18px', background: '#4c1d95', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>
                RETURN TO OASIS
              </button>
              <button onClick={() => navigate('/dashboard')} style={{ width: '100%', padding: '14px', background: 'transparent', color: '#94a3b8', border: '1px solid #3b0764', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                RETURN TO DASHBOARD
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default OOPSArenaQuest;

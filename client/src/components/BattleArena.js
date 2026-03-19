import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, ChevronLeft, ChevronRight, CheckCircle2, Zap } from 'lucide-react';
import axios from 'axios';

const BattleArena = () => {
  const { subject, floorId, qId } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [output, setOutput] = useState("Status: System Ready. Awaiting Input...");
  const [isCleared, setIsCleared] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [score, setScore] = useState(0);

  const currentNum = parseInt(qId.replace(/\D/g, ''));

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        setIsCleared(false);
        setHasAttempted(false);
        setSelectedOption(null);
        setErrorStatus(false);
        setOutput(`Fetching Sector Data for Instruction ${currentNum}... [OK]`);
        
        const res = await axios.get(`http://localhost:5000/api/challenges/${subject}/${floorId}/${qId}`);
        setChallenge(res.data);
      } catch (err) {
        setOutput("❌ CRITICAL ERROR: Could not load challenge.");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [subject, floorId, qId, currentNum]);

  const handleOptionSelect = (option) => {
    if (hasAttempted) return; 
    setSelectedOption(option);
    setErrorStatus(false);
    setOutput(`Instruction Buffered: [${option}] - Ready for Execution.`);
  };

  const verifyAnswer = () => {
    if (!selectedOption || hasAttempted) return;

    setHasAttempted(true);

    if (selectedOption === challenge.expected) {
      setIsCleared(true);
      setScore(prev => prev + 1);
      setOutput(`✅ SUCCESS!\n\n[INPUT]: ${selectedOption}\n\n[SYSTEM]: Logic verified. Instruction retired successfully.`);
    } else {
      setErrorStatus(true);
      setOutput(`❌ FAILURE!\n\n[CORRECT]: ${challenge.expected}\n\n[EXPLANATION]: ${challenge.logic}\n\n[SYSTEM]: Logic fault detected. Instruction aborted.`);
    }
  };

  const handleNextTask = () => {
    if (currentNum < 30) {
      navigate(`/arena/${subject}/${floorId}/q${currentNum + 1}`);
    } else {
      navigate(`/summary/${subject}/${floorId}`, { 
        state: { score: score, total: 30 } 
      });
    }
  };

  if (loading) return (
    <div className="loading-screen" style={{ color: '#10b981', background: '#020617', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      [ BOOTING SECTOR ARENA... ]
    </div>
  );

  return (
    <div className="arena-wrapper os-arena-theme" style={{ display: 'flex', height: '100vh', background: '#020617', color: '#fff', fontFamily: "'Fira Code', monospace" }}>
      
      <aside className="scroll-of-wisdom" style={{ width: '350px', borderRight: '1px solid #1e293b', padding: '30px', background: '#030712', overflowY: 'auto' }}>
        <button className="back-btn" onClick={() => navigate(`/world/${subject}`)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '30px' }}>
            <ChevronLeft size={16}/> SECTOR MAP
        </button>
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px' }}>
               <Cpu className="icon-green" color="#10b981" />
            </div>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{challenge.title}</h2>
          </div>

          <div className="challenge-section" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ color: '#10b981', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
              ⚔️ Current Task
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{challenge.description}</p>
          </div>
        </motion.div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px' }}>
        
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#475569', marginBottom: '8px' }}>
            <span>PROGRESS: INSTRUCTION {currentNum} / 30</span>
            <span>ACCURACY: {Math.round((score / (currentNum || 1)) * 100)}%</span>
          </div>
          <div style={{ width: '100%', height: '4px', background: '#1e293b', borderRadius: '2px' }}>
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${(currentNum / 30) * 100}%` }} 
              style={{ height: '100%', background: '#10b981', borderRadius: '2px' }} 
            />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <div style={{ display: 'grid', gap: '15px', marginBottom: '40px' }}>
              {challenge.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === challenge.expected;

                // DIAGNOSTIC STYLING LOGIC
                let borderColor = '#1e293b';
                let backgroundColor = '#0f172a';
                let textColor = '#cbd5e1';

                if (hasAttempted) {
                  if (isCorrect) {
                    borderColor = '#10b981';
                    backgroundColor = 'rgba(16, 185, 129, 0.15)';
                    textColor = '#10b981';
                  } else if (isSelected && !isCorrect) {
                    borderColor = '#ef4444';
                    backgroundColor = 'rgba(239, 68, 68, 0.15)';
                    textColor = '#ef4444';
                  }
                } else if (isSelected) {
                  borderColor = '#38bdf8';
                  backgroundColor = 'rgba(56, 189, 248, 0.1)';
                  textColor = '#38bdf8';
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!hasAttempted ? { x: 5 } : {}}
                    onClick={() => handleOptionSelect(opt)}
                    disabled={hasAttempted}
                    style={{
                      padding: '20px',
                      textAlign: 'left',
                      background: backgroundColor,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      color: textColor,
                      cursor: hasAttempted ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: hasAttempted && !isCorrect && !isSelected ? 0.3 : 1
                    }}
                  >
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '4px', 
                      border: `1px solid ${textColor}`, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '0.7rem',
                      transition: '0.3s'
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <button 
                onClick={verifyAnswer}
                disabled={hasAttempted || !selectedOption}
                style={{
                  flex: 1,
                  background: hasAttempted ? '#1e293b' : '#10b981',
                  color: '#020617',
                  padding: '18px',
                  borderRadius: '8px',
                  fontWeight: '900',
                  border: 'none',
                  cursor: hasAttempted ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {hasAttempted ? "INPUT PROCESSED" : <><Zap size={18} /> EXECUTE INSTRUCTION</>}
              </button>

              <AnimatePresence>
                {hasAttempted && (
                  <motion.button 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    onClick={handleNextTask}
                    style={{
                      padding: '0 30px',
                      background: '#fff',
                      color: '#020617',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {currentNum === 30 ? "VIEW SUMMARY" : "NEXT TASK"} <ChevronRight size={18} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="terminal-box" style={{ background: '#030712', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#475569', fontSize: '0.7rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} /> <span>KERNEL_OUTPUT // {qId.toUpperCase()}</span>
            </div>
            {isCleared && <div style={{ color: '#10b981' }}>[ STATUS_OK ]</div>}
            {errorStatus && <div style={{ color: '#ef4444' }}>[ LOGIC_FAULT ]</div>}
          </div>
          <pre style={{ 
            color: isCleared ? '#4ade80' : errorStatus ? '#ef4444' : '#94a3b8', 
            margin: 0, 
            whiteSpace: 'pre-wrap',
            fontSize: '0.85rem',
            fontFamily: 'inherit'
          }}>
            {output}
          </pre>
        </div>
      </main>
    </div>
  );
};

export default BattleArena;
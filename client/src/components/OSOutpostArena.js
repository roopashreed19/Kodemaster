import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Terminal, Zap } from 'lucide-react';
import axios from 'axios';

const OSOutpostArena = () => {
  const { subject, floorId, questionId } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [output, setOutput] = useState("System Ready...");
  const [isCleared, setIsCleared] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [score, setScore] = useState(0);

  const currentNum = parseInt(questionId.replace(/\D/g, ''));

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        setIsCleared(false);
        setHasAttempted(false);
        setSelectedOption(null);
        setErrorStatus(false);

        setOutput(`Fetching Question ${currentNum}...`);

        const res = await axios.get(
          `http://localhost:5000/api/challenges/${subject}/${floorId}/${questionId}`
        );

        setChallenge(res.data);
      } catch (err) {
        setOutput("❌ ERROR: Could not load challenge.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [subject, floorId, questionId, currentNum]);

  const handleOptionSelect = (option) => {
    if (hasAttempted) return;

    setSelectedOption(option);
    setErrorStatus(false);
    setOutput(`Selected: ${option}`);
  };

  const verifyAnswer = () => {
    if (!selectedOption || hasAttempted) return;

    setHasAttempted(true);

    if (selectedOption === challenge.expected) {
      setIsCleared(true);
      setScore(prev => prev + 1);
      setOutput(`✅ CORRECT!\n\n${selectedOption}`);
    } else {
      setErrorStatus(true);
      setOutput(
        `❌ WRONG!\n\nCorrect: ${challenge.expected}\n\nExplanation:\n${challenge.logic}`
      );
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

  if (loading) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>
        <p>Loading OS Arena...</p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>
        <h2>Challenge Not Found</h2>
      </div>
    );
  }

  return (
    <div className="arena-wrapper" style={{ display: 'flex', height: '100vh', background: '#020617', color: '#fff' }}>

      {/* LEFT PANEL */}
      <aside style={{ width: '350px', padding: '20px', borderRight: '1px solid #1e293b' }}>
        <button onClick={() => navigate(`/world/${subject}`)}>
          <ChevronLeft /> Back
        </button>

        <h2 style={{ marginTop: '20px' }}>{challenge.title}</h2>

        <p style={{ marginTop: '10px', color: '#94a3b8' }}>
          {challenge.description}
        </p>
      </aside>

      {/* MAIN AREA */}
      <main style={{ flex: 1, padding: '40px' }}>

        {/* PROGRESS */}
        <div style={{ marginBottom: '30px' }}>
          <p>Question {currentNum} / 30</p>
        </div>

        {/* OPTIONS */}
        <div style={{ maxWidth: '600px', marginBottom: '30px' }}>
          {challenge.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === challenge.expected;

            let bg = '#0f172a';
            let border = '#1e293b';

            if (hasAttempted) {
              if (isCorrect) {
                bg = 'rgba(16,185,129,0.2)';
                border = '#10b981';
              } else if (isSelected) {
                bg = 'rgba(239,68,68,0.2)';
                border = '#ef4444';
              }
            } else if (isSelected) {
              bg = 'rgba(56,189,248,0.2)';
              border = '#38bdf8';
            }

            return (
              <motion.button
                key={idx}
                onClick={() => handleOptionSelect(opt)}
                disabled={hasAttempted}
                style={{
                  width: '100%',
                  padding: '15px',
                  marginBottom: '10px',
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </motion.button>
            );
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={verifyAnswer}
            disabled={!selectedOption || hasAttempted}
            style={{
              padding: '15px',
              background: '#10b981',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <Zap /> Submit
          </button>

          <AnimatePresence>
            {hasAttempted && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleNextTask}
                style={{
                  padding: '15px',
                  background: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Next <ChevronRight />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* TERMINAL */}
        <div style={{ marginTop: '30px', background: '#030712', padding: '20px', borderRadius: '10px' }}>
          <div style={{ marginBottom: '10px' }}>
            <Terminal size={14} /> Output
          </div>
          <pre>{output}</pre>
        </div>

      </main>
    </div>
  );
};

export default OSOutpostArena;
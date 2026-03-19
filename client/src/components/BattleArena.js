import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Scroll, Terminal, Play, Zap, ChevronLeft, Loader2 } from 'lucide-react';
import { challenges as localChallenges } from '../data/challenges.js'; 
import api from '../utils/api'; 
import { handleQuestVictory } from '../utils/questHelper';

const BattleArena = () => {
  const { subject, floorId, questionId } = useParams();
  const navigate = useNavigate();

  const [questData, setQuestData] = useState(null);
  const [floorColor, setFloorColor] = useState("#fbbf24");
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("System Initialized. Awaiting code execution...");
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadQuest = async () => {
      setIsLoading(true);
      

      let localQuest = localChallenges[subject]?.[floorId]?.questions.find(q => q.id === questionId);
      
      if (localQuest) {
        setQuestData(localQuest);
        setFloorColor(localChallenges[subject][floorId].color || "#f87171");
        setCode(localQuest.defaultCode[language] || "");
        setIsLoading(false);
      } else {

        try {
          const response = await api.get(`/challenges/${subject}/${floorId}/${questionId}`);
          setQuestData(response.data);
          setCode(response.data.defaultCode[language] || "");

          setFloorColor("#60a5fa"); 
        } catch (err) {
          console.error("The Judge cannot find this quest in the archives:", err);
          setQuestData(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadQuest();
  }, [subject, floorId, questionId, language]); 

  const runCode = async () => {
    if (!code || !questData) return;
    setIsRunning(true);
    setOutput("Sending your logic to the High Judge... ");

    try {
      const response = await api.post('/judge/run', {
        code: code,
        language: language,
        testCases: questData.testCases
      });

      const { success, output: executionOutput, message } = response.data;
      
      if (success) {
        setOutput(`VICTORY!\n\n${executionOutput}\n\n+${questData.xp} XP added to your profile.`);
      } else {
        setOutput(`DEFEAT!\n\n${executionOutput}\n\nError: ${message || "Logic failure detected."}`);
      }
    } catch (err) {
      setOutput("SYSTEM ERROR: The Judge is unreachable. Ensure the backend server is running.");
    } finally {
      setIsRunning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen" style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>
        <Loader2 className="animate-spin" size={48} style={{ margin: '0 auto' }} />
        <p>Retrieving Scroll from Archives...</p>
      </div>
    );
  }

  if (!questData) {
    return (
      <div className="error-screen">
        <h2>Quest Not Found</h2>
        <p>The archives have no record of this challenge.</p>
        <button onClick={() => navigate('/world/dsa')}>Return to Map</button>
      </div>
    );
  }

  return (
    <div className="arena-wrapper">
      <aside className="scroll-of-wisdom">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <button className="back-btn" onClick={() => navigate('/world/dsa')}>
            <ChevronLeft size={18} /> Back to Floor
          </button>

          <div className="scroll-header" style={{ marginTop: '20px' }}>
            <Zap color={floorColor} />
            <h2>{questData.title}</h2>
          </div>
          
          <div className="logic-section">
            <h3>📜 The Ancient Logic</h3>
            <p>{questData.logic}</p>
          </div>

          <div className="challenge-section">
            <h3>⚔️ The Quest</h3>
            <p>{questData.description}</p>
            <div className="example-box">
              <strong>Sample Input:</strong> {questData.testCases[0]?.input}<br/>
              <strong>Target Output:</strong> {questData.testCases[0]?.expected}
            </div>
          </div>
        </motion.div>
      </aside>

      <main className="editor-container">
        <div className="editor-controls">
          <div className="lang-select">
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python 3</option>
                <option value="java">Java 17</option>
                <option value="cpp">C++ 20</option>
            </select>
          </div>
          <button 
            className={`run-btn ${isRunning ? 'loading' : ''}`} 
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? "EXECUTING..." : <><Play size={16} /> RUN CODE</>}
          </button>
        </div>

        <Editor
          height="65vh"
          theme="vs-dark"
          language={language === 'cpp' ? 'cpp' : language}
          value={code}
          onChange={(value) => setCode(value)}
          options={{ fontSize: 16, minimap: { enabled: false }, automaticLayout: true }}
        />

        <div className="terminal-box">
          <div className="terminal-header">
            <Terminal size={14} /> 
            <span>Battle Log</span>
          </div>
          <pre className="terminal-output">{output}</pre>
        </div>
      </main>
    </div>
  );
};

export default BattleArena;
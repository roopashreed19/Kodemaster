import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Scroll, Terminal, Play, CheckCircle2, XCircle } from 'lucide-react';
import { challenges } from '../data/challenges'; 
import api from '../utils/api'; // Your axios instance

const BattleArena = () => {
  const currentChallenge = challenges.dsa.floor1;

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(currentChallenge.defaultCode.javascript);
  const [output, setOutput] = useState("Status: Idle. Waiting for your command...");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("The Judge is examining your scrolls... ⚖️");

    try {
      const response = await api.post('/judge/run', {
        code: code,
        language: language,
        testCases: currentChallenge.testCases
      });

      const { success, output, message } = response.data;
      
      if (success) {
        setOutput(`✅ VICTORY!\n\nOutput: ${output}\nMessage: ${message}\n\nFloor 1 Cleared! +50 XP added to your Sahyadri profile.`);
      } else {
        setOutput(`❌ DEFEAT!\n\nOutput: ${output}\nMessage: ${message}\n\nCheck your logic and try again, warrior.`);
      }
    } catch (err) {
      setOutput("❌ ERROR: Could not reach the Judge. Is the backend server running?");
    } finally {
      setIsRunning(false);
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(currentChallenge.defaultCode[newLang]);
  };

  return (
    <div className="arena-wrapper">
      <aside className="scroll-of-wisdom">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="scroll-header">
            <Scroll className="icon-gold" />
            <h2>{currentChallenge.title}</h2>
          </div>
          
          <div className="logic-section">
            <h3>📜 The Ancient Logic</h3>
            <p>{currentChallenge.logicDesc}</p>
          </div>

          

          <div className="challenge-section">
            <h3>⚔️ The Quest</h3>
            <p>{currentChallenge.description}</p>
            <div className="example-box">
              <strong>Example Input:</strong> {currentChallenge.testCases[0].input}<br/>
              <strong>Expected Output:</strong> {currentChallenge.testCases[0].expected}
            </div>
          </div>
        </motion.div>
      </aside>

      <main className="editor-container">
        <div className="editor-controls">
          <div className="lang-select">
            <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
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
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          options={{ fontSize: 16, minimap: { enabled: false }, padding: { top: 20 } }}
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
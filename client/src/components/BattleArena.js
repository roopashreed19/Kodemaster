import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Terminal, Play, Zap, ChevronLeft, Loader2, BookOpen, Sword, Send } from 'lucide-react';
import api from '../utils/api';

const BattleArena = () => {
  const { subject, floorId, questionId } = useParams();
  const navigate = useNavigate();

  const [questData, setQuestData] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("System Initialized. Awaiting logic transmission...");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Quest from DB
  useEffect(() => {
    const fetchQuest = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/challenges/${subject}/${floorId}/${questionId}`);
        if (response.data) {
          setQuestData(response.data);
          setCode(response.data.defaultCode?.[language] || "// Start coding...");
        }
      } catch (err) {
        console.error("Quest Fetch Error:", err);
        setQuestData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuest();
  }, [subject, floorId, questionId]);

  // Update code boilerplate when language changes
  useEffect(() => {
    if (questData) {
      setCode(questData.defaultCode?.[language] || "// Language not supported.");
    }
  }, [language, questData]);

  // Handle RUN Code
  const runCode = async () => {
    if (!code || !questData || isRunning) return;
    setIsRunning(true);
    setOutput("Executing logic against test cases...");
    try {
      const response = await api.post('/judge/run', { 
        code, 
        language, 
        testCases: questData.testCases 
      });
      
      const { success, output: resOutput, message } = response.data;
      setOutput(success 
        ? `>>> VICTORY detected!\n\n${resOutput}\n\n${message}` 
        : `>>> DEFEAT logic failure:\n\n${resOutput}\n\n${message}`
      );
    } catch (err) { 
      setOutput("CRITICAL ERROR: High Judge unreachable. Check server connection."); 
    } finally { 
      setIsRunning(false); 
    }
  };

  // Handle SUBMIT Solution
  const submitCode = async () => {
    if (!code || !questData || isSubmitting) return;
    setIsSubmitting(true);
    setOutput("Submitting to the High Archives...");

    try {
      const response = await api.post('/judge/submit', { 
        code, 
        language, 
        testCases: questData.testCases, 
        questId: questionId, 
        floorId, 
        subject, 
        expectedXp: questData.xp 
      });

      if (response.data.success) {
        // ONE CLEAN POPUP ON VICTORY
        alert(`VICTORY!\n\n${response.data.message}\n`);
        setOutput(`>>> ARCHIVED: Solution accepted.\nXP Added: ${response.data.xpAdded}`);
      } else {
        // ONE CLEAN POPUP ON FAILURE
        alert(`DEFEAT\n\n${response.data.message || "Logic failure detected."}`);
        setOutput(response.data.output || "Test cases failed.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      const errorMsg = err.response?.data?.message || "Connection lost. Judge is offline.";
      alert(`⚠️ SYSTEM ERROR\n\n${errorMsg}`);
      setOutput("CRITICAL: Submission protocol aborted.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#60a5fa" size={48} />
      <p style={{ color: '#60a5fa', marginTop: '20px', letterSpacing: '4px' }}>ACCESSING ARCHIVES...</p>
    </div>
  );

  if (!questData) return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ color: '#ef4444' }}>QUEST NOT FOUND</h2>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>Return to Map</button>
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <style>{`
        .terminal-scroll::-webkit-scrollbar { width: 6px; }
        .terminal-scroll::-webkit-scrollbar-track { background: #020617; }
        .terminal-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .action-btn:hover:not(:disabled) { filter: brightness(1.2); transform: translateY(-1px); }
        .action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* Left Sidebar */}
      <aside style={styles.sidebar}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <ChevronLeft size={18} /> BACK
          </button>

          <div style={styles.scrollHeader}>
            <Zap color="#fbbf24" fill="#fbbf24" size={24} />
            <h2 style={styles.title}>{questData.title.toUpperCase()}</h2>
          </div>
          
          <div style={styles.infoCard}>
            <h3 style={styles.cardLabel}><BookOpen size={14} /> THE LOGIC</h3>
            <p style={styles.cardText}>{questData.logic}</p>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.cardLabel}><Sword size={14} /> THE QUEST</h3>
            <p style={styles.cardText}>{questData.description}</p>
          </div>

          <div style={styles.xpBadge}>
            <p style={{ margin: 0, color: '#60a5fa', fontSize: '0.8rem', fontWeight: 'bold' }}>REWARD: +{questData.xp} XP</p>
          </div>
        </motion.div>
      </aside>

      {/* Main Area */}
      <main style={styles.editorArea}>
        <div style={styles.toolbar}>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.select}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python 3</option>
            <option value="java">Java 17</option>
            <option value="cpp">C++ 20</option>
          </select>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={runCode} 
              disabled={isRunning || isSubmitting} 
              className="action-btn" 
              style={{ ...styles.btn, background: '#1e293b' }}
            >
              {isRunning ? <Loader2 className="animate-spin" size={14} /> : <Play size={14} />} RUN
            </button>
            <button 
              onClick={submitCode} 
              disabled={isRunning || isSubmitting} 
              className="action-btn" 
              style={{ ...styles.btn, background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff', border: 'none' }}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />} SUBMIT
            </button>
          </div>
        </div>

        <div style={styles.editorWrapper}>
          <Editor 
            height="100%" 
            theme="vs-dark" 
            language={language === 'cpp' ? 'cpp' : language} 
            value={code} 
            onChange={setCode}
            options={{ fontSize: 16, minimap: { enabled: false }, padding: { top: 20 }, fontFamily: 'Fira Code, monospace' }}
          />
        </div>

        <div style={styles.terminal}>
          <div style={styles.terminalHeader}>
            <Terminal size={14} /> <span>SYSTEM_OUTPUT</span>
          </div>
          <pre className="terminal-scroll" style={styles.terminalOutput}>{output}</pre>
        </div>
      </main>
    </div>
  );
};

const styles = {
  wrapper: { display: 'grid', gridTemplateColumns: '400px 1fr', height: '100vh', background: '#020617', color: '#f8fafc', overflow: 'hidden' },
  sidebar: { background: '#0f172a', borderRight: '1px solid #1e293b', padding: '30px', display: 'flex', flexDirection: 'column', overflowY: 'auto' },
  backBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', color: '#94a3b8', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', marginBottom: '30px', width: 'fit-content' },
  scrollHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' },
  title: { margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' },
  infoCard: { background: 'rgba(30, 41, 59, 0.4)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' },
  cardLabel: { margin: '0 0 10px 0', fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '1px' },
  cardText: { margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: '#cbd5e1' },
  xpBadge: { marginTop: 'auto', padding: '20px', borderRadius: '12px', background: 'rgba(96, 165, 250, 0.1)', border: '1px solid rgba(96, 165, 250, 0.2)' },
  editorArea: { display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' },
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' },
  select: { background: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', outline: 'none' },
  btn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', border: '1px solid #334155', color: '#cbd5e1', fontWeight: 'bold', cursor: 'pointer' },
  editorWrapper: { flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid #1e293b' },
  terminal: { height: '200px', background: '#020617', border: '1px solid #1e293b', borderRadius: '16px', display: 'flex', flexDirection: 'column' },
  terminalHeader: { padding: '10px 20px', background: '#0f172a', fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #1e293b' },
  terminalOutput: { margin: 0, padding: '15px 20px', color: '#2dd4bf', fontSize: '0.9rem', fontFamily: 'Fira Code, monospace', overflowY: 'auto', flex: 1 }
};

export default BattleArena;
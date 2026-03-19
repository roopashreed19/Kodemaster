import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database,
    Zap,
    ChevronRight,
    ChevronLeft,
    LayoutDashboard,
    CheckCircle2,
    XCircle,
    Trophy,
    Info,
    Terminal,
    Play,
    AlertTriangle
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import api from '../utils/api';

const DBMSQuest = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [phase, setPhase] = useState('briefing'); // 'briefing', 'battle', 'result'
    const [currentQ, setCurrentQ] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);

    // Added code specific states
    const [query, setQuery] = useState("");
    const [queryOutput, setQueryOutput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [completedQuests, setCompletedQuests] = useState(new Set());
    const [showFinishModal, setShowFinishModal] = useState(false);

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                const response = await api.get(`/dbms/${topicId}`);
                setData(response.data);
            } catch (err) {
                console.error("Query Execution Failed!", err);
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
                type: 'DBMS_QUEST'
            });
        } catch (err) {
            console.error("Deadlock: Failed to commit XP transaction", err);
        }
    }, [topicId]);

    const handleAnswer = (option) => {
        if (isAnswered || completedQuests.has(currentQ)) return;
        setSelectedOption(option);
        setIsAnswered(true);
        setCompletedQuests(prev => new Set(prev).add(currentQ));
        if (option === data.questions[currentQ].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const executeSql = async () => {
        if (!query.trim()) return;
        setIsExecuting(true);
        setQueryOutput("Checking syntax and executing transaction...");
        try {
            const response = await api.post('/judge/run-sql', {
                query,
                initScript: data.questions[currentQ].initScript,
                expectedOutput: data.questions[currentQ].expectedOutput
            });
            const { success, output, message } = response.data;
            if (success) {
                setQueryOutput(`${message}\n\nResult Table:\n${output || '<Empty Interface>'}`);
                // Only give score if they haven't already passed it
                if (!isAnswered && !completedQuests.has(currentQ)) {
                    setScore(prev => prev + 1);
                    setIsAnswered(true);
                    setCompletedQuests(prev => new Set(prev).add(currentQ));
                }
            } else {
                setQueryOutput(`${message}\n\nSystem Log:\n${output}`);
            }
        } catch (err) {
            setQueryOutput(`NETWORK ERROR: ${err.message}`);
        } finally {
            setIsExecuting(false);
        }
    };

    const nextStep = () => {
        if (currentQ < data.questions.length - 1) {
            setCurrentQ(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(completedQuests.has(currentQ + 1));
            setQuery("");
            setQueryOutput("");
        } else {
            saveXP(score);
            setPhase('result');
        }
    };

    const prevStep = () => {
        if (currentQ > 0) {
            setCurrentQ(prev => prev - 1);
            setSelectedOption(null);
            setIsAnswered(completedQuests.has(currentQ - 1));
            setQuery("");
            setQueryOutput("");
        }
    };

    if (loading) return <div className="terminal-loader">Executing Query...</div>;
    if (!data) return <div className="error">404: Relation Not Found</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', padding: '40px' }}>

            <div className="sticky-nav">
                <button onClick={() => navigate('/world/dbms')} style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LayoutDashboard size={18} /> Return to Kingdom Map
                </button>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LayoutDashboard size={18} /> Return to Dashboard
                </button>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <AnimatePresence mode="wait">

                    {phase === 'briefing' && (
                        <motion.div key="briefing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: '#1e3a8a', border: '1px solid #2563eb', borderRadius: '24px', padding: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#60a5fa', marginBottom: '15px' }}>
                                    <Database size={32} />
                                    <span style={{ fontWeight: 'bold', letterSpacing: '3px' }}>SCHEMA BRIEFING</span>
                                </div>

                                <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{data.conceptTitle}</h1>
                                <p style={{ color: '#93c5fd', fontSize: '1.2rem', marginBottom: '30px' }}>Floor ID: {data.topicId}</p>

                                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '25px', borderRadius: '16px', borderLeft: '5px solid #fbbf24', marginBottom: '30px' }}>
                                    <h4 style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                        <Info size={20} /> REAL-WORLD ANALOGY
                                    </h4>
                                    <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6' }}>{data.realWorldScenario}</p>
                                </div>

                                <div style={{ marginBottom: '40px' }}>
                                    <h4 style={{ color: '#60a5fa', marginBottom: '10px' }}>TECHNICAL DEEP DIVE</h4>
                                    <p style={{ lineHeight: '1.8', color: '#bfdbfe' }}>{data.technicalDeepDive}</p>
                                </div>

                                <button onClick={() => setPhase('battle')} style={{ width: '100%', padding: '20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '1.1rem' }}>
                                    <Zap size={22} fill="white" /> INITIALIZE TRANSACTION (BATTLE)
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {phase === 'battle' && (
                        <motion.div key="battle" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <span style={{ color: '#94a3b8' }}>Executing Query {currentQ + 1} / {data.questions.length}</span>
                                <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '3px', marginTop: '15px' }}>
                                    <div style={{ width: `${((currentQ + 1) / data.questions.length) * 100}%`, height: '100%', background: '#3b82f6', borderRadius: '3px', transition: 'width 0.4s' }}></div>
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.8rem', marginBottom: '40px', textAlign: 'center' }}>
                                {data.questions[currentQ].questionText}
                            </h3>

                            <div style={{ display: 'grid', gap: '15px' }}>
                                {data.questions[currentQ].type === 'query' ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ borderRadius: '15px', overflow: 'hidden', border: '2px solid #334155' }}>
                                            <Editor
                                                height="300px"
                                                theme="vs-dark"
                                                language="sql"
                                                value={query}
                                                onChange={(val) => setQuery(val)}
                                                options={{ minimap: { enabled: false }, fontSize: 16, automaticLayout: true }}
                                            />
                                        </div>
                                        <button
                                            onClick={executeSql}
                                            disabled={isExecuting || isAnswered}
                                            style={{ padding: '15px', background: isAnswered ? '#22c55e' : '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            {isExecuting ? "EXECUTING..." : isAnswered ? "TRANSACTION SUCCESSFUL" : <><Play size={18} /> RUN COMMAND</>}
                                        </button>
                                        {queryOutput && (
                                            <div style={{ padding: '15px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#cbd5e1' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px', color: '#94a3b8' }}>
                                                    <Terminal size={14} /> Output Log
                                                </div>
                                                {queryOutput}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    (data.questions[currentQ].options || []).map((opt, i) => {
                                        const isCorrect = opt === data.questions[currentQ].correctAnswer;
                                        const isSelected = selectedOption === opt;
                                        let border = '2px solid #334155';
                                        if (isAnswered) {
                                            if (isCorrect) border = '2px solid #22c55e';
                                            else if (isSelected) border = '2px solid #ef4444';
                                        }

                                        return (
                                            <button key={i} onClick={() => handleAnswer(opt)} style={{ padding: '20px', background: '#0f172a', border, borderRadius: '15px', color: 'white', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: isAnswered ? 'default' : 'pointer' }}>
                                                {opt}
                                                {isAnswered && isCorrect && <CheckCircle2 size={20} color="#22c55e" />}
                                                {isAnswered && isSelected && !isCorrect && <XCircle size={20} color="#ef4444" />}
                                            </button>
                                        );
                                    })
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: currentQ === 0 ? 'flex-end' : 'space-between', marginTop: '40px', gap: '20px' }}>
                                {currentQ > 0 && (
                                    <button
                                        onClick={prevStep}
                                        style={{
                                            flex: 1,
                                            padding: '15px',
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            color: '#60a5fa',
                                            border: '1px solid #1e3a8a',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        <ChevronLeft size={20} /> Previous Question
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        if (currentQ === data.questions.length - 1) {
                                            setShowFinishModal(true);
                                        } else {
                                            nextStep();
                                        }
                                    }}
                                    style={{
                                        flex: currentQ === 0 ? '0 1 300px' : 1,
                                        padding: '15px',
                                        background: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {currentQ === data.questions.length - 1 ? "Finish Quest" : "Next Question"} <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Custom Finish Modal */}
                            <AnimatePresence>
                                {showFinishModal && (
                                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                            animate={{ scale: 1, opacity: 1, y: 0 }}
                                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                            style={{ background: '#1e293b', border: '1px solid #3b82f6', borderRadius: '24px', padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                                        >
                                            <div style={{ background: 'rgba(245, 158, 11, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px', color: '#f59e0b' }}>
                                                <AlertTriangle size={40} />
                                            </div>
                                            <h2 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '15px' }}>Finalize Transaction?</h2>
                                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '35px' }}>
                                                You are about to commit all answers to the database. This action will finalize your XP gains for this session.
                                            </p>
                                            <div style={{ display: 'flex', gap: '15px' }}>
                                                <button
                                                    onClick={() => setShowFinishModal(false)}
                                                    style={{ flex: 1, padding: '15px', background: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                                                >
                                                    NO
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowFinishModal(false);
                                                        nextStep();
                                                    }}
                                                    style={{ flex: 1, padding: '15px', background: '#3b82f6', border: 'none', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                                                >
                                                    YES
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>

                            {isAnswered && (
                                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ marginTop: '30px', padding: '25px', background: '#1e3a8a', borderRadius: '15px', border: '1px solid #2563eb' }}>
                                    <p style={{ color: '#60a5fa', fontWeight: 'bold', marginBottom: '10px' }}>QUERY ANALYSIS:</p>
                                    <p style={{ lineHeight: '1.6' }}>{data.questions[currentQ].explanation}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {phase === 'result' && (
                        <motion.div key="result" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '80px 40px', background: '#1e3a8a', borderRadius: '30px', border: '2px solid #3b82f6' }}>
                            <Trophy size={80} color="#fbbf24" style={{ marginBottom: '20px' }} />
                            <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>TRANSACTION COMMITTED</h1>
                            <p style={{ fontSize: '1.4rem', color: '#93c5fd' }}>Integration Complete. Accuracy: {Math.round((score / data.questions.length) * 100)}%</p>

                            <div style={{ margin: '40px 0', fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>
                                +{score * 20} XP UPLOADED
                            </div>

                            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <button
                                    onClick={() => navigate('/world/dbms')}
                                    style={{
                                        width: '100%',
                                        padding: '18px',
                                        background: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    <Database size={20} /> RETURN TO KINGDOM HUB
                                </button>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: 'transparent',
                                        color: '#94a3b8',
                                        border: '1px solid #1e3a8a',
                                        borderRadius: '12px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    <LayoutDashboard size={18} /> DASHBOARD
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default DBMSQuest;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, ChevronRight, Zap, Server } from 'lucide-react';
import api from '../utils/api';

const DBMSWorld = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await api.get('/dbms/all');
                setTopics(res.data);
            } catch (err) {
                console.error("Failed to map the database schemas:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTopics();
    }, []);

    if (loading) return <div className="loading-screen">Scanning Database Tables...</div>;

    return (
        <div className="cn-world-container" style={{ padding: '60px 40px', background: '#020617', minHeight: '100vh', color: '#f8fafc' }}>

            {/* Header Section */}
            <header style={{ maxWidth: '1200px', margin: '0 auto 60px' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Back to Dashboard
                    </button>
                    <h1 style={{ fontSize: '3.5rem', display: 'flex', alignItems: 'center', gap: '20px', color: '#60a5fa' }}>
                        <Database size={50} /> DBMS KINGDOM MAP
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', marginTop: '10px' }}>
                        Initialize your connection. Select a query floor to master the architecture of relational databases.
                    </p>
                </motion.div>
            </header>

            {/* Topics Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '25px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {topics.map((topic, index) => (
                    <motion.div
                        key={topic.topicId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -8, borderColor: '#3b82f6', boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.4)' }}
                        onClick={() => navigate(`/world/dbms/${topic.topicId}`)}
                        style={{
                            background: '#0f172a',
                            padding: '30px',
                            borderRadius: '24px',
                            border: '2px solid #1e293b',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Background Glow */}
                        <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '100px', height: '100px', background: '#3b82f6', filter: 'blur(60px)', opacity: 0.1 }}></div>

                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', marginBottom: '20px' }}>
                            <Server size={24} />
                        </div>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{topic.title}</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '25px' }}>{topic.conceptTitle}</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #1e293b' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fbbf24', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                <Zap size={14} fill="#fbbf24" /> +300 XP
                            </div>
                            <div style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                ENTER SCHEMA <ChevronRight size={16} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DBMSWorld;

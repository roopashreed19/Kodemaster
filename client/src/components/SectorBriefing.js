import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import api from '../utils/api';

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 10);
    return () => clearInterval(timer);
  }, [text]);

  return <span style={{ whiteSpace: 'pre-line' }}>{displayedText}</span>;
};

const SectorBriefing = () => {
  const { subject, floorId } = useParams();
  const [floorData, setFloorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBriefing = async () => {
      try {
        setLoading(true);
        setError(false);
        const endpoint = subject === 'os' ? '/os' : `/${subject}`;
        const res = await api.get(endpoint);

        const currentFloorQuests = res.data.filter(q => q.floorId === floorId);

        if (currentFloorQuests && currentFloorQuests.length > 0) {
          const sortedQuests = currentFloorQuests.sort((a, b) => {
            const numA = parseInt(a.id?.replace(/\D/g, '') || "0");
            const numB = parseInt(b.id?.replace(/\D/g, '') || "0");
            return numA - numB;
          });

          setFloorData({
            name: sortedQuests[0].floorName || "Unnamed Floor",
            brief: sortedQuests[0].floorBrief || "No brief available.",
            firstTaskId: sortedQuests[0].id,
            totalTasks: currentFloorQuests.length
          });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Briefing Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBriefing();
  }, [subject, floorId]);

  const startTasks = () => {
    if (floorData?.firstTaskId) {
      navigate(`/arena/${subject}/${floorId}/${floorData.firstTaskId}`);
    }
  };

  if (loading) return (
    <div className="loading-screen" style={{ color: '#10b981', background: '#020617', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      <Loader2 className="animate-spin" style={{ marginBottom: '20px' }} size={48} />
      <div>[ MOUNTING SECTOR ARCHIVES... ]</div>
    </div>
  );

  if (error) return (
    <div className="error-screen" style={{ color: '#ef4444', textAlign: 'center', marginTop: '20%' }}>
      <AlertCircle size={64} style={{ margin: '0 auto 20px' }} />
      <h2>SEGMENTATION FAULT</h2>
      <button onClick={() => navigate('/world/os')} style={{ color: '#10b981', background: 'none', border: '1px solid #10b981', padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}>
        REBOOT SYSTEM MAP
      </button>
    </div>
  );

  return (
    <div className="briefing-wrapper" style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', color: '#fff', fontFamily: "'Fira Code', monospace" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        <header style={{ borderBottom: '1px solid #1e293b', paddingBottom: '30px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <BookOpen color="#10b981" size={40} />
            <div>
              <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '3px' }}>
                LOCAL_MAN_PAGE // {floorId?.toUpperCase()}
              </span>
              <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: '900', textTransform: 'uppercase' }}>
                {floorData?.name}
              </h1>
            </div>
          </div>
        </header>

        <section style={{
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '40px',
          borderRadius: '12px',
          border: '1px solid #1e293b',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontSize: '1rem', marginBottom: '25px', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', paddingBottom: '10px', width: 'fit-content' }}>
            <Terminal size={18} /> KERNEL_LOGIC_SUMMARY
          </h3>

          <div style={{
            lineHeight: '2',
            color: '#cbd5e1',
            fontSize: '0.95rem',
            whiteSpace: 'pre-line',
            minHeight: '200px'
          }}>
            <TypewriterText text={floorData?.brief || ""} />
          </div>
        </section>

        <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={startTasks}
            style={{
              background: '#10b981',
              color: '#020617',
              padding: '20px 60px',
              fontSize: '1.1rem',
              fontWeight: '900',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            EXECUTE FLOOR TASKS <ChevronRight size={20} />
          </motion.button>

          <div style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 'bold' }}>
            [ STATUS: AUTHORIZED | STACK_DEPTH: {floorData?.totalTasks} UNITS ]
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectorBriefing;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, Code, ArrowRight, Cpu, Layers, 
  Terminal, CheckCircle, Sparkles, Box, Github, 
  Database, Layout, Workflow 
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#020617', 
      color: '#f8fafc', 
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      overflowX: 'hidden',
      position: 'relative',
      scrollBehavior: 'smooth'
    }}>
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <motion.div 
          variants={glowVariants}
          animate="animate"
          style={{ position: 'absolute', top: '-15%', left: '-10%', width: '45%', height: '45%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(90px)' }} 
        />
        <motion.div 
          variants={glowVariants}
          animate="animate"
          style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '55%', height: '55%', background: 'radial-gradient(circle, rgba(34,212,191,0.1) 0%, transparent 70%)', filter: 'blur(110px)' }} 
        />
      </div>

      {/* --- FLOATING NAVBAR --- */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', padding: '20px 80px', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(15px)', 
        borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(2, 6, 23, 0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
          <div style={{ padding: '8px', background: '#6366f1', borderRadius: '10px' }}>
            <Zap color="#fff" fill="#fff" size={20} />
          </div>
          <span style={{ background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FORGEMIND
          </span>
        </div>
        <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
          <a href="#problem" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600' }} className="nav-link">Mission</a>
          <a href="#arenas" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600' }} className="nav-link">Arenas</a>
          <a href="#stack" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600' }} className="nav-link">Stack</a>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#6366f1', color: '#fff', borderColor: '#6366f1' }}
            onClick={() => navigate('/auth')} 
            style={{ background: 'transparent', color: '#6366f1', border: '1px solid #6366f1', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
          >
            LOGIN
          </motion.button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ padding: '140px 20px', textAlign: 'center', position: 'relative', zIndex: 10 }}
      >
        <motion.div variants={itemVariants} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'rgba(99,102,241,0.1)', borderRadius: '100px', border: '1px solid rgba(99,102,241,0.2)', color: '#6366f1', fontSize: '0.9rem', fontWeight: '600', marginBottom: '25px' }}>
          <Sparkles size={16} /> <span>Engineering Mastery Refined</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          style={{ fontSize: '5.5rem', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-2px' }}
        >
          Master the Machine. <br />
          <span style={{ background: 'linear-gradient(to right, #6366f1, #22d4bf, #6366f1)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 4s linear infinite' }}>
            Conquer the Code.
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} style={{ fontSize: '1.4rem', color: '#94a3b8', maxWidth: '800px', margin: '0 auto 50px', lineHeight: '1.6' }}>
          ForgeMind transforms complex engineering domains into interactive, high-stakes arenas. Validate your technical mastery across OS, OOPs, DSA, and Networking.
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth')}
            style={{ padding: '22px 50px', fontSize: '1.2rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', margin: '0 auto' }}
          >
            INITIALIZE FORGE <ArrowRight size={22} />
          </motion.button>
        </motion.div>
      </motion.section>

      {/* --- PROBLEM & SOLUTION SECTION --- */}
      <section id="problem" style={{ padding: '100px 80px', background: 'rgba(15, 23, 42, 0.4)', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1300px', margin: '0 auto' }}>
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }} style={{ padding: '40px', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h2 style={{ color: '#ef4444', marginBottom: '20px', fontSize: '2rem' }}>The Problem Statement</h2>
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: '1.8' }}>
              Theoretical knowledge of Operating Systems and OOPs often fails at the interview level. Students can define "Deadlocks" or "Polymorphism" but fail to apply these concepts in high-pressure scenarios, leading to a disconnect between graduation and industry-level technical fluency.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }} style={{ padding: '40px', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '24px', border: '1px solid rgba(34, 212, 191, 0.2)' }}>
            <h2 style={{ color: '#22d4bf', marginBottom: '20px', fontSize: '2rem' }}>The ForgeMind Solution</h2>
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: '1.8' }}>
              We provide an integrated ecosystem where <b>OS Threads</b>, <b>OOPs Principles</b>, and <b>Network Protocols</b> are taught through gamified action. By simulating real-world system behaviors, ForgeMind replaces rote learning with practical logical intuition and quantifiable progress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- OBJECTIVES & IMPLEMENTATION --- */}
      <motion.section 
        id="arenas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        style={{ padding: '120px 80px', position: 'relative', zIndex: 10 }}
      >
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '3rem', fontWeight: '800', marginBottom: '80px' }}>
            Project Architecture
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '100px' }}>
            <ObjectiveCard variants={itemVariants} title="Core Objectives" list={["System Thinking Integration", "Gamified Technical Validation", "OS & OOPs Mastery", "Industry-Level Readiness"]} color="#6366f1" />
            <ObjectiveCard variants={itemVariants} title="Implemented Modules" list={["CN Arena (15 Protocol Floors)", "OS Outpost (Scheduling Quests)", "OOPs Arena (Object Logic)", "DSA Dungeon (Algorithm Mastery)"]} color="#22d4bf" />
          </div>

          {/* TECH STACK SECTION */}
          <motion.div id="stack" variants={itemVariants} style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '50px' }}>Built on the MERN Stack</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
              <TechBadge icon={<Layers size={22} />} name="MongoDB Atlas" />
              <TechBadge icon={<Terminal size={22} />} name="Express.js" />
              <TechBadge icon={<Code size={22} />} name="React.js" />
              <TechBadge icon={<Cpu size={22} />} name="Node.js" />
              <TechBadge icon={<Box size={22} />} name="Framer Motion" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- FOOTER --- */}
      <footer style={{ padding: '60px 80px', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#64748b', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px' }}>
          <Github size={20} style={{ cursor: 'pointer' }} />
        </div>
        © 2026 ForgeMind Ecosystem • Architected for Excellence
      </footer>

      {/* CSS for Gradient and Smooth Scroll */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .nav-link:hover { color: #6366f1 !important; }
      `}</style>
    </div>
  );
};

// Reusable Sub-Components
const ObjectiveCard = ({ title, list, color, variants }) => (
  <motion.div 
    variants={variants}
    whileHover={{ y: -8, borderColor: color }}
    style={{ 
      padding: '40px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '28px', 
      border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.4s ease'
    }}
  >
    <h3 style={{ color: color, marginBottom: '25px', fontSize: '1.6rem', fontWeight: '700' }}>{title}</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {list.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', color: '#cbd5e1', fontSize: '1.1rem' }}>
          <CheckCircle size={18} color="#22c55e" /> {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const TechBadge = ({ icon, name }) => (
  <motion.div 
    whileHover={{ y: -5, borderColor: '#6366f1', color: '#6366f1' }}
    style={{ 
      display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 30px', 
      background: '#0f172a', borderRadius: '100px', border: '1px solid #1e293b',
      fontWeight: '600', fontSize: '1.05rem', cursor: 'default', transition: 'all 0.3s'
    }}
  >
    <span style={{ color: '#6366f1' }}>{icon}</span>
    <span>{name}</span>
  </motion.div>
);

export default LandingPage;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, Coins, X, Flame } from 'lucide-react';
import api from '../utils/api';

const DailyCheckIn = ({ isOpen, onClose, onRewardClaimed, userData }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await api.post('/user/daily-checkin');
      setRewardAmount(res.data.reward);
      setSuccess(true);
      if (onRewardClaimed) {
        onRewardClaimed(res.data);
      }
    } catch (err) {
      console.error('Check-in failed:', err.response?.data?.msg || err.message);
      // If already checked in, we just close the modal or show a message
      if (err.response?.status === 400) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const streak = userData?.checkInStreak || 0;
  const nextReward = Math.min(10 + streak * 5, 50);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(2, 6, 23, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            style={{
              background: '#0f172a',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '450px',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 0 50px rgba(56, 189, 248, 0.15)',
              textAlign: 'center'
            }}
          >
            {!success ? (
              <>
                <button
                  onClick={onClose}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>

                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(56, 189, 248, 0.1)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: '#38bdf8'
                }}>
                  <Calendar size={40} />
                </div>

                <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '10px' }}>Daily Check-in</h2>
                <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
                  Log in daily to maintain your streak and earn more coins!
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    padding: '15px 25px',
                    borderRadius: '16px',
                    border: '1px solid rgba(245, 158, 11, 0.2)'
                  }}>
                    <div style={{ color: '#f59e0b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '5px' }}>Current Streak</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <Flame size={20} fill="#f59e0b" /> {streak} Days
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckIn}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: loading ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 10px 20px -5px rgba(14, 165, 233, 0.4)'
                  }}
                >
                  {loading ? 'Processing...' : (
                    <>Claim {nextReward} <Coins size={20} /></>
                  )}
                </motion.button>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12 }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: '#22c55e'
                }}>
                  <CheckCircle2 size={50} />
                </div>
                <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '10px' }}>Awesome!</h2>
                <p style={{ color: '#94a3b8', marginBottom: '20px' }}>You claimed your daily reward</p>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '900',
                  color: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginBottom: '30px'
                }}>
                  +{rewardAmount} <Coins size={40} fill="#f59e0b" />
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Continue
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DailyCheckIn;

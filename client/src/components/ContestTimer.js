import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';

const ContestTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(20, 0, 0); 
      
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="timer-card"
    >
      <div className="timer-header">
        <Swords size={20} className="pulse-icon" />
        <span>NEXT BATTLE BEGINS</span>
      </div>
      
      <div className="countdown-display">
        <div className="time-unit">
          <span className="time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="time-label">HRS</span>
        </div>
        <span className="time-separator">:</span>
        <div className="time-unit">
          <span className="time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="time-label">MIN</span>
        </div>
        <span className="time-separator">:</span>
        <div className="time-unit">
          <span className="time-val color-alert">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="time-label">SEC</span>
        </div>
      </div>

      <button className="register-btn">READY UP</button>
    </motion.div>
  );
};

export default ContestTimer;
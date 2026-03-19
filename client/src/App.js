import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import DSADungeon from './components/DSADungeon';
import BattleArena from './components/BattleArena';
import OSOutpost from './components/OSOutpost';
import SectorBriefing from './components/SectorBriefing';
import FloorSummary from './components/FloorSummary'; 
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/world/dsa" element={<DSADungeon />} />
        <Route path="/world/os" element={<OSOutpost />} />
        
        <Route path="/briefing/:subject/:floorId" element={<SectorBriefing />} />
        <Route path="/arena/:subject/:floorId/:qId" element={<BattleArena />} />
        <Route path="/summary/:subject/:floorId" element={<FloorSummary />} />

        <Route path="*" element={<div className="error-screen">404: SECTOR NOT FOUND</div>} />
      </Routes>
    </Router>
  );
}

export default App;
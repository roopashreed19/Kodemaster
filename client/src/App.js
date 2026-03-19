import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AptitudeWorld from './components/AptitudeWorld';
import DSADungeon from './components/DSADungeon';
import BattleArena from './components/BattleArena';
import OSOutpost from './components/OSOutpost';
import OSOutpostArena from './components/OSOutpostArena'; 
import SectorBriefing from './components/SectorBriefing';
import FloorSummary from './components/FloorSummary'; 
import './App.css';
import AptitudeArena from './components/AptitudeArena';
import CNArenaQuest from './components/CNArenaQuest';
import CNArenaWorld from './components/CNArenaWorld';
import OOPSArenaWorld from './components/OOPSArenaWorld';
import OOPSArenaQuest from './components/OOPSArenaQuest';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './components/LandingPage';
import DBMSWorld from './components/DBMSWorld';
import DBMSQuest from './components/DBMSQuest';
import Arcade from './components/Arcade';
import MemoryMatch from './components/games/MemoryMatch';
import TicTacToe from './components/games/TicTacToe';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/world/dsa" element={<DSADungeon />} />
        <Route path="/arena/dsa/:floorId/:questionId" element={<BattleArena />} />

        <Route path="/world/os" element={<OSOutpost />} />
        <Route path="/briefing/:subject/:floorId" element={<SectorBriefing />} />
        <Route path="/summary/:subject/:floorId" element={<FloorSummary />} />
        <Route path="/arena/os/:floorId/:questionId" element={<OSOutpostArena />} />

        <Route path="/world/aptitude" element={<AptitudeWorld />} />
        <Route path="/aptitude-arena/:topicId" element={<AptitudeArena />} />

        <Route path="/world/cn" element={<CNArenaWorld />} />
        <Route path="/world/cn/:topicId" element={<CNArenaQuest />} />

        <Route path="/world/oops" element={<OOPSArenaWorld />} />
        <Route path="/world/oops/:topicId" element={<OOPSArenaQuest />} />

        <Route path="/world/dbms" element={<DBMSWorld />} />
        <Route path="/world/dbms/:topicId" element={<DBMSQuest />} />
        
        <Route path="/arcade" element={<Arcade />} />
        <Route path="/games/memory" element={<MemoryMatch />} />
        <Route path="/games/tictactoe" element={<TicTacToe />} />
        <Route path="*" element={<div className="error-screen">404: SECTOR NOT FOUND</div>} />
      </Routes>
    </Router>
  );
}

export default App;
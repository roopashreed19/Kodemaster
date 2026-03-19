import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AptitudeWorld from './components/AptitudeWorld';
import DSADungeon from './components/DSADungeon';
import BattleArena from './components/BattleArena';
import './App.css';
import AptitudeArena from './components/AptitudeArena';
import CNArenaQuest from './components/CNArenaQuest';
import CNArenaWorld from './components/CNArenaWorld';
import LandingPage from './components/LandingPage';
import DBMSWorld from './components/DBMSWorld';
import DBMSQuest from './components/DBMSQuest';
import Arcade from './components/Arcade';
import Logic2048 from './components/games/MemoryMatch';
import TicTacToe from './components/games/TicTacToe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/world/dsa" element={<DSADungeon />} />
        <Route path="/arena/:subject/:floorId/:questionId" element={<BattleArena />} />
        <Route path="/world/aptitude" element={<AptitudeWorld />} />
        <Route path="/aptitude-arena/:topicId" element={<AptitudeArena />} />
        <Route path="/world/cn" element={<CNArenaWorld />} />
        <Route path="/world/cn/:topicId" element={<CNArenaQuest />} />
        <Route path="/world/dbms" element={<DBMSWorld />} />
        <Route path="/world/dbms/:topicId" element={<DBMSQuest />} />
        <Route path="/arcade" element={<Arcade />} />
        <Route path="/games/2048" element={<Logic2048 />} />
        <Route path="/games/tictactoe" element={<TicTacToe />} />
      </Routes>
    </Router>
  );
}

export default App;

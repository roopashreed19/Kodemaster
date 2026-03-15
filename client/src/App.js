import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import DSADungeon from './components/DSADungeon';
import BattleArena from './components/BattleArena';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/world/dsa" element={<DSADungeon />} />
        <Route path="/arena/:subject/:floorId" element={<BattleArena />} />
      </Routes>
    </Router>
  );
}

export default App;

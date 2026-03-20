const express = require('express');
const router = express.Router();
const Challenge = require('../models/challenges'); // Ensure this matches your filename/case

// 1. GET all floors for a subject (e.g., /api/challenges/dsa)
router.get('/:subject', async (req, res) => {
  try {
    const { subject } = req.params;
    const quests = await Challenge.find({ subject: subject.toLowerCase() });

    // Grouping flat quests into Floor objects for the UI
    const grouped = quests.reduce((acc, quest) => {
      let floor = acc.find(f => f.floorId === quest.floorId);
      if (!floor) {
        floor = {
          floorId: quest.floorId,
          name: quest.floorName || "Unnamed Realm",
          color: getFloorColor(quest.floorId),
          questions: []
        };
        acc.push(floor);
      }
      floor.questions.push(quest);
      return acc;
    }, []);

    // Sort floors numerically (floor1, floor2, etc.)
    res.json(grouped.sort((a, b) => a.floorId.localeCompare(b.floorId, undefined, { numeric: true })));
  } catch (err) {
    res.status(500).json({ message: "Dungeon connection failed" });
  }
});

// 2. GET a single quest (e.g., /api/challenges/dsa/floor1/q1)
router.get('/:subject/:floorId/:questionId', async (req, res) => {
  try {
    const { subject, floorId, questionId } = req.params;
    const quest = await Challenge.findOne({ 
      subject: subject.toLowerCase(), 
      floorId, 
      id: questionId 
    });
    if (!quest) return res.status(404).json({ message: "Quest not found" });
    res.json(quest);
  } catch (err) {
    res.status(500).json({ message: "Judge is busy" });
  }
});

function getFloorColor(id) {
  const colors = { floor1: '#f87171', floor2: '#60a5fa', floor3: '#fbbf24', floor4: '#4ade80', floor5: '#c084fc' };
  return colors[id] || '#818cf8';
}

module.exports = router;
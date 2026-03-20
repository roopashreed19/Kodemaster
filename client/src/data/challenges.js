const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge'); // Your Mongoose Model

// @route   GET /api/challenges/:subject
// @desc    Get all quests for a subject grouped by floor
router.get('/:subject', async (req, res) => {
  try {
    const { subject } = req.params;
    
    // 1. Fetch all quests for that subject (e.g., 'dsa')
    const quests = await Challenge.find({ subject: subject.toLowerCase() });

    if (!quests || quests.length === 0) {
      return res.status(200).json([]); // Return empty array if nothing found
    }

    // 2. Group them by floorId for the Dungeon UI
    const groupedData = quests.reduce((acc, quest) => {
      const floor = acc.find(f => f.floorId === quest.floorId);
      if (floor) {
        floor.questions.push(quest);
      } else {
        acc.push({
          floorId: quest.floorId,
          name: quest.floorName || "Unnamed Floor",
          color: getFloorColor(quest.floorId),
          questions: [quest]
        });
      }
      return acc;
    }, []);

    // 3. Sort by floor number (floor1, floor2, etc.)
    const sortedData = groupedData.sort((a, b) => {
        return a.floorId.localeCompare(b.floorId, undefined, {numeric: true});
    });

    res.json(sortedData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Helper for UI colors
function getFloorColor(id) {
  const colors = { 
    floor1: '#f87171', floor2: '#60a5fa', floor3: '#fbbf24', 
    floor4: '#4ade80', floor5: '#c084fc' 
  };
  return colors[id] || '#818cf8';
}

module.exports = router;
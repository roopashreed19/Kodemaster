const express = require('express');
const router = express.Router();
const CNArena = require('../models/CNArena'); // Ensure this model exists

// Get all CN topics for the selection screen
router.get('/all', async (req, res) => {
  try {
    const topics = await CNArena.find({}, 'topicId title conceptTitle');
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific CN topic by its ID
router.get('/:topicId', async (req, res) => {
  try {
    const topic = await CNArena.findOne({ topicId: req.params.topicId });
    if (!topic) return res.status(404).json({ message: "Quest not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
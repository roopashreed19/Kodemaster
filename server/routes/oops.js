const express = require('express');
const router = express.Router();
const OOPSArena = require('../models/OOPSArena');
const auth = require('../middleware/auth'); // assuming it exists

// @route   GET /api/oops/all
// @desc    Get all OOPs topics for the world map
// @access  Public (or Private depending on your setup)
router.get('/all', async (req, res) => {
  try {
    const topics = await OOPSArena.find().select('-questions');
    res.json(topics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/oops/:topicId
// @desc    Get a specific OOPs topic with questions
// @access  Public
router.get('/:topicId', async (req, res) => {
  try {
    const topic = await OOPSArena.findOne({ topicId: req.params.topicId });
    if (!topic) {
      return res.status(404).json({ msg: 'Topic not found' });
    }
    res.json(topic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

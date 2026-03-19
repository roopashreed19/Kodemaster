const express = require('express');
const router = express.Router();
const Aptitude = require('../models/Aptitude');


router.get('/all', async (req, res) => {
  try {
    const topics = await Aptitude.find({}, 'topicId title questions');
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:topicId', async (req, res) => {
  try {
    const topic = await Aptitude.findOne({ topicId: req.params.topicId });
    if (!topic) return res.status(404).json({ msg: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
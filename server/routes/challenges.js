const express = require('express');
const router = express.Router();
const Challenge = require('../models/challenges');

// Get all questions for a specific floor
router.get('/:subject/:floorId', async (req, res) => {
    try {
        const { subject, floorId } = req.params;
        // This find() must match the fields in your MongoDB exactly
        const questions = await Challenge.find({ subject, floorId }); 
        console.log(`Searching for: ${subject}, ${floorId}`); // Add this log
        console.log(`Found: ${questions.length} questions`);  // Add this log
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// Get a specific question
router.get('/:subject/:floorId/:questionId', async (req, res) => {
    try {
        const quest = await Challenge.findOne({ 
            subject: req.params.subject, 
            floorId: req.params.floorId,
            id: req.params.questionId
        });
        res.json(quest);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch quest" });
    }
});

module.exports = router;
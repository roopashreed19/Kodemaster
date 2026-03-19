const express = require('express');
const router = express.Router();
const Challenge = require('../models/challenges');


router.get('/:subject/:floorId', async (req, res) => {
    try {
        const { subject, floorId } = req.params;
        const questions = await Challenge.find({ subject, floorId }); 
        console.log(`Searching for: ${subject}, ${floorId}`); 
        console.log(`Found: ${questions.length} questions`); 
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});


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
const express = require('express');
const router = express.Router();
const Challenge = require('../models/challenges'); 
const OSQuest = require('../models/OSQuest');    

router.get('/:subject', async (req, res) => {
    try {
        const { subject } = req.params;
        let quests;

        if (subject === 'os') {
            quests = await OSQuest.find().lean();
        } else {
            quests = await Challenge.find({ subject: subject }).lean();
        }

        if (!quests || quests.length === 0) {
            return res.status(404).json({ message: "No data found for this subject." });
        }

        res.json(quests);
    } catch (err) {
        res.status(500).json({ error: "Internal System Failure", details: err.message });
    }
});

router.get('/:subject/:floorId/:id', async (req, res) => {
    try {
        const { subject, floorId, id } = req.params;
        let challenge;

        if (subject === 'os') {
            challenge = await OSQuest.findOne({ floorId, id }).lean();
        } else {
            challenge = await Challenge.findOne({ subject, floorId, id }).lean();
        }

        if (!challenge) return res.status(404).json({ message: "Challenge not found." });
        res.json(challenge);
    } catch (err) {
        res.status(500).json({ error: "Database Access Error" });
    }
});

module.exports = router;
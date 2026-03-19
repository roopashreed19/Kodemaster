const express = require('express');
const router = express.Router();

const OSQuest = require('../models/OSQuest');

router.get('/', async (req, res) => {
    try {
        const quests = await OSQuest.find().lean();
        if (!quests || quests.length === 0) return res.status(404).json([]);
        res.json(quests);
    } catch (err) {
        res.status(500).json({ error: "Internal System Failure", details: err.message });
    }
});

router.get('/:floorId/:questionId', async (req, res) => {
    try {
        const { floorId, questionId } = req.params;
        const challenge = await OSQuest.findOne({ floorId, id: questionId }).lean();
        if (!challenge) return res.status(404).json({ message: "Not Found" });
        res.json(challenge);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Challenge = require('../models/challenges');
const Submission = require('../models/Submission'); 
const auth = require('../middleware/auth');

// Helper function for Level Calculation
const calculateLevel = (xp) => Math.floor(Math.sqrt(xp / 100)) + 1;

// --- ROUTE 1: ADD XP & HANDLE LEVEL UP ---
router.put('/add-xp', auth, async (req, res) => {
  const { xpToAdd } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const oldLevel = calculateLevel(user.xp);
    
    user.xp += xpToAdd;
    const newLevel = calculateLevel(user.xp);
    
    let levelUp = false;
    if (newLevel > oldLevel) {
      user.level = newLevel;
      levelUp = true;
    }

    await user.save();
    res.json({ xp: user.xp, level: user.level, levelUp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- ROUTE 2: CHECK FLOOR PROGRESS & COMPLETION ---
router.get('/progress/:floorId', auth, async (req, res) => {
  try {
    const { floorId } = req.params;
    const userId = req.user.id; // Now using authenticated user ID

    // 1. Get total number of quests existing for this floor
    const totalQuests = await Challenge.countDocuments({ floorId });

    // 2. Get unique quests this specific user has passed
    const passedQuests = await Submission.distinct('questId', {
      userId: userId, 
      floorId: floorId,
      status: "success"
    });

    const isAllCleared = passedQuests.length >= totalQuests && totalQuests > 0;

    // Optional: If all cleared, you could automatically update user.completedFloors here
    if (isAllCleared) {
        await User.findByIdAndUpdate(userId, { 
            $addToSet: { completedFloors: floorId } 
        });
    }

    res.json({
      allCleared: isAllCleared,
      progress: `${passedQuests.length}/${totalQuests}`,
      count: passedQuests.length,
      total: totalQuests
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "The Archive could not be read." });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Challenge = require('../models/challenges');
const Submission = require('../models/Submission'); 
const auth = require('../middleware/auth');


const calculateLevel = (xp) => Math.floor(xp / 50) + 1;


router.post('/add-xp', auth, async (req, res) => {
  const { xp, topicId, subject, status, score } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const oldLevel = calculateLevel(user.xp);
    
    user.xp += parseInt(xp) || 0;
    const newLevel = calculateLevel(user.xp);
    
    // Log history
    user.xpHistory.push({ xp: user.xp, date: new Date() });
    // Keep history manageable
    if (user.xpHistory.length > 50) user.xpHistory.shift();

    let levelUp = false;
    if (newLevel > oldLevel) {
      user.level = newLevel;
      levelUp = true;
    }

    // Record submission if part of a quest/topic
    if (topicId) {
        const submission = new Submission({
            userId: user._id,
            questId: topicId,
            subject: subject || "General",
            status: status || "success",
            score: parseInt(score) || 0,
            code: "QUIZ_COMPLETED",
            floorId: "0"
        });
        await submission.save();
    }

    await user.save();
    res.json({ xp: user.xp, level: user.level, levelUp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/progress/:floorId', auth, async (req, res) => {
  try {
    const { floorId } = req.params;
    const userId = req.user.id;


    const totalQuests = await Challenge.countDocuments({ floorId });

    const passedQuests = await Submission.distinct('questId', {
      userId: userId, 
      floorId: floorId,
      status: "success"
    });

    const isAllCleared = passedQuests.length >= totalQuests && totalQuests > 0;

    if (isAllCleared) {
        await User.findByIdAndUpdate(userId, { 
            $addToSet: { completedFloors: floorId } 
        });
    }

    res.json({
      allCleared: isAllCleared,
      progress: `${passedQuests.length}/${totalQuests}`,
      count: passedQuests.length,
      total: totalQuests,
      passedQuests: passedQuests
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "The Archive could not be read." });
  }
});

// @route   GET api/user/leaderboard
// @desc    Get top users by XP
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const topUsers = await User.find()
      .select('username xp level')
      .sort({ xp: -1 })
      .limit(10);
    res.json(topUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/user/me
// @desc    Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Ensure level is synced with current formula
    const currentLevel = calculateLevel(user.xp);
    if (user.level !== currentLevel) {
        user.level = currentLevel;
        await user.save();
    }

    // Also fetch their recent submissions
    const submissions = await Submission.find({ userId: req.user.id })
      .sort({ submittedAt: -1 })
      .limit(5);

    // Fallback for XP history if empty (add initial points for graph)
    let xpHistory = user.xpHistory || [];
    if (xpHistory.length === 0) {
        xpHistory = [
            { xp: 0, date: user.createdAt || new Date(Date.now() - 86400000) },
            { xp: user.xp, date: new Date() }
        ];
    } else if (xpHistory.length === 1) {
        xpHistory.unshift({ xp: 0, date: user.createdAt || new Date(xpHistory[0].date - 86400000) });
    }

    res.json({ 
        user: { ...user.toObject(), xpHistory }, 
        recentSubmissions: submissions 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
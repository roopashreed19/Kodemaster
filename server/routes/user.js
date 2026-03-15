router.put('/add-xp', auth, async (req, res) => {
  const { xpToAdd } = req.body;
  try {
    let user = await User.findById(req.user.id);
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
    res.status(500).send('Server Error');
  }
});
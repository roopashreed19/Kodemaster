const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  worldCategory: { 
    type: String, 
    enum: ['Programming Kingdom', 'DSA Dungeon', 'Database City', 'OS Realm', 'Network Island'],
    required: true 
  },
  baseXP: { type: Number, required: true },
  coinsReward: { type: Number, default: 10 },
  testCases: [{
    input: String,
    expectedOutput: String,
    isPublic: { type: Boolean, default: true } 
  }]
});



module.exports = mongoose.model('Quest', QuestSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  coins: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  checkInStreak: { type: Number, default: 0 },
  lastCheckIn: { type: Date },
  lastActive: { type: Date, default: Date.now },
  badges: [{ 
    name: String, 
    earnedAt: { type: Date, default: Date.now } 
  }],
  completedQuests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }],
  completedFloors: [{ type: String }],
  xpHistory: [{
    xp: Number,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
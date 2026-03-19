const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  floorId: { type: String, required: true },
  floorName: String,
  id: String,
  title: String,
  difficulty: String,
  xp: Number,
  description: String,
  logic: String,
  testCases: Array,
  defaultCode: Object
});

module.exports = mongoose.model('Challenge', challengeSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;
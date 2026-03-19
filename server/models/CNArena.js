const mongoose = require('mongoose');

const cnSchema = new mongoose.Schema({
  topicId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  conceptTitle: { type: String, required: true },
  realWorldScenario: { type: String, required: true },
  technicalDeepDive: { type: String, required: true },
  questions: [{
    id: String,
    questionText: String,
    options: [String],
    correctAnswer: String,
    explanation: String
  }]
});




module.exports = mongoose.model('CNArena', cnSchema, 'cn_quests');
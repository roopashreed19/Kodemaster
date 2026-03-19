const mongoose = require('mongoose');

const oopsSchema = new mongoose.Schema({
  topicId: String,
  title: String,
  conceptTitle: String,
  realWorldScenario: String,
  technicalDeepDive: String,
  questions: [{
    id: String,
    questionText: String,
    options: [String],
    correctAnswer: String,
    explanation: String
  }]
});

module.exports = mongoose.model('OOPSArena', oopsSchema, 'oops_quests');

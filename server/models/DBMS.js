const mongoose = require('mongoose');

const dbmsSchema = new mongoose.Schema({
  topicId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  conceptTitle: { type: String, required: true },
  realWorldScenario: { type: String, required: true },
  technicalDeepDive: { type: String, required: true },
  questions: [{
    id: String,
    type: { type: String, default: 'mcq' }, // 'mcq' or 'query'
    questionText: String,
    // For MCQ
    options: [String],
    correctAnswer: String,
    // For Query
    initScript: String,
    expectedOutput: String,

    explanation: String
  }]
});



// The third argument 'dbms_quests' ensures it looks in the correct collection name
module.exports = mongoose.model('DBMS', dbmsSchema, 'dbms_quests');

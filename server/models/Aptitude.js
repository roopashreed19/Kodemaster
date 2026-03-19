const mongoose = require('mongoose');

const AptitudeSchema = new mongoose.Schema({
  topicId: { type: String, required: true, unique: true }, 
  title: { type: String, required: true },
  conceptTitle: { type: String, required: true },
  conceptDescription: { type: String, required: true },
  formulas: [String],
  questions: [{
    id: String,
    questionText: String,
    options: [String],
    correctAnswer: String,
    explanation: String,
    xp: { type: Number, default: 10 }
  }]
});


module.exports = mongoose.model('Aptitude', AptitudeSchema, 'aptitudes');
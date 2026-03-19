const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    subject: { type: String, required: true }, 
    floorId: { type: String, required: true }, 
    floorName: { type: String, required: true }, 
    id: { type: String, required: true }, 
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    xp: { type: Number, default: 50 },
    description: { type: String, required: true },
    logic: { type: String },
    testCases: [{
        input: String,
        expected: String
    }],
    defaultCode: {
        javascript: String,
        python: String,
        java: String,
        cpp: String,
        c: String,
        ruby: String
    }
});



module.exports = mongoose.model('Challenge', ChallengeSchema);

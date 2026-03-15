const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quest: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest', required: true },
  code: { type: String, required: true },
  status: { type: String, enum: ['Passed', 'Failed'], required: true },
  language: { type: String, default: 'javascript' },
  submittedAt: { type: Date, default: Date.now }
});


SubmissionSchema.index({ user: 1, quest: 1, status: 1 });

module.exports = mongoose.model('Submission', SubmissionSchema);
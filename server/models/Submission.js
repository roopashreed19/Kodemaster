const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questId: { type: String, required: true },
  floorId: { type: String, required: true },
  subject: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
  language: { type: String, default: 'javascript' },
  submittedAt: { type: Date, default: Date.now }
});

SubmissionSchema.index({ userId: 1, floorId: 1, questId: 1, status: 1 });

module.exports = mongoose.model('Submission', SubmissionSchema);
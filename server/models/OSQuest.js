const mongoose = require('mongoose');

const OSQuestSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    floorId: { type: String, required: true },
    floorName: { type: String, required: true },
    floorBrief: { type: String }, 
    id: { type: String, required: true }, 
    type: { type: String, default: 'mcq' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    options: [{ type: String }], 
    expected: { type: String, required: true },
    logic: { type: String } 
}, { 
    collection: 'os_quests',
    timestamps: true 
});

OSQuestSchema.index({ floorId: 1, id: 1 });

module.exports = mongoose.model('OSQuest', OSQuestSchema);
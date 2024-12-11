const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Puanlama 1 ile 5 arasında
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);

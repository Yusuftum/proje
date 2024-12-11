const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    yemekadi: { type: String, required: true },
    malzemeler: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Recipe', recipeSchema);

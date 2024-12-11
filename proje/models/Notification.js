const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    type: { type: String, enum: ['comment', 'like', 'follow'], required: true }, 
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);

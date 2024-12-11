const Notification = require('../models/Notification');

// Bildirim ekleme
exports.addNotification = async (message, recipientId, type) => {
    try {
        const notification = new Notification({
            message,
            recipient: recipientId,
            type
        });
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Hata:', error);
    }
};

// Kullanıcının tüm bildirimlerini getirme
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Okunmamış bildirim sayısını getirme
exports.getUnreadNotificationCount = async (req, res) => {
    try {
        const count = await Notification.countDocuments({ recipient: req.user.id, isRead: false });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bildirim okundu olarak işaretleme
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        if (notification.recipient.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to mark this notification' });
        }
        notification.isRead = true;
        await notification.save();
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

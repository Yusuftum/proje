const express = require('express');
const { getNotifications, getUnreadNotificationCount, markAsRead } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getNotifications); 
router.get('/unread-count', protect, getUnreadNotificationCount); 
router.put('/read/:id', protect, markAsRead); 

module.exports = router;

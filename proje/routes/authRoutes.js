const express = require('express');
const { registerUser, loginUser, getUsers, updateUserProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, authorize(['admin']), getUsers);
router.put('/profile', protect, updateUserProfile); 

module.exports = router;

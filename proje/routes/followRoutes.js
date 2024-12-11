const express = require('express');
const { followUser, unfollowUser, getFollowing, getFollowers } = require('../controllers/followController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/follow', protect, followUser); 
router.post('/unfollow', protect, unfollowUser); 
router.get('/following', protect, getFollowing); 
router.get('/followers', protect, getFollowers); 

module.exports = router;

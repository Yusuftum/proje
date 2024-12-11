const express = require('express');
const { addLike, removeLike, getLikesByRecipe } = require('../controllers/likeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addLike); 
router.post('/remove', protect, removeLike);
router.get('/recipe/:recipeId', getLikesByRecipe);

module.exports = router;

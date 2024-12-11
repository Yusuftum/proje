const express = require('express');
const { addComment, updateComment, deleteComment, getCommentsByRecipe, getUserComments } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addComment); 
router.put('/update/:id', protect, updateComment); 
router.delete('/delete/:id', protect, deleteComment); 
router.get('/recipe/:recipeId', getCommentsByRecipe); 
router.get('/user', protect, getUserComments); 

module.exports = router;

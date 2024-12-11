const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, recipeController.addRecipe); 
router.get('/get', recipeController.getRecipe);
router.get('/get/:id', recipeController.getRecipeId);
router.put('/update/:id', protect, recipeController.updateRecipe);
router.delete('/delete/:id', protect, recipeController.deleteRecipe);
router.get('/user', protect, recipeController.getUserRecipes);

module.exports = router;

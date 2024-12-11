const Recipe = require('../models/Recipe');

// Yemek tarifi 
exports.addRecipe = async (req, res) => {
    try {
        const { yemekadi, malzemeler } = req.body;
        const recipe = new Recipe({ yemekadi, malzemeler, user: req.user.id });
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        console.error('Hata:', error);
        res.status(400).json({ error: error.message });
    }
};

// Tariflerin hepsini 
exports.getRecipe = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bir tarifi ID'si ile 
exports.getRecipeId = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bir tarifi 
exports.updateRecipe = async (req, res) => {
    try {
        const { yemekadi, malzemeler } = req.body;
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        if (recipe.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to update this recipe' });
        }
        recipe.yemekadi = yemekadi || recipe.yemekadi;
        recipe.malzemeler = malzemeler || recipe.malzemeler;
        await recipe.save();
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bir tarifi 
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        if (recipe.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this recipe' });
        }
        await recipe.remove();
        res.json({ message: 'Recipe removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcıya özel tarifleri 
exports.getUserRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user.id });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

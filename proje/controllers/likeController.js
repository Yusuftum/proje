const Like = require('../models/Like');
const Notification = require('../controllers/notificationController');
const Recipe = require('../models/Recipe');

// Beğeni ekleme
exports.addLike = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const existingLike = await Like.findOne({ user: req.user.id, recipe: recipeId });

        if (existingLike) {
            return res.status(400).json({ error: 'You have already liked this recipe' });
        }

        const like = new Like({
            user: req.user.id,
            recipe: recipeId
        });
        await like.save();

        // Tarif sahibine bildirim gönderme
        const recipe = await Recipe.findById(recipeId).populate('user');
        await Notification.addNotification(
            `Your recipe has been liked!`,
            recipe.user.id,
            'like'
        );

        res.status(201).json(like);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Beğeni kaldırma
exports.removeLike = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const like = await Like.findOneAndRemove({ user: req.user.id, recipe: recipeId });

        if (!like) {
            return res.status(404).json({ error: 'Like not found' });
        }

        res.json({ message: 'Like removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tarifin beğeni sayısını getirme
exports.getLikesByRecipe = async (req, res) => {
    try {
        const likes = await Like.countDocuments({ recipe: req.params.recipeId });
        res.json({ likes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

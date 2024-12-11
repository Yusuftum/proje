const Comment = require('../models/Comment');

// Yorum ekleme
exports.addComment = async (req, res) => {
    try {
        const { text, rating, recipeId } = req.body;
        const comment = new Comment({
            text,
            rating,
            user: req.user.id,
            recipe: recipeId
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yorum güncelleme
exports.updateComment = async (req, res) => {
    try {
        const { text, rating } = req.body;
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to update this comment' });
        }
        comment.text = text || comment.text;
        comment.rating = rating || comment.rating;
        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yorum silme
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this comment' });
        }
        await comment.remove();
        res.json({ message: 'Comment removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bir tarifin tüm yorumlarını getirme
exports.getCommentsByRecipe = async (req, res) => {
    try {
        const comments = await Comment.find({ recipe: req.params.recipeId }).populate('user', 'username');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcının tüm yorumlarını getirme
exports.getUserComments = async (req, res) => {
    try {
        const comments = await Comment.find({ user: req.user.id }).populate('recipe', 'yemekadi');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Yorum ekleme
exports.addComment = async (req, res) => {
    try {
        const { text, rating, recipeId } = req.body;
        const comment = new Comment({
            text,
            rating,
            user: req.user.id,
            recipe: recipeId
        });
        await comment.save();

        // Tarif sahibine bildirim gönderme
        const recipe = await Recipe.findById(recipeId).populate('user');
        await Notification.addNotification(
            `Your recipe has a new comment: "${text}"`,
            recipe.user.id,
            'comment'
        );

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

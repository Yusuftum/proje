const Follow = require('../models/Follow');

// Kullanıcı takip etme
exports.followUser = async (req, res) => {
    try {
        const { followingId } = req.body;
        const existingFollow = await Follow.findOne({ follower: req.user.id, following: followingId });

        if (existingFollow) {
            return res.status(400).json({ error: 'You are already following this user' });
        }

        const follow = new Follow({
            follower: req.user.id,
            following: followingId
        });
        await follow.save();
        res.status(201).json(follow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcı takipten çıkma
exports.unfollowUser = async (req, res) => {
    try {
        const { followingId } = req.body;
        const follow = await Follow.findOneAndRemove({ follower: req.user.id, following: followingId });

        if (!follow) {
            return res.status(404).json({ error: 'Follow relationship not found' });
        }

        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcının takip ettiği kişileri getirme
exports.getFollowing = async (req, res) => {
    try {
        const following = await Follow.find({ follower: req.user.id }).populate('following', 'username');
        res.json(following);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcıyı takip eden kişileri getirme
exports.getFollowers = async (req, res) => {
    try {
        const followers = await Follow.find({ following: req.user.id }).populate('follower', 'username');
        res.json(followers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const Message = require('../models/Message');

// Mesaj gönderme
exports.sendMessage = async (req, res) => {
    try {
        const { recipientId, text } = req.body;
        const message = new Message({
            sender: req.user.id,
            recipient: recipientId,
            text
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Kullanıcıya gelen mesajları getirme
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ recipient: req.user.id }).sort({ createdAt: -1 }).populate('sender', 'username');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const likeRoutes = require('./routes/likeRoutes');
const followRoutes = require('./routes/followRoutes');
const messageRoutes = require('./routes/messageRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

app.use(express.json());

connectDB();

app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/recommendations', recommendationRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

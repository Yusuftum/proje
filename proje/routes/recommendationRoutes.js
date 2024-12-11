const express = require('express');
const { getRecommendations } = require('../controllers/recommendationController');
const router = express.Router();

router.post('/recommend', getRecommendations);

module.exports = router;

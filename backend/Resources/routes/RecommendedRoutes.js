const express = require('express');
const Router = express.Router();
const RecommendationController = require('../controllers/recommendationController');


Router.get('/:professional/recommended-roles', RecommendationController.getRecommendedRoles);
Router.get('/:professional/recommended-posts', RecommendationController.getRecommendedPosts);

module.exports = Router;
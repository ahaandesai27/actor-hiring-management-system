const connectionsController = require('../controllers/connectionsController');
const Router = require('express').Router()

Router.post('/follow', connectionsController.followProfessional)
Router.delete('/unfollow', connectionsController.unfollowProfessional)

Router.get('/follows', connectionsController.getSingleFollow);
Router.get('/:professional/following', connectionsController.getFollowing)
Router.get('/:professional/followers', connectionsController.getFollowers);

module.exports = Router;

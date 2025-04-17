const connectionsController = require('../controllers/connectionsController');
const Router = require('express').Router()

Router.post('/:professional1/follow/:professional2', connectionsController.followProfessional)
Router.post('/:professional1/unfollow/:professional2', connectionsController.unfollowProfessional)

Router.get('/:professional/following', connectionsController.getFollowing)
Router.get('/:professional/followers', connectionsController.getFollowers);

module.exports = Router;

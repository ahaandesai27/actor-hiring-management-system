const Router = require('express').Router()
const PostController = require('../controllers/postsController');

Router.post('/', PostController.create);

Router.get('/creator/:creator', PostController.getByCreator);
Router.get('/:post/comments', PostController.getComments);
Router.get('/:post_id', PostController.getOne);
Router.get('/', PostController.getAll);

Router.put('/:post_id', PostController.update);
Router.delete('/:post_id', PostController.delete);

module.exports = Router;
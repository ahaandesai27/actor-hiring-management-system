const commentController = require('../controllers/commentsController');
const Router = require('express').Router();

Router.post('/', commentController.create);
Router.put('/:comment_id', commentController.update);
Router.delete('/:comment_id', commentController.delete);

module.exports = Router;
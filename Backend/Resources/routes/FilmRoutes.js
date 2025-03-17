const FilmController = require('../controllers/filmController.js');
const express = require('express');
const Router = express.Router();

Router.get('/:username', FilmController.getOne);
Router.put('/:username', FilmController.update);
Router.delete('/:username', FilmController.delete);
Router.post('/', FilmController.create);
Router.get('/', FilmController.getAll);

module.exports = Router;
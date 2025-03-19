const FilmController = require('../controllers/filmController.js');
const express = require('express');
const Router = express.Router();

Router.get('/:film_id/professionals', FilmController.getProfessionals);
Router.get('/:film_id', FilmController.getOne);
Router.put('/:film_id', FilmController.update);
Router.delete('/:film_id', FilmController.delete);
Router.post('/', FilmController.create);
Router.get('/', FilmController.getAll);

module.exports = Router;
const ProfessionalController = require('../controllers/professionalController.js');
const express = require('express');
const Router = express.Router();

Router.get('/:username/films', ProfessionalController.getFilms);
Router.get('/:username', ProfessionalController.getOne);
Router.put('/:username', ProfessionalController.update);
Router.delete('/:username', ProfessionalController.delete);
Router.post('/', ProfessionalController.create);
Router.get('/', ProfessionalController.getAll);

module.exports = Router;
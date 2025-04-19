const ProfessionalController = require('../controllers/professionalController.js');
const express = require('express');
const Router = express.Router();

Router.get('/:username/films', ProfessionalController.getFilms);
Router.get('/:username/created_roles', ProfessionalController.getCreatedRoles);
Router.get('/:username', ProfessionalController.getOne);
Router.get('/', ProfessionalController.getAll);

Router.post('/apply', ProfessionalController.applyForRole);
Router.post('/', ProfessionalController.create);

Router.put('/:username', ProfessionalController.update);

Router.delete('/unapply', ProfessionalController.withdrawApplication);
Router.delete('/:username', ProfessionalController.delete);


module.exports = Router;
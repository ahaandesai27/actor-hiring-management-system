const {ProfessionalController, ProfessionalApplicationController} = require('../controllers/professionalController.js');
const express = require('express');
const Router = express.Router();

Router.get('/search/:prefix', ProfessionalController.searchUsername);
Router.get('/:username/films', ProfessionalController.getFilms);
Router.get('/:username/created_roles', ProfessionalApplicationController.getCreatedRoles);
Router.get('/:username/applied_roles', ProfessionalApplicationController.getAppliedRoles);
Router.get('/:username', ProfessionalController.getOne);
Router.get('/', ProfessionalController.getAll);

Router.post('/apply', ProfessionalApplicationController.applyForRole);
Router.post('/', ProfessionalController.create);

Router.put('/:username', ProfessionalController.update);

Router.delete('/unapply', ProfessionalApplicationController.withdrawApplication);
Router.delete('/:username', ProfessionalController.delete);


module.exports = Router;
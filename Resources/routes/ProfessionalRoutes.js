const ProfessionalController = require('../controllers/professionalController.js');
const RoleApplicationController = require('../controllers/roleApplicationController.js');

const express = require('express');
const Router = express.Router();

Router.get('/search/:prefix', ProfessionalController.searchUsername);
Router.get('/:username/films', ProfessionalController.getFilms);
Router.get('/:username/created_roles', RoleApplicationController.getCreatedRoles);
Router.get('/:username/applied_roles', RoleApplicationController.getAppliedRoles);
Router.get('/:username', ProfessionalController.getOne);
Router.get('/', ProfessionalController.getAll);

Router.post('/apply', RoleApplicationController.applyForRole);
Router.post('/', ProfessionalController.create);

Router.put('/:username', ProfessionalController.update);

Router.delete('/unapply', RoleApplicationController.withdrawApplication);
Router.delete('/:username', ProfessionalController.delete);


module.exports = Router;
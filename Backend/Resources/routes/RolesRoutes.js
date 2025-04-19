const express = require('express');
const Router = express.Router();
const RoleController = require('../controllers/roleController.js');

Router.post('/', RoleController.create);

Router.get('/:role_id/applicants', RoleController.viewApplicants);
Router.get('/:role_id', RoleController.getOne);
Router.get('/', RoleController.getAll);

Router.put('/:role_id', RoleController.update);

Router.delete('/:role_id', RoleController.delete);

module.exports = Router;
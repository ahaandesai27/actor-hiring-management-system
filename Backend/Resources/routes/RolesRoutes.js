const express = require('express');
const Router = express.Router();
const RoleController = require('../controllers/roleController.js');

Router.post('/', RoleController.create);
Router.delete('/:role_id', RoleController.delete);
Router.put('/:role_id', RoleController.update);
Router.get('/:role_id/applicants', RoleController.viewApplicants);
Router.get('/:role_id', RoleController.getOne);
module.exports = Router;
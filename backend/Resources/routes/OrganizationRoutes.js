const organizationController = require('../controllers/organizationController.js');
const Router = require('express').Router();

Router.post('/', organizationController.create);
Router.get('/:org_id', organizationController.getOne);
Router.get('/', organizationController.getAll);
Router.put('/:org_id', organizationController.update);
Router.delete('/:org_id', organizationController.delete);

module.exports = Router;
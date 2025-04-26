const locationController = require('../controllers/locationController');
const Router = require('express').Router()

Router.post('/', locationController.create);

Router.get('/:latitude/:longitude', locationController.getOne)      
Router.get('/', locationController.getAll)

Router.put('/:latitude/:longitude', locationController.update)                  

Router.delete('/:latitude/:longitude', locationController.delete)               

module.exports = Router;

const bookingController = require('../controllers/bookingController');
const Router = require('express').Router();

// Core CRUD operations
Router.post('/', bookingController.create);
Router.get('/', bookingController.getAll);
Router.put('/:latitude/:longitude/:org_id', bookingController.update);
Router.delete('/:latitude/:longitude/:org_id', bookingController.delete);

// Additional routes for specific queries
Router.get('/organization/:org_id', bookingController.getBookingsByOrganization);
Router.get('/location/:latitude/:longitude', bookingController.getBookingsByLocation);

module.exports = Router;
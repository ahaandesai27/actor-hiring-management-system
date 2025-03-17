const ProfessionalController = require('../controllers/professionalController.js');
const express = require('express');
const Router = express.Router();

Router.post('/', ProfessionalController.create);

module.exports = Router;
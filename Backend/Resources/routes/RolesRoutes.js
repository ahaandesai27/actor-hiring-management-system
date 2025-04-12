const express = require('express');
const Router = express.Router();
const FilmController = require('../controllers/filmController.js');
const RoleController = require('../controllers/roleController.js');

// Router.post('/', RoleController.create);
Router.delete('/:role_id', RoleController.delete);

module.exports = Router;
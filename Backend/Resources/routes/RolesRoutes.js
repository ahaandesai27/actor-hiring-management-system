const express = require('express');
const Router = express.Router();
const FilmController = require('../controllers/filmController.js');
const RoleController = require('../controllers/roleController.js');

Router.post('/create', RoleController.create);
Router.delete('/delete', RoleController.delete);
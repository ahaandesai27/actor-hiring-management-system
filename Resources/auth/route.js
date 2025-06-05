const express = require('express');
const login = require('./login');
const Router = express.Router()

Router.post('/login', login);

module.exports = Router
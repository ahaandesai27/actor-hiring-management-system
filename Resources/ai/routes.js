const Controllers = require('./controllers');
const express = require('express');
const Router = express.Router();

Router.post('/enhance-post', Controllers.postHelper);
Router.post('/get-data', Controllers.getData);

module.exports = Router
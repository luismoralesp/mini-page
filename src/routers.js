const express = require('express');
const Router = express.Router;
const { pathController, indexController } = require('./controllers');

const mainRouter = new Router();

mainRouter.use('/static', express.static(__dirname + '/static'));
mainRouter.get('/:path', pathController);
mainRouter.get('/', indexController);

module.exports = mainRouter;

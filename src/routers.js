const express = require('express');
const Router = express.Router;
const { pathController, indexController, health } = require('./controllers');

const mainRouter = new Router();

mainRouter.get('/health', health);
mainRouter.use('/static', express.static(__dirname + '/static'));
mainRouter.use('/templates', express.static(__dirname + '/templates'));
mainRouter.get('/:path', pathController);
mainRouter.get('/', indexController);

module.exports = mainRouter;

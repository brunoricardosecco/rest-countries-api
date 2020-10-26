const routes = require('express').Router();

const UserController = require('../app/controllers/UserController');
const authMiddleware = require('../app/middlewares/auth');

routes.post('/users', UserController.create);
routes.post('/users/authenticate', UserController.authenticate);

// Authenticated routes
routes.use(authMiddleware);

module.exports = routes;

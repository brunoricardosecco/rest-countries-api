const routes = require('express').Router();

const UserController = require('../app/controllers/UserController');
const RegionController = require('../app/controllers/RegionController');
const CountryController = require('../app/controllers/CountryController');

const authMiddleware = require('../app/middlewares/auth');

routes.post('/users', UserController.create);
routes.post('/users/authenticate', UserController.authenticate);

// Authenticated routes
routes.use(authMiddleware);

routes.post('/region', RegionController.create);
routes.get('/region', RegionController.findAll);

routes.post('/country', CountryController.create);
routes.get('/country', CountryController.findAll);

module.exports = routes;

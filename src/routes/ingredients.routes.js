const { Router } = require('express');

const IngredientsController = require('../controllers/UsersController');

// const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ingredientsRoutes = Router();
const ingredientsController = new IngredientsController();

ingredientsRoutes.post('/');

module.exports = ingredientsController;

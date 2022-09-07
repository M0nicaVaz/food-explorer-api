const { Router } = require('express');

const ProductsController = require('../controllers/ProductsController');

// const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.post('/');

module.exports = productsRoutes;
